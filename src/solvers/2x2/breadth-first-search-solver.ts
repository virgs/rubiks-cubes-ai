
import { Sides } from "../../constants/sides";
import LinkedList from "double-linked-list";
import { ProcedureMeasurer } from "../procedure-measurer";
import type { CubeSolver, Solution } from "../cube-solver";
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

export class BreadthFirstSearchSolver implements CubeSolver {
    private readonly measurer: ProcedureMeasurer;
    private readonly candidates: LinkedList;
    private readonly visitedChecklist: Map<string, boolean>;
    private readonly actions: FaceRotation[];
    private aborted: boolean;

    public constructor(cube: RubiksCube) {
        this.measurer = new ProcedureMeasurer();
        this.visitedChecklist = new Map();
        this.candidates = new LinkedList();
        this.aborted = false;
        const current: Candidate = {
            cube: cube,
            rotation: undefined,
            parent: undefined,
        };
        this.candidates.push(current);
        this.actions = this.createActions();
    }

    public abort(): void {
        this.aborted = true;
    }

    public async findSolution(): Promise<Solution> {
        return new Promise((resolve, reject) => {
            this.measurer.start();
            let current: Candidate;
            let visitedNodes = 0;
            let differentNodes = 0;
            while (this.candidates.length > 0) {
                if (this.aborted) {
                    return reject();
                }
                ++visitedNodes;
                current = this.measurer.add(Metrics[Metrics.POP_CANDIDATE], () => this.candidates.shift());
                if (this.measurer.add(Metrics[Metrics.VISISTED_LIST_CHECK], () => this.visitedChecklist.has(current!.cube.getHash()))) {
                    continue;
                }
                ++differentNodes;
                if (this.measurer.add(Metrics[Metrics.CHECK_SOLUTION], () => current!.cube.isSolved())) {
                    this.measurer.finish();
                    return resolve(this.createSolution(current, visitedNodes, differentNodes));
                } else {
                    this.measurer.add(Metrics[Metrics.ADD_TO_VISISTED_LIST_CHECK], () => this.visitedChecklist.set(current!.cube.getHash(), true));
                    this.applyRotations(current!);
                }
            }
            reject(Error(`No more candidates to explore`));
        });
    }

    private createSolution(candidate: Candidate, visitedNodes: number, differentNodes: number): Solution {
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
                visitedNodes: visitedNodes,
                differentNodes: differentNodes
            }
        };
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

    private applyRotations(current: Candidate): void {
        this.actions
            .forEach(rotation => {
                const newCandidate: RubiksCube = this.measurer.add(Metrics[Metrics.PERFORM_ROTATION], () => current.cube.rotateFace(rotation));
                if (!this.measurer.add(Metrics[Metrics.VISISTED_LIST_CHECK], () => this.visitedChecklist.has(newCandidate.getHash()))) {
                    this.measurer.add(Metrics[Metrics.ADD_CANDIDATE], () => {
                        const candidate: Candidate = {
                            cube: newCandidate,
                            rotation: rotation,
                            parent: current
                        };
                        this.candidates.push(candidate);

                    })
                }
            });
    }
}