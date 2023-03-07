
import { Sides } from "../constants/sides";
import LinkedList from "double-linked-list";
import { ProcedureMeasurer } from "./procedure-measurer";
import type { CubeSolver, Solution } from "./cube-solver";
import type { FaceRotation } from "@/engine/face-rotation";
import type { RubiksCube } from "@/engine/rubiks-cube";

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
    rotation?: FaceRotation,
    parent?: Candidate
}

export class InterativeDeepeningDepthFirstSearchSolver implements CubeSolver {
    private readonly measurer: ProcedureMeasurer;
    private readonly actions: FaceRotation[];
    private readonly root: Candidate;
    private currentMaxDepth: number;
    private visitedNodes: number;
    private visitedLeaves: number;
    private aborted: boolean;

    public constructor(cube: RubiksCube) {
        this.measurer = new ProcedureMeasurer();
        this.currentMaxDepth = 0;
        this.visitedNodes = 0;
        this.visitedLeaves = 0;
        this.aborted = false;
        this.root = {
            cube: cube,
            rotation: undefined,
            parent: undefined,
        };
        this.actions = this.createActions();
    }

    public abort(): void {
        this.aborted = true;
    }

    public async findSolution(): Promise<Solution> {
        return new Promise((resolve, reject) => {
            this.measurer.start();
            while (!this.aborted) {
                const solution = this.beginSearch(this.root, 0)
                if (solution) {
                    this.measurer.finish();
                    return resolve(this.createSolution(solution));
                }
                ++this.currentMaxDepth;
                console.log(this.currentMaxDepth)
            }
            reject(Error(`Aborted`));
        });
    }

    private beginSearch(candidate: Candidate, depth: number): Candidate {
        ++this.visitedNodes;
        if (depth < this.currentMaxDepth) {
            const children = this.applyRotations(candidate);
            for (let child of children) {
                const solution = this.beginSearch(child, depth + 1);
                if (solution) {
                    return solution;
                }
            }
        } else if (depth === this.currentMaxDepth) {
            ++this.visitedLeaves;
            if (candidate.cube.isSolved()) {
                return candidate;
            }
        }
    }

    private createActions(): FaceRotation[] {
        const result: FaceRotation[] = [];
        const xIndex = [Sides.RIGHT, Sides.LEFT][Math.floor(Math.random() * 2)];
        const yIndex = [Sides.UP, Sides.DOWN][Math.floor(Math.random() * 2)];
        const zIndex = [Sides.FRONT, Sides.BACK][Math.floor(Math.random() * 2)];
        [xIndex, yIndex, zIndex]
            .map(side => [true, false]
                .map(direction => {
                    result.push({ side: side, counterClockwiseDirection: direction, layer: 0 });
                }));
        return result;
    }

    private createSolution(candidate: Candidate): Solution {
        const rotations: FaceRotation[] = [];
        let current: Candidate | undefined = candidate;
        while (current && current.rotation) {
            rotations.unshift(current.rotation);
            current = current.parent;
        }
        return {
            rotations: rotations,
            totalTime: this.measurer.getTotalTime()!,
            data: {
                metrics: this.measurer.getData({ notMeasuredLabel: Metrics[Metrics.NOT_MEASURED] }),
                visitedNodes: this.visitedNodes,
                visitedLeaves: this.visitedLeaves
            }
        };
    }

    private applyRotations(current: Candidate): Candidate[] {
        const result: Candidate[] = [];
        this.actions
            .forEach(rotation => {
                const newCandidate: RubiksCube = this.measurer.add(Metrics[Metrics.PERFORM_ROTATION], () => current.cube.rotateFace(rotation));
                this.measurer.add(Metrics[Metrics.ADD_CANDIDATE], () => {
                    result.push({
                        cube: newCandidate,
                        rotation: rotation,
                        parent: current
                    });
                })
            });
        return result;
    }
}