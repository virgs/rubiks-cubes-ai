import type { Solution } from "./solution";
import LinkedList from "double-linked-list";
import type { PocketCube } from "../pocket-cube";
import { Sides } from "../sides";
import { MetricEmitter, Metrics } from "./metric-emitter";
import type { FaceRotation } from "../face-rotation";


type Candidate = {
    cube: PocketCube;
    rotations: FaceRotation[]
}

export class BreadthFirstSearch {
    private readonly metricEmitter: MetricEmitter;
    private readonly candidates: LinkedList;
    private readonly visitedChecklist: Map<string, boolean>;
    private aborted: boolean;

    public constructor() {
        this.metricEmitter = new MetricEmitter();
        this.visitedChecklist = new Map();
        this.aborted = false;
        this.candidates = new LinkedList()
    }

    public abort(): void {
        this.aborted = true;
    }

    public solve(cube: PocketCube): Solution {
        let iterations = 0;
        let current: Candidate = {
            cube: cube,
            rotations: []
        };
        this.candidates.push(current);
        this.metricEmitter.start();
        while (this.candidates.length > 0 && !this.aborted) {
            ++iterations;
            current = this.metricEmitter.add(Metrics.POP_CANDIDATE, () => this.candidates.shift());
            if (this.metricEmitter.add(Metrics.VISISTED_LIST_CHECK, () => this.visitedChecklist.has(current.cube.getHash()))) {
                continue;
            }
            if (this.metricEmitter.add(Metrics.CHECK_SOLUTION, () => current.cube.isSolved())) {
                break;
            }
            this.metricEmitter.add(Metrics.ADD_TO_VISISTED_LIST_CHECK, () => this.visitedChecklist.set(current.cube.getHash(), true));
            this.applyRotations(current);
        }
        this.metricEmitter.finish();
        return {
            rotations: current.rotations,
            aborted: this.aborted,
            totalTime: this.metricEmitter.getTotalTime()!,
            data: {
                metrics: this.metricEmitter.getData(),
                iterations: iterations
            }
        }
    }

    private applyRotations(current: Candidate): void {
        [Sides.FRONT, Sides.UP, Sides.RIGHT]
            .forEach(side => {
                const rotation = { side: side, counterClockwiseDirection: false, layer: 0 };
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