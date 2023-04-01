import { getOppositeColor, type Colors } from "@/constants/colors";
import { Sides, getOppositeSide, } from "@/constants/sides";
import type { CubeSolver, Solution } from "../../cube-solver";
import { ProcedureMeasurer } from "../../procedure-measurer";
import { GeneticAlgorithm, type Chromosome } from "./genetic-algorithm";
import { RubiksCube, type Cubelet } from "@/engine/rubiks-cube";
import { RotationsTuner } from "@/printers/rotations-tuner";
import type { FaceRotation } from "@/engine/face-rotation";
import { GeneticAlgorithmConfig } from "@/configuration";
import { HumanTranslator } from "@/printers/human-translator";

enum Metrics {
    NOT_MEASURED,
    RUN_CITIZEN_ROTATIONS,
    CALCULATE_CITIZEN_SCORE,
    APPLYING_ROTATIONS,
    CREATE_NEXT_GENERATION,
    COMPUTE_GENE,
    AGGREGATE_CURRENT_GENERATION,
    CHECK_SOLUTION,
    MEASUREMENT_OVERHEAD
}

export class GeneticAlgorithmSolver implements CubeSolver {
    private readonly measurer: ProcedureMeasurer;
    private readonly initialState: RubiksCube;
    private readonly goalStateHash: string;
    private geneticAlgorithm: GeneticAlgorithm;
    private citizens: Chromosome[];
    private aborted: boolean;
    private actions: FaceRotation[];

    public constructor(cube: RubiksCube) {
        this.measurer = new ProcedureMeasurer();
        this.initialState = cube.clone();
        this.aborted = false;
        this.actions = [];
        const fixedCubelet = cube.getCubeletsBySides(Sides.BACK, Sides.LEFT, Sides.DOWN)[0];
        const goalState = this.buildSolvedPocketCubeFromCornerCubelet(fixedCubelet);
        this.goalStateHash = goalState.getHash();
        [Sides.FRONT, Sides.UP, Sides.RIGHT] //So the fixed cubelet doesn't move
            .map(side => [true, false]
                .map(direction => {
                    this.actions.push({ side: side, counterClockwiseDirection: direction, layer: 0 });
                })
            );

        this.geneticAlgorithm = new GeneticAlgorithm(this.actions.length, GeneticAlgorithmConfig.maxNumOfRotations)
        this.citizens = this.geneticAlgorithm.createNextGeneration();
    }

    public async findSolution(): Promise<Solution> {
        this.measurer.start();
        return new Promise((resolve, reject) => {
            while (true) {
                if (this.aborted) {
                    return reject();
                }
                const result: Chromosome[] = [];
                for (let citizen of this.citizens) {
                    const citizenResult = this.runCitizen(citizen);
                    if (citizenResult.score === this.goalStateHash.length) {
                        return resolve(this.createSolution(citizenResult));
                    }
                    this.measurer.add(Metrics[Metrics.AGGREGATE_CURRENT_GENERATION], () => result.push(citizenResult));
                }

                this.citizens = this.measurer.add(Metrics[Metrics.CREATE_NEXT_GENERATION], () => this.geneticAlgorithm.createNextGeneration(result));
            }
        });
    }

    public abort(): void {
        this.aborted = true;
    }

    private runCitizen(citizen: Chromosome): Chromosome {
        let cube = this.initialState.clone()
        return citizen.genes
            .reduce((acc, actionIndex) => {
                if (this.measurer.add(Metrics[Metrics.CHECK_SOLUTION], () => acc.score === this.goalStateHash.length)) {
                    // new HumanTranslator().printCube(cube)
                    // console.log(new HumanTranslator().translateRotations(acc.genes.map(action => this.actions[action])))
                    // console.log(cube.isSolved(), acc.score, this.goalStateHash.length, this.goalStateHash.split('').length)
                    return acc;
                } else {
                    cube = this.measurer.add(Metrics[Metrics.APPLYING_ROTATIONS], () => cube.rotateFace(this.actions[actionIndex]));
                    this.measurer.add(Metrics[Metrics.COMPUTE_GENE], () => acc.genes.push(actionIndex));
                    acc.score = this.measurer.add(Metrics[Metrics.CALCULATE_CITIZEN_SCORE], () => this.calculateCitizenScore(cube));
                }
                return acc;
            }, { score: 0, genes: [] as number[] });
    }

    private calculateCitizenScore(currentCube: RubiksCube): number {
        const cubeConfiguration = currentCube.getConfiguration();
        return cubeConfiguration
            .split('')
            .filter((char, index) => char === this.goalStateHash[index])
            .length;
    }

    private createSolution(solution: Chromosome): Solution {
        // const rotations = new RotationsTuner().tune(solution.genes.map(action => this.actions[action]));
        const rotations = solution.genes.map(action => this.actions[action])
        this.measurer.finish();
        return {
            rotations: rotations,
            totalTime: this.measurer.getTotalTime()!,
            data: {
                allocatedMemory: GeneticAlgorithmConfig.populationPerGeneration * GeneticAlgorithmConfig.maxNumOfRotations,
                armageddonCounter: this.geneticAlgorithm.getArmageddonCounter(),
                generations: this.geneticAlgorithm.getGenerationsCounter(),
                metrics: this.measurer.getData({ notMeasuredLabel: Metrics[Metrics.NOT_MEASURED],  measurementOverheadLabel: Metrics[Metrics.MEASUREMENT_OVERHEAD]}),
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