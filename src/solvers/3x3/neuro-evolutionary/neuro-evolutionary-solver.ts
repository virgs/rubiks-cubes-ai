import { NeuroEvolutionaryConfig } from "@/configuration";
import { mapStringInitialToColor, type Colors } from "@/constants/colors";
import { Sides, getAllSides } from "@/constants/sides";
import { NeuroGeneticAlgorithm } from "./neuro-genetic-algorithm";
import { NeuralNetwork } from "./neural-network";
import { RotationsTuner } from "@/printers/rotations-tuner";
import type { FaceRotation } from "@/engine/face-rotation";
import type { CubeSolver, Solution } from "@/solvers/cube-solver";
import { ProcedureMeasurer } from "@/solvers/procedure-measurer";
import { RubiksCube } from "@/engine/rubiks-cube";

enum Metrics {
    NOT_MEASURED,
    RUN_NEURAL_NETWORK,
    CALCULATE_CITIZEN_SCORE,
    ROTATIONS_TUNING,
    MEASUREMENT_OVERHEAD
}
type Citizen = {
    genes: number[],
    neuralNetwork: NeuralNetwork,
    cube: RubiksCube,
    moves: FaceRotation[],
}

export class NeuroEvolutionarySolver implements CubeSolver {
    private readonly measurer: ProcedureMeasurer;
    private readonly inputs: number;
    private readonly initialState: RubiksCube;
    private actions: FaceRotation[];
    private neuroGeneticAlgorithm: NeuroGeneticAlgorithm;
    private citizens: Citizen[];
    private aborted: boolean;
    private armageddonCounter: number;

    public constructor(cube: RubiksCube) {
        this.aborted = false;
        this.measurer = new ProcedureMeasurer();
        this.armageddonCounter = 0;

        this.neuroGeneticAlgorithm = new NeuroGeneticAlgorithm(NeuroEvolutionaryConfig.geneticData.mutationRate!,
            NeuroEvolutionaryConfig.geneticData!.populationPerGeneration!);
        this.initialState = cube.clone();

        this.inputs = cube.getConfiguration().length
        this.actions = [];
        getAllSides()
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
                if (this.neuroGeneticAlgorithm.getGenerationsCounter() > NeuroEvolutionaryConfig.geneticData.armageddonThreshold) {
                    ++this.armageddonCounter;
                    const bestScore = this.citizens
                        .reduce((acc, citizen) => Math.max(this.calculateCitizenScore(citizen.cube), acc), 0)
                    console.log(`armageddon. best score from generation: ${bestScore}`)
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
        this.neuroGeneticAlgorithm = new NeuroGeneticAlgorithm(NeuroEvolutionaryConfig.geneticData.mutationRate!,
            NeuroEvolutionaryConfig.geneticData!.populationPerGeneration!);
        this.actions
            .sort(() => Math.random() * 2 - 1);
        return Array.from(new Array(NeuroEvolutionaryConfig.geneticData!.populationPerGeneration!))
            .map(() => {
                const nn = new NeuralNetwork({
                    inputs: this.inputs,
                    hiddenNeurons: NeuroEvolutionaryConfig.neuralNetworkData!.hiddenNeurons,
                    outputs: this.actions.length,
                    bias: Math.random() * 2 - 1
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
        return this.neuroGeneticAlgorithm.createNextGeneration(this.citizens
            .map(citizen => ({
                genes: citizen.genes,
                score: this.calculateCitizenScore(citizen.cube)
            })))
            .map(chromosome => {
                const nn = new NeuralNetwork({
                    inputs: this.inputs,
                    hiddenNeurons: NeuroEvolutionaryConfig.neuralNetworkData!.hiddenNeurons,
                    outputs: this.actions.length,
                    bias: Math.random() * 2 - 1
                }, chromosome.genes);
                return {
                    genes: chromosome.genes,
                    neuralNetwork: nn,
                    cube: this.initialState.clone(),
                    moves: [],
                }
            });
    }

    private runCitizen(citizen: Citizen): boolean {
        return Array.from(new Array(NeuroEvolutionaryConfig.neuralNetworkData.iterations))
            .reduce((solved) => {
                if (!solved) {
                    return this.measurer.add(Metrics[Metrics.RUN_NEURAL_NETWORK], () => {
                        const outputs = citizen.neuralNetwork.doTheMagic(citizen.cube.getConfiguration()
                            .split('')
                            .map(configuration => mapStringInitialToColor(configuration)));
                        let greatesOutput = outputs.reduce((acc, output, index) => {
                            if (acc.index === -1 || output > acc.value) {
                                acc.value = output;
                                acc.index = index;
                            }
                            return acc;
                        }, { index: -1, value: 0 })
                        if (greatesOutput.value > .5) {
                            const action = this.actions[greatesOutput.index];
                            citizen.cube = citizen.cube.rotateFace(action);
                            citizen.moves.push(action);
                            if (citizen.cube.isSolved()) {
                                return true;
                            }
                        }
                        // let index = 0;
                        // for (let output of outputs) {
                        //     if (output > .75) {
                        //         const action = this.actions[index];
                        //         citizen.cube = citizen.cube.rotateFace(action);
                        //         citizen.moves.push(action);
                        //         if (citizen.cube.isSolved()) {
                        //             return true;
                        //         }
                        //     }
                        //     ++index;
                        // }
                        return false;
                    });
                }
                return solved;
            }, false);

    }

    private calculateCitizenScore(currentCube: RubiksCube): number {
        return this.measurer.add(Metrics[Metrics.CALCULATE_CITIZEN_SCORE], () => {
            const cubeConfiguration = currentCube.getConfiguration();
            const goalConfiguration = this.buildSolvedCubeFromCenterCubelets(currentCube).getConfiguration();
            return cubeConfiguration
                .split('')
                .filter((char, index) => char === goalConfiguration[index])
                .length;
        });
    }

    private createSolution(solver: Citizen): Solution {
        const rotations = this.measurer.add(Metrics[Metrics.ROTATIONS_TUNING], () => new RotationsTuner().tune(solver.moves));
        this.measurer.finish();
        return {
            rotations: rotations,
            totalTime: this.measurer.getTotalTime()!,
            data: {
                armageddonCounter: this.armageddonCounter,
                genes: solver.genes,
                neuralNetworkWeights: solver.neuralNetwork.getWeights(),
                metrics: this.measurer.getData({ notMeasuredLabel: Metrics[Metrics.NOT_MEASURED], measurementOverheadLabel: Metrics[Metrics.MEASUREMENT_OVERHEAD] }),
                generations: this.neuroGeneticAlgorithm.getGenerationsCounter()
            }
        }
    }

    public buildSolvedCubeFromCenterCubelets(cube: RubiksCube): RubiksCube {
        const centersIndexes = cube.getAllColorlessCubelets()
            .filter(cubelet => cubelet.stickers.length === 1)
            .map(cubelet => cubelet.stickers[0].id);
        const colorMap: Map<Sides, Colors> = new Map();
        getAllSides()
            .forEach((side, index) => {
                colorMap.set(side, cube.getColorOfIndex(centersIndexes[index]));
            })

        return new RubiksCube({ colorMap: colorMap, dimension: this.initialState.getDimension() });
    }

}