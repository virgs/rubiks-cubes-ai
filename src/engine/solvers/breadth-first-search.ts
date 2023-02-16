import type { Rotation, Solution } from "./solution";
import LinkedList from "double-linked-list";
import type { PocketCube } from "../pocket-cube";
import { Sides } from "../sides";
import { MetricEmitter, Metrics } from "./metric-emitter";


type Candidate = {
    cube: PocketCube;
    rotations: Rotation[]
}

export class BreadthFirstSearch {
    private readonly metricEmitter: MetricEmitter;
    private readonly candidates: LinkedList;
    private readonly hashCandidates: Map<string, boolean>;
    private aborted: boolean;

    public constructor() {
        this.metricEmitter = new MetricEmitter();
        this.hashCandidates = new Map();
        this.aborted = false;
        this.candidates = new LinkedList()
    }

    public abort(): void {
        this.aborted = true;
    }

    public solve(cube: PocketCube): Solution {
        const startTime = Date.now();
        let iterations = 0;
        let current: Candidate = {
            cube: cube,
            rotations: []
        };
        this.candidates.push(current)
        while (this.candidates.length > 0 && !this.aborted) {
            ++iterations;
            current = this.metricEmitter.add(Metrics.POP_CANDIDATE , () => this.candidates.shift());
            if (this.metricEmitter.add(Metrics.VISISTED_LIST_CHECK, () => this.hashCandidates.get(current.cube.getHash()))) {
                continue;
            }
            if (this.metricEmitter.add(Metrics.CHECK_SOLUTION, () => current.cube.isSolved())) {
                break;
            }
            this.hashCandidates.set(current.cube.getHash(), true);
            this.applyRotations(current);
        }
        return {
            rotations: current.rotations,
            aborted: this.aborted,
            totalTime: Date.now() - startTime,
            data: {
                metrics: this.metricEmitter.data(),
                iterations: iterations
            }
        }
    }

    private applyRotations(current: Candidate): void {
        [Sides.FRONT, Sides.UP, Sides.RIGHT]
            .forEach(side => {
                this.metricEmitter.add(Metrics.ADD_CANDIDATE, () => this.candidates.push({
                    cube: current.cube.rotateFace(side),
                    rotations: current.rotations.concat({
                        side: side,
                        clockwiseDirection: true
                    })
                }))
            })

    }

}