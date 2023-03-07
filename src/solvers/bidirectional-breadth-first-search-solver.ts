
import { getOppositeSide, Sides } from "../constants/sides";
import LinkedList from "double-linked-list";
import { ProcedureMeasurer } from "./procedure-measurer";
import type { CubeSolver, Solution } from "./cube-solver";
import type { FaceRotation } from "@/engine/face-rotation";
import { RubiksCube, type Cubelet } from "@/engine/rubiks-cube";
import { type Colors, getOppositeColor } from "@/constants/colors";

enum Metrics {
    ADD_CANDIDATE,
    POP_CANDIDATE,
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

export class BidirectionalBreadthFirstSearchSolver implements CubeSolver {
    private readonly measurer: ProcedureMeasurer;
    private readonly forwardSearchToExploreList: LinkedList;
    private readonly forwardSearchExploredMap: Map<string, Candidate>;
    private readonly reverseSearchToExploreList: LinkedList;
    private readonly reverseSearchExploredMap: Map<string, Candidate>;
    private readonly actions: FaceRotation[];
    private aborted: boolean;

    public constructor(cube: RubiksCube) {
        this.forwardSearchToExploreList = new LinkedList();
        this.reverseSearchToExploreList = new LinkedList();
        this.actions = [];
        this.measurer = new ProcedureMeasurer();
        this.forwardSearchExploredMap = new Map();
        this.reverseSearchExploredMap = new Map();
        this.aborted = false;
        const current: Candidate = {
            cube: cube,
            rotation: undefined,
            parent: undefined,
        };

        this.forwardSearchToExploreList.push(current);

        const fixedSides: Sides[] = [];
        const xIndex = [Sides.RIGHT, Sides.LEFT][Math.floor(Math.random() * 2)];
        const yIndex = [Sides.UP, Sides.DOWN][Math.floor(Math.random() * 2)];
        const zIndex = [Sides.FRONT, Sides.BACK][Math.floor(Math.random() * 2)];
        [xIndex, yIndex, zIndex]
            .map(side => [true, false]
                .map(direction => {
                    fixedSides.push(getOppositeSide(side));
                    this.actions.push({ side: side, counterClockwiseDirection: direction, layer: 0 });
                }));

        const fixedCubelet = cube.getCubeletsBySides(...fixedSides)[0];
        const goalState = this.buildSolvedCubeFromCornerCubelet(fixedCubelet, cube.getDimension());

        const reverse: Candidate = {
            cube: goalState,
            rotation: undefined,
            parent: undefined,
        };

        this.reverseSearchToExploreList.push(reverse);
    }

    public abort(): void {
        this.aborted = true;
    }

    public async findSolution(): Promise<Solution> {
        return new Promise((resolve, reject) => {
            this.measurer.start();
            let forward: Candidate;
            let reverse: Candidate;
            let visitedNodes = 0;
            while (this.forwardSearchToExploreList.length > 0 && this.reverseSearchToExploreList.length > 0) {
                if (this.aborted) {
                    return reject();
                }
                do {
                    forward = this.measurer.add(Metrics[Metrics.POP_CANDIDATE], () => this.forwardSearchToExploreList.shift());
                } while (this.measurer.add(Metrics[Metrics.VISISTED_LIST_CHECK], () => this.forwardSearchExploredMap.has(forward!.cube.getHash())));
                do {
                    reverse = this.measurer.add(Metrics[Metrics.POP_CANDIDATE], () => this.reverseSearchToExploreList.shift());
                } while (this.measurer.add(Metrics[Metrics.VISISTED_LIST_CHECK], () => this.reverseSearchExploredMap.has(reverse!.cube.getHash())));
                ++visitedNodes;

                let meetPoint = this.measurer.add(Metrics[Metrics.VISISTED_LIST_CHECK], () => this.forwardSearchExploredMap.get(reverse.cube.getHash()));
                if (meetPoint) {
                    return resolve(this.createSolution(meetPoint, reverse, visitedNodes));
                }
                meetPoint = this.measurer.add(Metrics[Metrics.VISISTED_LIST_CHECK], () => this.reverseSearchExploredMap.get(forward.cube.getHash()));
                if (meetPoint) {
                    return resolve(this.createSolution(forward, meetPoint, visitedNodes));
                }

                this.measurer.add(Metrics[Metrics.ADD_TO_VISISTED_LIST_CHECK], () => this.forwardSearchExploredMap.set(forward.cube.getHash(), forward!));
                this.measurer.add(Metrics[Metrics.ADD_TO_VISISTED_LIST_CHECK], () => this.reverseSearchExploredMap.set(reverse.cube.getHash(), reverse!));
                this.applyRotations(this.forwardSearchToExploreList, this.forwardSearchExploredMap, forward);
                this.applyRotations(this.reverseSearchToExploreList, this.reverseSearchExploredMap, reverse);
            }
            return reject();
        });
    }

    private applyRotations(list: LinkedList, exploredMap: Map<string, Candidate>, current: Candidate): void {
        this.actions
            .forEach(rotation => {
                const newCandidate: RubiksCube = this.measurer.add(Metrics[Metrics.PERFORM_ROTATION], () => current.cube.rotateFace(rotation));
                if (!this.measurer.add(Metrics[Metrics.VISISTED_LIST_CHECK], () => exploredMap.has(newCandidate.getHash()))) {
                    this.measurer.add(Metrics[Metrics.ADD_CANDIDATE], () => {
                        list.push({
                            cube: newCandidate,
                            rotation: rotation,
                            parent: current
                        });

                    })
                }
            });
    }

    private createSolution(forward: Candidate, reverse: Candidate, visitedNodes: number): Solution {
        this.measurer.finish();
        const rotations: FaceRotation[] = [];
        let current: Candidate | undefined = forward;
        while (current && current.rotation) {
            rotations.unshift(current.rotation);
            current = current.parent;
        }
        current = reverse;
        while (current && current.rotation) {
            const reverseRotation = { ...current.rotation };
            reverseRotation.counterClockwiseDirection = !reverseRotation.counterClockwiseDirection;
            rotations.push(reverseRotation);
            current = current.parent;
        }

        return {
            rotations: rotations,
            totalTime: this.measurer.getTotalTime()!,
            data: {
                metrics: this.measurer.getData({ notMeasuredLabel: Metrics[Metrics.NOT_MEASURED] }),
                visitedNodes: visitedNodes
            }
        };
    }

    public buildSolvedCubeFromCornerCubelet(cubelet: Cubelet, dimension: number): RubiksCube {
        const colorMap: Map<Sides, Colors> = new Map();
        cubelet.stickers
            .forEach(sticker => {
                colorMap.set(sticker.side, sticker.color);
                colorMap.set(getOppositeSide(sticker.side), getOppositeColor(sticker.color));
            });
        return new RubiksCube({ colorMap: colorMap, dimension: dimension });
    }

}