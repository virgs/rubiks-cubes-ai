import type { Rotation, Solution } from "./Solution";
import * as LinkedList from "double-linked-list";
import type { PocketCube } from "../pocket-cube";
import { Sides } from "../sides";


type Candidate = {
    cube: PocketCube;
    rotations: Rotation[]
}

export class BreadthFirstSearch {
    private readonly candidates: LinkedList;
    private readonly hashCandidates: Map<string, boolean>;
    private aborted: boolean;

    public constructor() {
        this.hashCandidates = new Map();
        this.aborted = false;
        this.candidates = new LinkedList()
    }

    public abort(): void {
        this.aborted = true;
    }

    public solve(cube: PocketCube): Solution {
        const startTime = Date.now();
        this.candidates.push({
            cube: cube,
            rotations: []
        })
        let iterations = 0;
        let current: Candidate;
        while (this.candidates.length > 0 && !this.aborted) {
            ++iterations;
            current = this.candidates.shift();
            if (this.hashCandidates.get(current.cube.getHash())) {
                continue;
            }
            if (current.cube.isSolved()) {
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
                iterations: iterations
            }
        }
    }

    private applyRotations(current: Candidate): void {
        [Sides.FRONT, Sides.UP, Sides.RIGHT]
            .forEach(side => {
                this.candidates.push({
                    cube: current.cube.rotateFace(side),
                    rotations: current.rotations.concat({
                        side: side,
                        clockwiseDirection: true
                    })
                })
            })

    }

}