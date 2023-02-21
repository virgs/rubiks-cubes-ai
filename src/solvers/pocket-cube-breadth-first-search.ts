import type { Solution } from "./solution";
import LinkedList from "double-linked-list";
import type { PocketCube } from "../engine/pocket-cube";
import { Sides } from "../constants/sides";
import { ProcedureMeasurer } from "./procedure-measurer";
import type { CubeSolver } from "./cube-solver";
import { Configuration } from "@/configuration";
import type { FaceRotation } from "@/engine/face-rotation";

type Candidate = {
    cube: PocketCube;
    rotation?: FaceRotation,
    parent?: Candidate
}

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


export class BreadthFirstSearch implements CubeSolver {
    private readonly measurer: ProcedureMeasurer;
    private readonly candidates: LinkedList;
    private readonly visitedChecklist: Map<string, boolean>;
    private readonly internalIterations: number = Configuration.solvers.bfs.iterations;;
    private readonly actions: FaceRotation[];
    private iterations: number;

    public constructor(cube: PocketCube) {
        this.measurer = new ProcedureMeasurer();
        this.visitedChecklist = new Map();
        this.candidates = new LinkedList();
        this.iterations = 0;
        const current: Candidate = {
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
        while (this.candidates.length > 0 && counter > 0) {
            --counter;
            ++this.iterations;
            current = this.measurer.add(Metrics[Metrics.POP_CANDIDATE], () => this.candidates.shift());
            if (this.measurer.add(Metrics[Metrics.VISISTED_LIST_CHECK], () => this.visitedChecklist.has(current!.cube.getHash()))) {
                continue;
            }
            if (this.measurer.add(Metrics[Metrics.CHECK_SOLUTION], () => current!.cube.isSolved())) {
                this.measurer.finish();
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