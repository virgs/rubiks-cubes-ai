import LinkedList from "double-linked-list";
import type { PocketCube } from "../engine/pocket-cube";
import { Sides } from "../constants/sides";
import { ProcedureMeasurer } from "./procedure-measurer";
import type { CubeSolver, Solution } from "./cube-solver";
import type { FaceRotation } from "@/engine/face-rotation";

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
    cube: PocketCube;
    rotation?: FaceRotation,
    parent?: Candidate
}

export class PocketCubeBreadthFirstSearch implements CubeSolver {
    private readonly measurer: ProcedureMeasurer;
    private readonly candidates: LinkedList;
    private readonly visitedChecklist: Map<string, boolean>;
    private readonly actions: FaceRotation[];

    public constructor(cube: PocketCube) {
        this.measurer = new ProcedureMeasurer();
        this.visitedChecklist = new Map();
        this.candidates = new LinkedList();
        const current: Candidate = {
            cube: cube,
            rotation: undefined,
            parent: undefined,
        };
        this.candidates.push(current);
        this.actions = [];
        [Sides.FRONT, Sides.UP, Sides.RIGHT]
            .map(side => [true, false]
                .map(direction => {
                    this.actions.push({ side: side, counterClockwiseDirection: direction, layer: 0 });
                }));
    }

    public static getSolverTag(): string {
        return "BFS";
    }

    public async findSolution(): Promise<Solution> {
        return new Promise(resolve => {
            this.measurer.start();
            let current: Candidate | undefined;
            let iterations = 0;
            while (this.candidates.length > 0) {
                ++iterations;
                current = this.measurer.add(Metrics[Metrics.POP_CANDIDATE], () => this.candidates.shift());
                if (this.measurer.add(Metrics[Metrics.VISISTED_LIST_CHECK], () => this.visitedChecklist.has(current!.cube.getHash()))) {
                    continue;
                }
                if (this.measurer.add(Metrics[Metrics.CHECK_SOLUTION], () => current!.cube.isSolved())) {
                    this.measurer.finish();
                    return resolve(this.createSolution(current!, iterations));
                } else {
                    this.measurer.add(Metrics[Metrics.ADD_TO_VISISTED_LIST_CHECK], () => this.visitedChecklist.set(current!.cube.getHash(), true));
                    this.applyRotations(current!);
                }
            }
        });
    }
    private createSolution(candidate: Candidate, iterations: number): Solution {
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
                metrics: this.measurer.getData(Metrics[Metrics.NOT_MEASURED]),
                iterations: iterations
            }
        }
    }

    private applyRotations(current: Candidate): void {
        this.actions
            .forEach(rotation => {
                const newCandidate = this.measurer.add(Metrics[Metrics.PERFORM_ROTATION], () => current.cube.rotateFace(rotation));
                if (!this.measurer.add(Metrics[Metrics.VISISTED_LIST_CHECK], () => this.visitedChecklist.has(newCandidate.getHash()))) {
                    this.measurer.add(Metrics[Metrics.ADD_CANDIDATE], () => {
                        this.candidates.push({
                            cube: newCandidate,
                            rotation: rotation,
                            parent: current
                        });

                    })
                }
            })
    }
}