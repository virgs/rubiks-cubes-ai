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
    NOT_MEASURED,
    CYCLE_AVOIDANCE_CHECK
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
    minGreaterValue?: number
}

type IterationData = {
    bound: number;
    newNodesVisited: number;
};

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
    private readonly goalState: RubiksCube;
    private readonly iterations: IterationData[];
    private readonly minBoundGrow: number = 1.25; //Avoids new nodes visited per iteration non exponential grow
    private stepInitialState: Candidate;
    private bound: number;
    private visitedNodes: number;
    private aborted: boolean;
    private currentSolver?: ThistlethwaiteStep;
    private currentPath: string[];
    private data: any;

    public constructor(cube: RubiksCube) {
        this.iterations = [];
        this.measurer = new ProcedureMeasurer();
        this.visitedNodes = 0;
        this.currentPath = [];
        this.aborted = false;
        this.goalState = this.buildSolvedCubeFromCentersCubelets(cube);
        this.currentSolver = new EdgesInOrbitStep(this.goalState);
        this.bound = this.currentSolver.iterate(cube).minMovesToFinishSteps;

        this.stepInitialState = {
            cube: cube,
            rotations: [],
            parent: undefined,
        };
        console.log(this.bound)
    }

    public abort(): void {
        this.aborted = true;
    }

    public async findSolution(): Promise<Solution> {
        let nodesTouchedLastIteration = 0;
        return new Promise((resolve, reject) => {
            this.measurer.start();
            let candidate = this.stepInitialState;
            while (!this.aborted) {
                this.currentPath = [candidate.cube.getHash()];
                const searchResult = this.search(candidate, 0);
                if (searchResult.aborted) {
                    break;
                } else if (searchResult.stepOutput) {
                    console.log('next step. is solved: ' + searchResult.candidate!.cube.isSolved())
                    if (searchResult.stepOutput.nextStepSolver) {
                        console.log(searchResult.stepOutput.nextStepSolver.constructor.name)
                        this.currentSolver = searchResult.stepOutput.nextStepSolver;
                        this.bound = this.currentSolver.iterate(candidate.cube).minMovesToFinishSteps;
                        candidate = searchResult.candidate!;
                        new HumanTranslator().printCube(candidate.cube)
                    } else {
                        return resolve(this.createSolution(searchResult.candidate!));
                    }
                } else {
                    const newNodesVisited = this.visitedNodes - nodesTouchedLastIteration;
                    this.iterations.push({ newNodesVisited: newNodesVisited, bound: this.bound });
                    nodesTouchedLastIteration = this.visitedNodes;
                    this.bound = Math.max(searchResult.minGreaterValue!, this.bound + this.minBoundGrow);
                    console.log(this.bound, newNodesVisited)
                }
            }
            reject(Error(`Aborted`));
        });
    }

    private search(candidate: Candidate, depth: number): SearchResult {
        ++this.visitedNodes;
        if (this.aborted) {
            return { aborted: true };
        }

        const iterationResult = this.currentSolver!.iterate(candidate.cube);
        let estimatedCostToStepGoal = iterationResult.minMovesToFinishSteps;
        // console.log(estimatedCostToStepGoal)
        if (iterationResult.stepFinished) {
            this.currentSolver = iterationResult.nextStepSolver;
            console.log('step is over')
            return { candidate: candidate, stepOutput: iterationResult };
        }
        //Use it as A* heuristic
        // console.log(iterationResult.minMovesToFinishSteps);
        let minGreaterValue = Infinity;
        const children = this.applyRotations(candidate);
        for (let child of children) {
            const sum = depth + estimatedCostToStepGoal;
            if (sum > this.bound) {
                return { minGreaterValue: sum }
            }
            const searchResult = this.search(child, depth + 1);
            const childHash = child.cube.getHash();
            if (this.measurer.add(Metrics[Metrics.CYCLE_AVOIDANCE_CHECK],
                () => this.currentPath
                    .every(hash => hash !== childHash))) {// avoid cycles
                this.currentPath.push(childHash);
                if (searchResult.candidate || searchResult.aborted) {
                    return searchResult;
                } else {
                    // https://github.com/lukapopijac/pocket-cube-optimal-solver#about-the-search-algorithm
                    estimatedCostToStepGoal = Math.min(estimatedCostToStepGoal, searchResult.minGreaterValue! - 1);
                    minGreaterValue = Math.min(searchResult.minGreaterValue!, minGreaterValue);
                }
                this.currentPath.pop();
            }
        }


        return { aborted: false, candidate: undefined, minGreaterValue: minGreaterValue }
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