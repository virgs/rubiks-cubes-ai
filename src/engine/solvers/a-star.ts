import type { Solution } from "./solution";
import Heap from 'heap';
import type { PocketCube } from "../pocket-cube";
import { Sides } from "../sides";
import { MetricEmitter, Metrics } from "./metric-emitter";
import type { FaceRotation } from "../face-rotation";
import type { CubeSolver } from "./cube-solver";
import { Configuration } from "@/configuration";

type Candidate = {
    cost: number,
    cube: PocketCube;
    rotations: FaceRotation[]
}

export class AStar implements CubeSolver {
    private readonly metricEmitter: MetricEmitter;
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
        this.metricEmitter = new MetricEmitter();
        this.visitedChecklist = new Map();
        this.candidates = new Heap((a: Candidate, b: Candidate) => a.cost - b.cost);
        this.iterations = 0;
        const current: Candidate = {
            cost: 0,
            cube: cube,
            rotations: []
        };
        this.candidates.push(current);
        this.metricEmitter.start();
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
            current = this.metricEmitter.add(Metrics.POP_CANDIDATE, () => this.candidates.pop());
            if (this.metricEmitter.add(Metrics.VISISTED_LIST_CHECK, () => this.visitedChecklist.has(current!.cube.getHash()))) {
                continue;
            }
            if (this.metricEmitter.add(Metrics.CHECK_SOLUTION, () => current!.cube.isSolved())) {
                this.metricEmitter.finish();
                this.candidates.clear();
                //TODO tune these rotations (avoid things like RRRR, RR', RRR=R' of same layer)
                return {
                    rotations: current!.rotations,
                    totalTime: this.metricEmitter.getTotalTime()!,
                    data: {
                        metrics: this.metricEmitter.getData(),
                        iterations: this.iterations
                    }
                }
            } else {
                this.metricEmitter.add(Metrics.ADD_TO_VISISTED_LIST_CHECK, () => this.visitedChecklist.set(current!.cube.getHash(), true));
                this.applyRotations(current!);
            }
        }
    }

    private applyRotations(current: Candidate): void {
        this.actions
            .forEach(rotation => {
                const newCandidate = this.metricEmitter.add(Metrics.PERFORM_ROTATION, () => current.cube.rotateFace(rotation));
                if (!this.metricEmitter.add(Metrics.VISISTED_LIST_CHECK, () => this.visitedChecklist.has(newCandidate.getHash()))) {
                    this.metricEmitter.add(Metrics.ADD_CANDIDATE, () => {
                        this.candidates.push({
                            cube: newCandidate,
                            rotations: current.rotations.concat(rotation)
                        });

                    })
                }
            })
    }

}