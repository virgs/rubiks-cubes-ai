import type { Colors } from "@/constants/colors";
import { getAllSides, type Sides } from "@/constants/sides";
import type { CubeSolver, Solution } from "../cube-solver";
import { ProcedureMeasurer } from "../procedure-measurer";
import { GeneticAlgorithm, type Chromosome } from "./genetic-algorithm";
import { HumanTranslator } from "@/printers/human-tranlator";
import { RubiksCube } from "@/engine/rubiks-cube";
import { RotationsTuner } from "@/printers/rotations-tuner";

enum Metrics {
    NOT_MEASURED,
    RUN_CITIZEN_ROTATIONS,
    CALCULATE_CITIZEN_SCORE,
    ROTATIONS_TUNING
}

const orientations = [
    "F F2 F3",
    "F' F2' F3'",
    "2F 2F2 2F3",
]

const rotations = [
    "R R2 R3",
    "R' R2' R3'",
    "2R 2R2 2R3",
    "U U2 U3",
    "U' U2' U3'",
    "2U 2U2 2U3",
]

const permutations = [
    // permutes two edges: U face, bottom edge and right edge
    "F' L' B' R' U' R U' B L F R U R' U",
    // permutes two edges: U face, bottom edge and left edge
    "F R B L U L' U B' R' F' L' U' L U'",
    // permutes two corners: U face, bottom left and bottom right
    "2U B 2U B' 2R F R' F' 2U F' 2U F R'",
    // permutes three corners: U face, bottom left and top left
    "2U R 2U R' 2F L F' L' 2U L' 2U L F'",
    // permutes three centers: F face, top, right, bottom
    "U' 2B 2D L' 2F 2D 2B R' U'",
    // permutes three centers: F face, top, right, left
    "U 2B 2D R 2F 2D 2B L U",
    // U face: bottom edge <-> right edge, bottom right corner <-> top right corner
    "D' R' D 2R U' R 2B L U' L' 2B U 2R",
    // U face: bottom edge <-> right edge, bottom right corner <-> left right corner
    "D L D' 2L U L' 2B R' U R 2B U' 2L",
    // U face: top edge <-> bottom edge, bottom left corner <-> top right corner
    "R' U L' 2U R U' L R' U L' 2U R U' L U'",
    // U face: top edge <-> bottom edge, bottom right corner <-> top left corner
    "L U' R 2U L' U R' L U' R 2U L' U R' U",
    // permutes three corners: U face, bottom right, bottom left and top left
    "F' U B U' F U B' U'",
    // permutes three corners: U face, bottom left, bottom right and top right
    "F U' B' U F' U' B U",
    // permutes three edges: F face bottom, F face top, B face top
    "L' 2U L R' 2F R",
    // permutes three edges: F face top, B face top, B face bottom
    "R' 2U R L' 2B L",
    // H permutation: U Face, swaps the edges horizontally and vertically
    "2R2 U 2R2 2U 2R2 U 2R2"
]
//https://robertovaccari.com/blog/2020_07_07_genetic_rubik/
export class GeneticAlgorithmSolver implements CubeSolver {
    private readonly measurer: ProcedureMeasurer;
    private readonly initialState: RubiksCube;
    // private readonly goalStateConfiguration: string;
    private geneticAlgorithm: GeneticAlgorithm;
    private citizens: Chromosome[];
    private aborted: boolean;
    private armageddonCounter: number;

    public constructor(cube: RubiksCube) {
        this.measurer = new ProcedureMeasurer();
        this.initialState = cube.clone();
        this.aborted = false;
        this.armageddonCounter = 0;
        // this.goalStateConfiguration = this.buildSolvedCubeFromCenterCubelets(cube).getConfiguration();
        const translator = new HumanTranslator();
        this.geneticAlgorithm = new GeneticAlgorithm(this.initialState, permutations
            .map(permutation => translator.convertStringToFaceRotations(permutation)));
        this.citizens = this.geneticAlgorithm.createNextGeneration();
    }

    public async findSolution(): Promise<Solution> {
        this.measurer.start();
        return new Promise((resolve, reject) => {
            while (true) {
                if (this.aborted) {
                    return reject();
                }
                let it = 0;
                for (let citizen of this.citizens) {
                    ++it;
                    if (this.runCitizen(citizen)) {
                        return resolve(this.createSolution(citizen));
                    }
                }
                console.log(it, this.citizens.length)

                this.citizens = this.geneticAlgorithm.createNextGeneration(this.citizens);
            }
        })
    }

    public abort(): void {
        this.aborted = true;
    }

    private runCitizen(citizen: Chromosome): boolean {
        // citizen.genes = citizen.genes.concat(citizen.newGenes);
        // const currentRotations: FaceRotation[] = [];
        // let currentCube = this.initialState.clone();
        // let bestMoment: Chromosome | undefined = undefined;
        for (let rotation of citizen.newGenes) {
            // if (this.measurer.add(Metrics[Metrics.RUN_CITIZEN_ROTATIONS], () => {
            citizen.genes.push(rotation);
            citizen.cube = citizen.cube.rotateFace(rotation)
            const score = this.calculateCitizenScore(citizen.cube);
            if (Number.isNaN(score) || score === 999) {
                console.log('what')
            }
            citizen.score = score;
            // citizen.genes.push(rotation);
            // citizen.cube = citizen.cube.rotateFace(rotation);
            // if (citizen.cube.getConfiguration().toString() === citizen.goalState.toString()) {
            if (citizen.score === 0) {
                // const proof = currentRotations.reduce((cube, rotation) => cube.rotateFace(rotation), this.initialState.clone())
                // console.log('proof', citizen.genes)
                // console.log(currentRotations)
                // console.log(new HumanTranslator().translateCube(proof));
                // console.log(new HumanTranslator().translateCube(currentCube));
                // citizen.genes = currentRotations;
                console.log(score)
                return true;
            }
            // return false;
            // })) {
            // console.log('score')
            // return true;
            // }
            // if (bestMoment === undefined || bestMoment.score > citizen.score) {
            //     // console.log('update best')
            //     bestMoment = {
            //         score: citizen.score,
            //         genes: [...citizen.genes],
            //         cube: citizen.cube.clone(),
            //         newGenes: []
            //     }
            // }
        }
        // if (bestMoment) {
        // citizen.score = bestMoment!.score;
        // citizen.genes = [...bestMoment!.genes];
        // citizen.cube = bestMoment!.cube.clone();    
        // }

        return false;
    }

    private calculateCitizenScore(currentCube: RubiksCube): number {
        return this.measurer.add(Metrics[Metrics.CALCULATE_CITIZEN_SCORE], () => {
            const cubeConfiguration = currentCube.getConfiguration();
            const goalConfiguration = this.buildSolvedCubeFromCenterCubelets(currentCube).getConfiguration();
            return cubeConfiguration
                .split('')
                .filter((char, index) => char !== goalConfiguration[index])
                .length;
        });
    }

    private createSolution(solution: Chromosome): Solution {
        const rotations = this.measurer.add(Metrics[Metrics.ROTATIONS_TUNING], () => new RotationsTuner().tune(solution.genes));
        // const rotations = this.measurer.add(Metrics[Metrics.ROTATIONS_TUNING], () => solution.genes);
        this.measurer.finish();
        // console.log(new HumanTranslator().translateCube(solution.cube))
        // console.log(new HumanTranslator().translateCube(new PocketCube({ clone: solution.goalState })))
        return {
            rotations: rotations,
            totalTime: this.measurer.getTotalTime()!,
            data: {
                armageddonCounter: this.armageddonCounter,
                metrics: this.measurer.getData({ notMeasuredLabel: Metrics[Metrics.NOT_MEASURED] }),
                generations: this.geneticAlgorithm.getGenerationsCounter()
            }
        }
    }

    public buildSolvedCubeFromCenterCubelets(cube: RubiksCube): RubiksCube {
        const centersIndexes = [4, 13, 22, 31, 40, 49];
        const colorMap: Map<Sides, Colors> = new Map();
        getAllSides()
            .forEach((side, index) => {
                colorMap.set(side, cube.getColorOfIndex(centersIndexes[index]));
            })

        return new RubiksCube({ colorMap: colorMap, dimension: this.initialState.getDimension() });
    }

}