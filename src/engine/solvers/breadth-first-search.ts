import type { Solution } from "./solution";
import LinkedList from "double-linked-list";
import type { PocketCube } from "../pocket-cube";
import { Sides } from "../sides";
import { MetricEmitter, Metrics } from "./metric-emitter";
import type { FaceRotation } from "../face-rotation";
import type { CubeSolver } from "./cube-solver";

type Candidate = {
    cube: PocketCube;
    rotations: FaceRotation[]
}

export class BreadthFirstSearch implements CubeSolver {
    private readonly metricEmitter: MetricEmitter;
    private readonly candidates: LinkedList;
    private readonly visitedChecklist: Map<string, boolean>;
    private iterations: number;
    private readonly internalIterations: number;

    public constructor(cube: PocketCube) {
        this.metricEmitter = new MetricEmitter();
        this.visitedChecklist = new Map();
        this.candidates = new LinkedList();
        this.iterations = 0;
        this.internalIterations = 2000;
        const current: Candidate = {
            cube: cube,
            rotations: []
        };
        this.candidates.push(current);
        this.metricEmitter.start();
    }

    public iterate(): Solution | undefined {
        let current: Candidate | undefined;
        let counter = this.internalIterations;
        while (this.candidates.length > 0 && counter > 0) {
            --counter;
            ++this.iterations;
            current = this.metricEmitter.add(Metrics.POP_CANDIDATE, () => this.candidates.shift());
            if (this.metricEmitter.add(Metrics.VISISTED_LIST_CHECK, () => this.visitedChecklist.has(current!.cube.getHash()))) {
                continue;
            }
            if (this.metricEmitter.add(Metrics.CHECK_SOLUTION, () => current!.cube.isSolved())) {
                this.metricEmitter.finish();
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