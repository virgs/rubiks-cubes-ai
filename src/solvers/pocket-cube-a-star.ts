import type { Solution } from "./solution";
import Heap from 'heap';
import type { PocketCube } from "../engine/pocket-cube";
import { Sides } from "../constants/sides";
import type { CubeSolver } from "./cube-solver";
import { Configuration } from "@/configuration";
import { ProcedureMeasurer } from "./procedure-measurer";
import type { FaceRotation } from "@/engine/face-rotation";

export enum Metrics {
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
    cost: number,
    cube: PocketCube;
    rotation?: FaceRotation,
    parent?: Candidate
}


export class PocketCubeAStar implements CubeSolver {
    private readonly measurer: ProcedureMeasurer;
        //    moves.sort((a, b) => {
    //       // Prioritize moves that push boxes onto goals
    //       const boxesOnGoals = (b[2] - a[2]) * 1000;
    //       // Then sort by the total Manhattan distance of boxes to goals
    //       const boxToGoalDistanceTotal = a[3] - b[3];
    //       return boxesOnGoals + boxToGoalDistanceTotal;
    //     });
    //a.foo - b.foo; ==> heap.pop(); gets the smallest
    private candidates: Heap<Candidate>;;

    private readonly visitedChecklist: Map<string, boolean>;
    private readonly internalIterations: number = Configuration.solvers.bfs.iterations;;
    private readonly actions: FaceRotation[];
    private iterations: number;

    public constructor(cube: PocketCube) {
        this.measurer = new ProcedureMeasurer();
        this.candidates = new Heap((a: Candidate, b: Candidate) => a.cost - b.cost);

        this.visitedChecklist = new Map();
        this.iterations = 0;
        const current: Candidate = {
            cost: 0,
            cube: cube,
            rotation: undefined,
            parent: undefined,
        };
        this.candidates.push(current);
        this.measurer.start();
        this.actions = [];
        [Sides.FRONT, Sides.UP, Sides.RIGHT]
            .map(side => [true, false]
                .map(direction => {
                    this.actions.push({ side: side, counterClockwiseDirection: direction, layer: 0 });
                }));
    }

    public iterate(): Solution | undefined {
        let current: Candidate | undefined;
        let counter = this.internalIterations;
        while (this.candidates.size() > 0 && counter > 0) {
            --counter;
            ++this.iterations;
            current = this.measurer.add(Metrics[Metrics.POP_CANDIDATE], () => this.candidates.pop());
            if (this.measurer.add(Metrics[Metrics.VISISTED_LIST_CHECK], () => this.visitedChecklist.has(current!.cube.getHash()))) {
                continue;
            }
            if (this.measurer.add(Metrics[Metrics.CHECK_SOLUTION], () => current!.cube.isSolved())) {
                this.measurer.finish();
                this.candidates.clear();
                return this.createSolution(current!);
            } else {
                this.measurer.add(Metrics[Metrics.ADD_TO_VISISTED_LIST_CHECK], () => this.visitedChecklist.set(current!.cube.getHash(), true));
                this.applyRotations(current!);
            }
        }
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
                metrics: this.measurer.getData(Metrics[Metrics.NOT_MEASURED]),
                iterations: this.iterations
            }
        }
    }

    private applyRotations(parent: Candidate): void {
        this.actions
            .forEach(rotation => {
                const newCandidate = this.measurer.add(Metrics[Metrics.PERFORM_ROTATION], () => parent.cube.rotateFace(rotation));
                if (!this.measurer.add(Metrics[Metrics.VISISTED_LIST_CHECK], () => this.visitedChecklist.has(newCandidate.getHash()))) {
                    this.measurer.add(Metrics[Metrics.ADD_CANDIDATE], () => {
                        this.candidates.push({
                            cost: parent.cost + 1 + this.calculateHeuristic(newCandidate),
                            cube: newCandidate,
                            rotation: rotation,
                            parent: parent
                        });

                    })
                }
            })
    }
    
    private calculateHeuristic(newCandidate: PocketCube): number {
        return 0;
    }
}