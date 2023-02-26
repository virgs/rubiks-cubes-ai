import Heap from 'heap';
import { PocketCube } from "../../engine/pocket-cube";
import { getOppositeSide, Sides } from "../../constants/sides";
import type { CubeSolver, Solution } from "../cube-solver";
import { ProcedureMeasurer } from "../procedure-measurer";
import type { FaceRotation } from "@/engine/face-rotation";
import { type Colors, getOppositeColor } from "@/constants/colors";
import type { Cubelet } from "@/engine/rubiks-cube";

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
    cost: number,
    cube: PocketCube;
    rotation?: FaceRotation,
    parent?: Candidate
}


export class PocketCubeAStar implements CubeSolver {
    private readonly measurer: ProcedureMeasurer;
    private readonly candidates: Heap<Candidate>;
    private readonly goalState: PocketCube;
    private readonly visitedChecklist: Map<string, boolean>;
    private readonly actions: FaceRotation[];
    private aborted: boolean;

    public constructor(cube: PocketCube) {
        this.aborted = false;
        this.measurer = new ProcedureMeasurer();
        this.candidates = new Heap((a: Candidate, b: Candidate) => a.cost - b.cost);
        this.visitedChecklist = new Map();
        const current: Candidate = {
            cost: 0,
            cube: cube,
            rotation: undefined,
            parent: undefined,
        };
        this.candidates.push(current);
        this.actions = [];
        const fixedCubelet = cube.getCubeletsBySides(Sides.BACK, Sides.LEFT, Sides.DOWN)[0];
        this.goalState = this.buildSolvedPocketCubeFromCornerCubelet(fixedCubelet);
        [Sides.FRONT, Sides.UP, Sides.RIGHT] //So the fixed cubelet doesn't move
            .map(side => [true, false]
                .map(direction => {
                    this.actions.push({ side: side, counterClockwiseDirection: direction, layer: 0 });
                }));
    }

    public async findSolution(): Promise<Solution> {
        return new Promise((resolve, reject) => {
            this.measurer.start();
            let current: Candidate | undefined;
            let iterations = 0;
            while (this.candidates.size() > 0) {
                if (this.aborted) {
                    return reject();
                }
                ++iterations;
                current = this.measurer.add(Metrics[Metrics.POP_CANDIDATE], () => this.candidates.pop());
                if (this.measurer.add(Metrics[Metrics.VISISTED_LIST_CHECK], () => this.visitedChecklist.has(current!.cube.getHash()))) {
                    continue;
                }
                if (this.measurer.add(Metrics[Metrics.CHECK_SOLUTION], () => current!.cube.isSolved())) {
                    this.measurer.finish();
                    this.candidates.clear();
                    return resolve(this.createSolution(current!, iterations));
                } else {
                    this.measurer.add(Metrics[Metrics.ADD_TO_VISISTED_LIST_CHECK], () => this.visitedChecklist.set(current!.cube.getHash(), true));
                    this.applyRotations(current!);
                }
            }
        })
    }

    public abort(): void {
        this.aborted = true;
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

    private applyRotations(parent: Candidate): void {
        this.actions
            .forEach(rotation => {
                const newCandidate = this.measurer.add(Metrics[Metrics.PERFORM_ROTATION], () => parent.cube.rotateFace(rotation));
                if (!this.measurer.add(Metrics[Metrics.VISISTED_LIST_CHECK], () => this.visitedChecklist.has(newCandidate.getHash()))) {
                    this.measurer.add(Metrics[Metrics.ADD_CANDIDATE], () => {
                        this.candidates.push({
                            cost: parent.cost + 1 + this.calculateDistanceToFinalState(newCandidate),
                            cube: newCandidate,
                            rotation: rotation,
                            parent: parent
                        });

                    })
                }
            })
    }

    //Calcs how many sides the cubelet corner shares with the corner where it's supposed to be
    private calculateDistanceToFinalState(cube: PocketCube): number {
        const numberOfCubeletsMovedInOneRotation: number = 4.0;
        return cube.getAllCubelets()
            .reduce((acc, cubelet) => {
                const cubeletFinalPosition = this.goalState.getCubeletsByColor(...cubelet.stickers
                    .map(sticker => sticker.color))[0]; // since it's a pocket cube, there will be one, and only one, sticker
                return acc + cubelet.stickers
                    .reduce((sum, sticker) => {
                        if (cubeletFinalPosition.stickers
                            .some(finalPositionSticker => finalPositionSticker.side === sticker.side)) {
                            return sum - 1;
                        }
                        return sum;
                    }, cubelet.stickers.length); // 3, each cubelet has 3 stickers
            }, 0) / numberOfCubeletsMovedInOneRotation;
    }

    public buildSolvedPocketCubeFromCornerCubelet(cubelet: Cubelet): PocketCube {
        const colorMap: Map<Colors, Sides> = new Map();
        cubelet.stickers
            .forEach(sticker => {
                colorMap.set(sticker.color, sticker.side);
                colorMap.set(getOppositeColor(sticker.color), getOppositeSide(sticker.side));
            });
        return new PocketCube({ colorMap: colorMap });
    }

}