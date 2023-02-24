import { Configuration } from "@/configuration";
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

type Config = {
    key: string;
    geneticData: {
        mutationRate: number;
        populationPerGeneration: number;
        survivalPerGeneration: number;
    };
    neuralNetworkData: {
        hiddenNeurons: number;
        iterations: number;
    };
}

type Citizen = {
    genes: number[],
    neuralNetwork: NeuralNetwork,
    cube: RubiksCube,
    moves: FaceRotation[],
}

export class NeuroEvolutionary implements CubeSolver {
    private readonly measurer: ProcedureMeasurer;
    private readonly goalState: PocketCube;
    private readonly geneticAlgorithm: GeneticAlgorithm;
    private readonly actions: FaceRotation[];
    private readonly config: Config;
    private readonly inputs: number;
    private readonly initialState: PocketCube;
    private citizens: Citizen[];

    public constructor(cube: PocketCube) {
        this.measurer = new ProcedureMeasurer();
        this.config = Configuration.solvers
            .find(solver => solver.dimension === '2x2')!
            .methods.find(method => method.key === 'NeuroEvolutionary')! as Config;

        this.geneticAlgorithm = new GeneticAlgorithm(this.config.geneticData!.mutationRate!,
            this.config.geneticData!.populationPerGeneration!,
            this.config.geneticData!.survivalPerGeneration);
        this.initialState = cube.clone();

        this.inputs = cube.getConfiguration().length
        this.actions = [];
        const fixedCubelet = cube.getCubeletsBySides(Sides.BACK, Sides.LEFT, Sides.DOWN)[0];
        this.goalState = this.buildSolvedPocketCubeFromCornerCubelet(fixedCubelet);
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
        return new Promise(resolve => {
            this.measurer.start();
            let generations = 0;
            while (true) {
                ++generations;
                for (let citizen of this.citizens) {
                    if (this.runCitizen(citizen)) {
                        return resolve(this.createSolution(citizen, generations));
                    }
                }
                if (generations % 10 === 0) {
                    console.log(generations, this.citizens[0])
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
        // return Math.random() * 10;
        //Calcs how many sides the cubelet corner shares with the corner where it's supposed to be
        const numberOfCubeletsMovedInOneRotation: number = 4.0;
        return citizen.cube.getAllCubelets()
            .reduce((acc, cubelet) => {
                const cubeletFinalPosition = this.goalState.getCubeletsByColor(...cubelet.stickers
                    .map(sticker => sticker.color))[0]; // since it's a pocket cube, there will be one, and only one, sticker
                return acc + cubelet.stickers
                    .reduce((sum, sticker) => {
                        if (cubeletFinalPosition.stickers
                            .some(finalPositionSticker => finalPositionSticker.side === sticker.side)) {
                            return sum - 1;
                        }
                        return sum;
                    }, cubelet.stickers.length); // 3, each cubelet has 3 stickers
            }, 0) / numberOfCubeletsMovedInOneRotation;
    }

    private createSolution(solver: Citizen, iterations: number): Solution {
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