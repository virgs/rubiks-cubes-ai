import { Configuration, NeuroEvolutionaryConfig } from "@/configuration";
import { type Colors, getOppositeColor } from "@/constants/colors";
import { Sides, getOppositeSide } from "@/constants/sides";
import type { FaceRotation } from "@/engine/face-rotation";
import { PocketCube } from "@/engine/pocket-cube";
import type { Cubelet, RubiksCube } from "@/engine/rubiks-cube";
import type { CubeSolver, Solution } from "../cube-solver";
import { ProcedureMeasurer } from "../procedure-measurer";
import { GeneticAlgorithm } from "./genetic-algorithm";
import { NeuralNetwork } from "./neural-network";

enum Metrics {
    NOT_MEASURED
}
type Citizen = {
    genes: number[],
    neuralNetwork: NeuralNetwork,
    cube: RubiksCube,
    moves: FaceRotation[],
}

const count1s = (n: number) => n.toString(2).replace(/0/g, "").length;

export class NeuroEvolutionary implements CubeSolver {
    private readonly measurer: ProcedureMeasurer;
    private readonly goalState: number[];
    private readonly geneticAlgorithm: GeneticAlgorithm;
    private readonly actions: FaceRotation[];
    private readonly config: any;
    private readonly inputs: number;
    private readonly initialState: PocketCube;
    private citizens: Citizen[];
    private aborted: boolean;

    public constructor(cube: PocketCube) {
        this.aborted = false;
        this.measurer = new ProcedureMeasurer();
        this.config = NeuroEvolutionaryConfig

        this.geneticAlgorithm = new GeneticAlgorithm(this.config.geneticData!.mutationRate!,
            this.config.geneticData!.populationPerGeneration!,
            this.config.geneticData!.survivalPerGeneration);
        this.initialState = cube.clone();

        this.inputs = cube.getConfiguration().length
        this.actions = [];
        const fixedCubelet = cube.getCubeletsBySides(Sides.BACK, Sides.LEFT, Sides.DOWN)[0];
        this.goalState = this.buildSolvedPocketCubeFromCornerCubelet(fixedCubelet).getConfiguration();
        [Sides.FRONT, Sides.UP, Sides.RIGHT] //So the fixed cubelet doesn't move
            .map(side => [true, false]
                .map(direction => {
                    this.actions.push({ side: side, counterClockwiseDirection: direction, layer: 0 });
                }));

        this.citizens = Array.from(new Array(this.config.geneticData!.populationPerGeneration!))
            .map(() => {
                const nn = new NeuralNetwork({
                    inputs: this.inputs,
                    hiddenNeurons: this.config.neuralNetworkData!.hiddenNeurons,
                    outputs: this.actions.length
                });
                return {
                    genes: nn.getWeights(), //randomly selected at first
                    neuralNetwork: nn,
                    cube: cube.clone(),
                    moves: [],
                }
            })
    }

    public async findSolution(): Promise<Solution> {
        this.measurer.start();
        return new Promise((resolve, reject) => {
            let generations = 0;
            while (true) {
                ++generations;
                if (this.aborted) {
                    return reject();
                }
                for (let citizen of this.citizens) {
                    if (this.runCitizen(citizen)) {
                        return resolve(this.createSolution(citizen, generations));
                    }
                }
                this.citizens = this.geneticAlgorithm.createNextGeneration(this.citizens
                    .map(citizen => ({
                        genes: citizen.genes,
                        score: this.calculateCitizenScore(citizen)
                    }))).map(chromosome => {
                        const nn = new NeuralNetwork({
                            inputs: this.inputs,
                            hiddenNeurons: this.config.neuralNetworkData!.hiddenNeurons,
                            outputs: this.actions.length
                        }, chromosome.genes);
                        return {
                            genes: chromosome.genes,
                            neuralNetwork: nn,
                            cube: this.initialState,
                            moves: []
                        }
                    });
            }
        })
    }

    public abort(): void {
        this.aborted = true;
    }

    private runCitizen(citizen: Citizen): boolean {
        return Array.from(new Array(this.config.neuralNetworkData.iterations))
            .reduce((solved) => {
                if (!solved) {
                    if (citizen.cube.isSolved()) {
                        return true;
                    }
                    citizen.neuralNetwork.doTheMagic(citizen.cube.getConfiguration())
                        .find((output, index) => {
                            if (output > .5) {
                                const action = this.actions[index];
                                citizen.cube = citizen.cube.rotateFace(action);
                                citizen.moves.push(action);
                                // return true
                            }
                            return false
                        });
                    return false;
                }
                return solved;
            }, false);
    }

    private calculateCitizenScore(citizen: Citizen): number {
        return citizen.cube.getConfiguration()
            .reduce((sum, item, index) => sum + count1s(item & this.goalState[index]), 0);
    }

    private createSolution(solver: Citizen, iterations: number): Solution {
        this.measurer.finish();
        return {
            rotations: solver.moves,
            totalTime: this.measurer.getTotalTime()!,
            data: {
                genes: solver.genes,
                neuralNetwork: solver.neuralNetwork,
                metrics: this.measurer.getData(Metrics[Metrics.NOT_MEASURED]),
                iterations: iterations
            }
        }
    }

    public buildSolvedPocketCubeFromCornerCubelet(cubelet: Cubelet): PocketCube {
        const colorMap: Map<Sides, Colors> = new Map();
        cubelet.stickers
            .forEach(sticker => {
                colorMap.set(sticker.side, sticker.color);
                colorMap.set(getOppositeSide(sticker.side), getOppositeColor(sticker.color));
            });
        return new PocketCube({ colorMap: colorMap });
    }

}