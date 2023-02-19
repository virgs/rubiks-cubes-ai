import type { Solution } from "./solution";
import Heap from 'heap';
import type { PocketCube } from "../pocket-cube";
import { Sides } from "../sides";
import { ProcedureMeasurer } from "./procedure-measurer";
import type { FaceRotation } from "../face-rotation";
import type { CubeSolver } from "./cube-solver";
import { Configuration } from "@/configuration";

type Candidate = {
    cost: number,
    cube: PocketCube;
    rotations: FaceRotation[]
}

export enum Metrics {
    ADD_CANDIDATE,
    POP_CANDIDATE,
    CHECK_SOLUTION,
    BREATHING_TIME,
    HASH_CALCULATION,
    VISISTED_LIST_CHECK,
    ADD_TO_VISISTED_LIST_CHECK,
    PERFORM_ROTATION
}


export class AStar implements CubeSolver {
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
        this.measurer = new MetricEmitter();
        this.visitedChecklist = new Map();
        this.candidates = new Heap((a: Candidate, b: Candidate) => a.cost - b.cost);
        this.iterations = 0;
        const current: Candidate = {
            cost: 0,
            cube: cube,
            rotations: []
        };
        this.candidates.push(current);
        this.measurer.start();
        this.actions = [];
        [Sides.FRONT, Sides.UP, Sides.RIGHT]
            .map(side => {
                this.actions.push({ side: side, counterClockwiseDirection: false, layer: 0 });
            });
    }

    public iterate(): Solution | undefined {
        let current: Candidate | undefined;
        let counter = this.internalIterations;
        while (this.candidates.size() > 0 && counter > 0) {
            --counter;
            ++this.iterations;
            current = this.measurer.add(Metrics.POP_CANDIDATE, () => this.candidates.pop());
            if (this.measurer.add(Metrics.VISISTED_LIST_CHECK, () => this.visitedChecklist.has(current!.cube.getHash()))) {
                continue;
            }
            if (this.measurer.add(Metrics.CHECK_SOLUTION, () => current!.cube.isSolved())) {
                this.measurer.finish();
                this.candidates.clear();
                //TODO tune these rotations (avoid things like RRRR, RR', RRR=R' of same layer)
                return {
                    rotations: current!.rotations,
                    totalTime: this.measurer.getTotalTime()!,
                    data: {
                        metrics: this.measurer.getData(),
                        iterations: this.iterations
                    }
                }
            } else {
                this.measurer.add(Metrics.ADD_TO_VISISTED_LIST_CHECK, () => this.visitedChecklist.set(current!.cube.getHash(), true));
                this.applyRotations(current!);
            }
        }
    }

    private applyRotations(current: Candidate): void {
        this.actions
            .forEach(rotation => {
                const newCandidate = this.measurer.add(Metrics.PERFORM_ROTATION, () => current.cube.rotateFace(rotation));
                if (!this.measurer.add(Metrics.VISISTED_LIST_CHECK, () => this.visitedChecklist.has(newCandidate.getHash()))) {
                    this.measurer.add(Metrics.ADD_CANDIDATE, () => {
                        this.candidates.push({
                            cube: newCandidate,
                            rotations: current.rotations.concat(rotation)
                        });

                    })
                }
            })
    }

}