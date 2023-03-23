import { NeuroEvolutionaryConfig } from "@/configuration";
import { getAllColors, getOppositeColor, mapStringInitialToColor, type Colors } from "@/constants/colors";
import { Sides, getAllSides, getOppositeSide } from "@/constants/sides";
import { NeuroGeneticAlgorithm } from "./neuro-genetic-algorithm";
import { NeuralNetwork } from "./neural-network";
import { RotationsTuner } from "@/printers/rotations-tuner";
import type { FaceRotation } from "@/engine/face-rotation";
import type { CubeSolver, Solution } from "@/solvers/cube-solver";
import { ProcedureMeasurer } from "@/solvers/procedure-measurer";
import { RubiksCube, type Cubelet } from "@/engine/rubiks-cube";

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
    private readonly goalStateHash: string;
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

        this.inputs = cube.getConfiguration().length;
        this.actions = [];
        const fixedCubelet = cube.getCubeletsBySides(Sides.BACK, Sides.LEFT, Sides.DOWN)[0];
        const goalState = this.buildSolvedPocketCubeFromCornerCubelet(fixedCubelet);
        this.goalStateHash = goalState.getHash();
        [Sides.FRONT, Sides.UP, Sides.RIGHT] //So the fixed cubelet doesn't move
            .map(side => [true, false]
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
        return Array.from(new Array(NeuroEvolutionaryConfig.geneticData!.populationPerGeneration!))
            .map(() => {
                const nn = new NeuralNetwork({
                    inputs: this.inputs,
                    hiddenNeurons: NeuroEvolutionaryConfig.neuralNetworkData!.hiddenNeurons,
                    outputs: this.actions.length,
                    bias: 1
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
                    bias: 1
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
                        const currentConfiguration = citizen.cube.getConfiguration()
                            .split('');
                        const inputs = currentConfiguration
                                .map(character => mapStringInitialToColor(character));
                        // const inputs = getAllColors()
                        //     .flatMap(color => currentConfiguration
                        //         .map(character => mapStringInitialToColor(character) === color ? 1 : 0))
                        const outputs = citizen.neuralNetwork.doTheMagic(inputs);
                        let greatestOutput = outputs.reduce((acc, output, index) => {
                            if (acc.index === -1 || output > acc.value) {
                                acc.value = output;
                                acc.index = index;
                            }
                            return acc;
                        }, { index: -1, value: 0 })
                        if (greatestOutput.value > .5) {
                            const action = this.actions[greatestOutput.index];
                            citizen.cube = citizen.cube.rotateFace(action);
                            console.log(action)
                            citizen.moves.push(action);
                            if (citizen.cube.isSolved()) {
                                return true;
                            }
                        }
                        return false;
                    });
                }
                return solved;
            }, false);

    }

    private calculateCitizenScore(currentCube: RubiksCube): number {
        return this.measurer.add(Metrics[Metrics.CALCULATE_CITIZEN_SCORE], () => {
            const cubeConfiguration = currentCube.getConfiguration();
            return cubeConfiguration
                .split('')
                .filter((char, index) => char === this.goalStateHash[index])
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

    public buildSolvedPocketCubeFromCornerCubelet(cubelet: Cubelet): RubiksCube {
        const colorMap: Map<Sides, Colors> = new Map();
        cubelet.stickers
            .forEach(sticker => {
                colorMap.set(sticker.side, sticker.color);
                colorMap.set(getOppositeSide(sticker.side), getOppositeColor(sticker.color));
            });
        return new RubiksCube({ colorMap: colorMap, dimension: this.initialState.getDimension() });
    }


}