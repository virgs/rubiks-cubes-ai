import { getOppositeSide, Sides } from "../../../constants/sides";
import { ProcedureMeasurer } from "../../procedure-measurer";
import type { CubeSolver, Solution } from "../../cube-solver";
import type { FaceRotation } from "@/engine/face-rotation";
import { RubiksCube } from "@/engine/rubiks-cube";
import { Colors, getOppositeColor } from "@/constants/colors";
import { EdgesInOrbitStep } from "./edges-in-orbit-step";
import type { ThistlethwaiteResult, ThistlethwaiteStep } from "./thistlethwait-step";
import { HumanTranslator } from "@/printers/human-translator";
import { RotationsTuner } from "@/printers/rotations-tuner";

enum Metrics {
    ADD_CANDIDATE,
    POP_CANDIDATE,
    CHECK_SOLUTION,
    BREATHING_TIME,
    HASH_CALCULATION,
    VISISTED_LIST_CHECK,
    ADD_TO_VISISTED_LIST_CHECK,
    PERFORM_ROTATION,
    NOT_MEASURED
}

type Candidate = {
    cube: RubiksCube;
    rotations: FaceRotation[],
    parent?: Candidate
}

interface SearchResult {
    aborted?: boolean;
    candidate?: Candidate;
    stepOutput?: ThistlethwaiteResult;
}

// console.log(JSON.stringify(new RubiksCube({ dimension: 3 }).getAllCubelets()
//     .filter(cubelet => cubelet.stickers.length === 2)
//     .map(cubelet => cubelet.stickers.map(s => ({side: Sides[s.side], id: s.id, color: Colors[s.color]})))));

// const groupPremutations = [
//     "L R F B U D L' R' F' B' U' D'",
//     "L R F B L' R' F' B' 2U 2D",
//     "L R L' R' 2F 2B 2U 2D",
//     "2L 2R 2F 2B 2U 2D",
// ]

//https://www.jaapsch.net/puzzles/thistle.htm
//https://medium.com/@benjamin.botto/implementing-an-optimal-rubiks-cube-solver-using-korf-s-algorithm-bf750b332cf9
export class ThistlethwaiteSolver implements CubeSolver {
    private readonly measurer: ProcedureMeasurer;
    private readonly initialState: Candidate;
    private readonly goalState: RubiksCube;
    private currentMaxDepth: number;
    private visitedNodes: number;
    private aborted: boolean;
    private currentSolver?: ThistlethwaiteStep;
    private data: any;

    public constructor(cube: RubiksCube) {
        this.measurer = new ProcedureMeasurer();
        this.visitedNodes = 0;
        this.aborted = false;
        this.goalState = this.buildSolvedCubeFromCentersCubelets(cube);
        this.currentSolver = new EdgesInOrbitStep(this.goalState);

        this.currentMaxDepth = 1;

        this.initialState = {
            cube: cube,
            rotations: [],
            parent: undefined,
        };
    }

    public abort(): void {
        this.aborted = true;
    }

    public async findSolution(): Promise<Solution> {
        return new Promise((resolve, reject) => {
            this.measurer.start();
            let candidate = this.initialState;
            while (!this.aborted) {
                const searchResult = this.beginSearch(candidate, 0);
                if (searchResult.aborted) {
                    break;
                } else if (searchResult.stepOutput) {
                    console.log('next step. is solved: ' + searchResult.candidate!.cube.isSolved())
                    if (searchResult.stepOutput.nextStepSolver) {
                        console.log(searchResult.stepOutput.nextStepSolver.constructor.name)
                        this.currentMaxDepth = 0;
                        this.currentSolver = searchResult.stepOutput.nextStepSolver
                        candidate = searchResult.candidate!;
                        new HumanTranslator().printCube(candidate.cube)

                    } else {
                        return resolve(this.createSolution(searchResult.candidate!));
                    }
                } else {
                    ++this.currentMaxDepth;
                    console.log(this.currentMaxDepth)
                }
            }
            reject(Error(`Aborted`));
        });
    }

    private beginSearch(candidate: Candidate, depth: number): SearchResult {
        ++this.visitedNodes;
        if (this.aborted) {
            return { aborted: true };
        }
        if (depth <= this.currentMaxDepth) {
            const iterationResult = this.currentSolver!.iterate(candidate.cube);
            if (iterationResult.stepFinished) {
                this.currentSolver = iterationResult.nextStepSolver;
                console.log('step is over')
                return { candidate: candidate, stepOutput: iterationResult };
            } else {
                //Use it as A* heuristic
                // console.log(iterationResult.minMovesToFinishSteps);
            }
            const children = this.applyRotations(candidate);
            for (let child of children) {
                const solution = this.beginSearch(child, depth + 1);
                if (solution.candidate) {
                    return solution;
                }
            }
        }
        return { aborted: false, candidate: undefined }
    }

    private createSolution(candidate: Candidate): Solution {
        const rotations: FaceRotation[] = [];
        let current: Candidate | undefined = candidate;
        while (current && current.rotations.length > 0) {
            rotations.unshift(...current.rotations);
            current = current.parent;
        }
        this.measurer.finish();

        return {
            rotations: new RotationsTuner().tune(rotations),
            totalTime: this.measurer.getTotalTime()!,
            data: {
                metrics: this.measurer.getData({ notMeasuredLabel: Metrics[Metrics.NOT_MEASURED] }),
                visitedNodes: this.visitedNodes,
            }
        };
    }

    private applyRotations(current: Candidate): Candidate[] {
        const result: Candidate[] = [];
        const moves = this.currentSolver!.getAllowedMoves();
        moves
            .forEach(move => {
                const newCandidate: RubiksCube = move
                    .reduce((cube, rotation) => cube.rotateFace(rotation), current.cube);
                this.measurer.add(Metrics[Metrics.ADD_CANDIDATE], () => {
                    result.push({
                        cube: newCandidate,
                        rotations: move,
                        parent: current
                    });
                })
            });
        return result;
    }

    private buildSolvedCubeFromCentersCubelets(cube: RubiksCube): RubiksCube {
        const centers = cube.getAllCubelets()
            .filter(cubelet => cubelet.stickers.length === 1)

        const colorMap: Map<Sides, Colors> = new Map();
        centers
            .forEach(cubelet => cubelet.stickers
                .forEach(sticker => {
                    colorMap.set(sticker.side, sticker.color);
                    colorMap.set(getOppositeSide(sticker.side), getOppositeColor(sticker.color));
                })
            );
        return new RubiksCube({ colorMap: colorMap, dimension: cube.getDimension() });

    }

}