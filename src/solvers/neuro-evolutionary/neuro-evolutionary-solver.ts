import { NeuroEvolutionaryConfig } from "@/configuration";
import { type Colors, getOppositeColor } from "@/constants/colors";
import { Sides, getOppositeSide } from "@/constants/sides";
import type { Cubelet, Cube } from "@/engine/cube";
import { NeuroGeneticAlgorithm } from "./neuro-genetic-algorithm";
import { NeuralNetwork } from "./neural-network";
import { RotationsTuner } from "@/printers/rotations-tuner";
import type { FaceRotation } from "@/engine/face-rotation";
import type { CubeSolver, Solution } from "@/solvers/cube-solver";
import { ProcedureMeasurer } from "@/solvers/procedure-measurer";
import type { RubiksCube } from "@/engine/rubiks-cube";

enum Metrics {
    NOT_MEASURED,
    RUN_NEURAL_NETWORK,
    CALCULATE_CITIZEN_SCORE,
    ROTATIONS_TUNING
}
type Citizen = {
    genes: number[],
    neuralNetwork: NeuralNetwork,
    cube: Cube,
    moves: FaceRotation[],
}

const countBitsOn = (n: number) => n.toString(2).replace(/0/g, "").length;

//https://robertovaccari.com/blog/2020_07_07_genetic_rubik/
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
        this.actions = [];
        [Sides.FRONT, Sides.UP, Sides.RIGHT] //Important to be the opposite side of fixedCubelet so we can calculate the fitness function correctly
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
        return this.neuroGeneticAlgorithm.createNextGeneration(this.citizens
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
                    cube: this.initialState.clone(),
                    moves: []
                }
            });
    }

    private runCitizen(citizen: Citizen): boolean {
        return Array.from(new Array(NeuroEvolutionaryConfig.neuralNetworkData.iterations))
            .reduce((solved) => {
                if (!solved) {
                    return this.measurer.add(Metrics[Metrics.RUN_NEURAL_NETWORK], () => {
                        const outputs = citizen.neuralNetwork.doTheMagic(citizen.cube.getConfiguration());
                        let index = 0;
                        for (let output of outputs) {
                            if (output > .75) {
                                const action = this.actions[index];
                                citizen.cube = citizen.cube.rotateFace(action);
                                citizen.moves.push(action);
                                if (citizen.cube.isSolved()) {
                                    return true;
                                }
                            }
                            ++index;
                        }
                        return false;
                    });
                }
                return solved;
            }, false);

    }

    private calculateCitizenScore(citizen: Citizen): number {
        return this.measurer.add(Metrics[Metrics.CALCULATE_CITIZEN_SCORE], () => citizen.cube.getConfiguration()
            .reduce((sum, item, index) => sum + countBitsOn(item & this.goalState[index]), 0));
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
                neuralNetwork: solver.neuralNetwork,
                metrics: this.measurer.getData(Metrics[Metrics.NOT_MEASURED]),
                generations: this.neuroGeneticAlgorithm.getGenerationsCounter()
            }
        }
    }

    public buildSolvedPocketCubeFromCornerCubelet(cubelet: Cubelet): PocketCube {
        const colorMap: Map<Colors, Sides> = new Map();
        cubelet.stickers
            .forEach(sticker => {
                colorMap.set(sticker.color, sticker.side);
                colorMap.set(getOppositeColor(sticker.color), getOppositeSide(sticker.side));
            });
        return new PocketCube({ colorMap: colorMap });
    }

}