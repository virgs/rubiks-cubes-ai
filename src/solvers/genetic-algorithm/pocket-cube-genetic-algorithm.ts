import { GeneticAlgorithmConfig } from "@/configuration";
import { type Colors, getOppositeColor } from "@/constants/colors";
import { Sides, getOppositeSide } from "@/constants/sides";
import { CubeScrambler } from "@/engine/cube-scrambler";
import type { FaceRotation } from "@/engine/face-rotation";
import { HumanTranslator } from "@/engine/human-tranlator";
import { PocketCube } from "@/engine/pocket-cube";
import { RotationsTuner } from "@/engine/rotations-tuner";
import type { Cubelet } from "@/engine/rubiks-cube";
import type { CubeSolver, Solution } from "../cube-solver";
import { ProcedureMeasurer } from "../procedure-measurer";
import { GeneticAlgorithm, type Chromosome } from "./genetic-algorithm";

enum Metrics {
    NOT_MEASURED,
    RUN_CITIZEN_ROTATIONS,
    CALCULATE_CITIZEN_SCORE,
    ROTATIONS_TUNING
}

const countBitsOn = (n: number) => n.toString(2).replace(/0/g, "").length;

//https://robertovaccari.com/blog/2020_07_07_genetic_rubik/
export class PocketCubeGeneticAlgorithm implements CubeSolver {
    private readonly measurer: ProcedureMeasurer;
    private readonly initialState: PocketCube;
    private geneticAlgorithm: GeneticAlgorithm;
    private citizens: Chromosome[];
    private aborted: boolean;
    private armageddonCounter: number;

    public constructor(cube: PocketCube) {
        this.aborted = false;
        this.armageddonCounter = 0;
        this.measurer = new ProcedureMeasurer();
        this.initialState = cube.clone();
        this.citizens = this.createNewPopulationFromScratch();

        const translator = new HumanTranslator();
        this.geneticAlgorithm = new GeneticAlgorithm([
            //Permutations that keep fixedCubelet in its place so we can calculate the fitnes function
            translator.convertStringToFaceRotations('F'),
            translator.convertStringToFaceRotations('F\''),
            translator.convertStringToFaceRotations('U'),
            translator.convertStringToFaceRotations('U\''),
            translator.convertStringToFaceRotations('R'),
            translator.convertStringToFaceRotations('R\''),
            translator.convertStringToFaceRotations('B\'', 'U', 'B\''),
            translator.convertStringToFaceRotations('U', 'R', 'U\''),
            translator.convertStringToFaceRotations('F', 'U\'', 'F\''),
            translator.convertStringToFaceRotations('D', 'B', 'D\''),
            translator.convertStringToFaceRotations('R\'', 'U\'', 'R', 'U\'', 'R\'', '2U', 'R'),
            translator.convertStringToFaceRotations('U', 'R\'', 'U\'', 'R', 'U\'', 'R\'', '2U', 'R'),
            translator.convertStringToFaceRotations('U\'', 'R\'', 'U\'', 'R', 'U\'', 'R\'', '2U', 'R'),
            translator.convertStringToFaceRotations('2U', 'R\'', 'U\'', 'R', 'U\'', 'R\'', '2U', 'R'),
            translator.convertStringToFaceRotations('L\'', 'U', 'R\'', '2D', 'R', 'U\'', 'R\'', '2D', '2R'),
            translator.convertStringToFaceRotations('2R', 'L\'', 'U', 'R\'', '2D', 'R', 'U\'', 'R\'', '2D'),
            translator.convertStringToFaceRotations('2F', 'L\'', 'U', 'R\'', '2D', 'R', 'U\'', 'R\'', '2D', '2R', '2F\''),
        ]);
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
                if (this.geneticAlgorithm.getGenerationsCounter() > GeneticAlgorithmConfig.armageddonThreshold) {
                    ++this.armageddonCounter;
                    // this.citizens = this.createNewPopulationFromScratch();
                } else {
                    this.citizens = this.createNewPopulationFromPreviousOne();
                }
            }
        })
    }

    public abort(): void {
        this.aborted = true;
    }

    private createNewPopulationFromScratch(): Chromosome[] {
        return Array.from(new Array(GeneticAlgorithmConfig.populationPerGeneration!))
            .map(() => {
                // Arbitrary numbers to make initial configuration spread
                const rotations: FaceRotation[] = [];// new CubeScrambler(10).scramble(this.initialState.clone())
                // .filter(() => Math.random() > .5);
                const cube = this.initialState.clone();//rotations
                //.reduce((cube, rotation) => cube.rotateFace(rotation), this.initialState.clone());
                const fixedCubelets = cube.getCubeletsBySides(Sides.BACK, Sides.LEFT, Sides.DOWN);
                console.log(new HumanTranslator().translateCube(cube))
                console.log(new HumanTranslator().translateCubelets(fixedCubelets))
                const goalState = this.buildSolvedPocketCubeFromCornerCubelet(fixedCubelets[0]).getConfiguration();
                console.log(new HumanTranslator().translateCube(new PocketCube({ clone: goalState })))
                return {
                    cube: cube,
                    genes: rotations,
                    goalState: goalState,
                    score: NaN,
                    newGenes: []
                }
            });
    }

    private createNewPopulationFromPreviousOne(): Chromosome[] {
        return this.geneticAlgorithm.createNextGeneration(this.citizens
            .map(citizen => ({
                cube: citizen.cube,
                genes: citizen.genes,
                newGenes: [],
                score: this.calculateCitizenScore(citizen),
                goalState: citizen.goalState
            })));
    }

    private runCitizen(citizen: Chromosome): boolean {
        for (let rotation of citizen.newGenes) {
            if (this.measurer.add(Metrics[Metrics.RUN_CITIZEN_ROTATIONS], () => {
                citizen.genes.push(rotation);
                citizen.cube = citizen.cube.rotateFace(rotation);
                if (citizen.cube.isSolved()) {
                    return true;
                }
                return false;
            })) {
                return true;
            }
        }
        return false;
    }

    private calculateCitizenScore(citizen: Chromosome): number {
        return this.measurer.add(Metrics[Metrics.CALCULATE_CITIZEN_SCORE], () => citizen.cube.getConfiguration()
            .reduce((sum, item, index) => sum + countBitsOn(item & citizen.goalState[index]), 0));
    }

    private createSolution(solution: Chromosome): Solution {
        const rotations = this.measurer.add(Metrics[Metrics.ROTATIONS_TUNING], () => new RotationsTuner().tune(solution.genes));
        this.measurer.finish();
        return {
            rotations: rotations,
            totalTime: this.measurer.getTotalTime()!,
            data: {
                armageddonCounter: this.armageddonCounter,
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