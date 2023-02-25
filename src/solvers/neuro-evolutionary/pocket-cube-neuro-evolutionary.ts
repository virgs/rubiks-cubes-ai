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
    private readonly inputs: number;
    private readonly initialState: PocketCube;
    private actions: FaceRotation[];
    private geneticAlgorithm: GeneticAlgorithm;
    private citizens: Citizen[];
    private aborted: boolean;
    private armageddonCounter: number;

    public constructor(cube: PocketCube) {
        this.aborted = false;
        this.measurer = new ProcedureMeasurer();
        this.armageddonCounter = 0;

        this.geneticAlgorithm = new GeneticAlgorithm(NeuroEvolutionaryConfig.geneticData.mutationRate!,
            NeuroEvolutionaryConfig.geneticData!.populationPerGeneration!,
            NeuroEvolutionaryConfig.geneticData!.survivalPerGeneration);
        this.initialState = cube.clone();

        this.inputs = cube.getConfiguration().length
        this.actions = [];
        const fixedCubelet = cube.getCubeletsBySides(Sides.BACK, Sides.LEFT, Sides.DOWN)[0];
        this.goalState = this.buildSolvedPocketCubeFromCornerCubelet(fixedCubelet).getConfiguration();
        this.actions = [];
        [Sides.FRONT, Sides.UP, Sides.RIGHT]
            .map((side: Sides) => [true, false]
                .map(direction => {
                    this.actions.push({ side: side, counterClockwiseDirection: direction, layer: 0 });
                }));

        this.citizens = this.createNewPopulationFromScratch();
    }

    public async findSolution(): Promise<Solution> {
        this.measurer.start();
        return new Promise((resolve, reject) => {
            while (true) {
                if (this.aborted) {
                    return reject();
                }
                for (let citizen of this.citizens) {
                    if (this.runCitizen(citizen)) {
                        return resolve(this.createSolution(citizen));
                    }
                }
                if (this.geneticAlgorithm.getGenerationsCounter() > NeuroEvolutionaryConfig.geneticData.armageddonThreshold) {
                    ++this.armageddonCounter;
                    console.log(`Armageddon. This population was useless. The best score was of the last generation was: ${this.geneticAlgorithm.getLastGenerationsBestCitizen()}`);
                    this.citizens = this.createNewPopulationFromScratch();
                } else {
                    this.citizens = this.createNewPopulationFromPreviousOne();
                }
            }
        })
    }

    public abort(): void {
        this.aborted = true;
    }


    private createNewPopulationFromScratch(): Citizen[] {
        this.geneticAlgorithm = new GeneticAlgorithm(NeuroEvolutionaryConfig.geneticData.mutationRate!,
            NeuroEvolutionaryConfig.geneticData!.populationPerGeneration!,
            NeuroEvolutionaryConfig.geneticData!.survivalPerGeneration);
        this.actions
            .sort(() => Math.random() * 2 - 1);
        return Array.from(new Array(NeuroEvolutionaryConfig.geneticData!.populationPerGeneration!))
            .map(() => {
                const nn = new NeuralNetwork({
                    inputs: this.inputs,
                    hiddenNeurons: NeuroEvolutionaryConfig.neuralNetworkData!.hiddenNeurons,
                    outputs: this.actions.length
                });
                return {
                    genes: nn.getWeights(), //randomly selected at first
                    neuralNetwork: nn,
                    cube: this.initialState.clone(),
                    moves: [],
                }
            });
    }

    private createNewPopulationFromPreviousOne(): Citizen[] {
        return this.geneticAlgorithm.createNextGeneration(this.citizens
            .map(citizen => ({
                genes: citizen.genes,
                score: this.calculateCitizenScore(citizen)
            }))).map(chromosome => {
                const nn = new NeuralNetwork({
                    inputs: this.inputs,
                    hiddenNeurons: NeuroEvolutionaryConfig.neuralNetworkData!.hiddenNeurons,
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

    private runCitizen(citizen: Citizen): boolean {
        return Array.from(new Array(NeuroEvolutionaryConfig.neuralNetworkData.iterations))
            .reduce((solved) => {
                if (!solved) {
                    if (citizen.cube.isSolved()) {
                        return true;
                    }
                    citizen.neuralNetwork.doTheMagic(citizen.cube.getConfiguration())
                        .find((output, index) => {
                            if (output > .75) {
                                const action = this.actions[index];
                                citizen.cube = citizen.cube.rotateFace(action);
                                citizen.moves.push(action);
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

    private createSolution(solver: Citizen): Solution {
        this.measurer.finish();
        return {
            rotations: solver.moves,
            totalTime: this.measurer.getTotalTime()!,
            data: {
                armageddonCounter: this.armageddonCounter,
                genes: solver.genes,
                neuralNetwork: solver.neuralNetwork,
                metrics: this.measurer.getData(Metrics[Metrics.NOT_MEASURED]),
                generations: this.geneticAlgorithm.getGenerationsCounter()
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