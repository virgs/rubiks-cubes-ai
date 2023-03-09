import { Colors, getOppositeColor } from "@/constants/colors";
import type { FaceRotation } from "@/engine/face-rotation";
import { RubiksCube, type Cubelet } from "@/engine/rubiks-cube";
import { RotationsTuner } from "@/printers/rotations-tuner";
import { getAdjacentSides, getAllSides, getOppositeSide, Sides } from "../../constants/sides";
import type { CubeSolver, Solution } from "../cube-solver";
import { ProcedureMeasurer } from "../procedure-measurer";

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
    cube: RubiksCube;
    rotation?: FaceRotation,
    parent?: Candidate
}

interface SearchResult {
    aborted?: boolean;
    solution?: Candidate;
    cost?: number;
}

export class InterativeDeepeningAStarSolver implements CubeSolver {
    private readonly measurer: ProcedureMeasurer;
    private readonly actions: FaceRotation[];
    private readonly goalStateHash: string;
    private readonly root: Candidate;
    private readonly numberOfStickersMovedInOneTwistInAverage: number;
    private currentPath: string[];
    private bound: number;
    private visitedNodes: number;
    private aborted: boolean;

    public constructor(cube: RubiksCube) {
        this.measurer = new ProcedureMeasurer();
        this.currentPath = [];
        this.visitedNodes = 0;
        this.aborted = false;

        this.actions = [];
        [Sides.FRONT, Sides.UP, Sides.RIGHT] //So the fixed cubelet doesn't move
            .map(side => [true, false]
                .map(direction => {
                    this.actions.push({ side: side, counterClockwiseDirection: direction, layer: 0 });
                }));

        const fixedCubelet = cube.getCubeletsBySides(Sides.BACK, Sides.LEFT, Sides.DOWN)[0];
        const goalState = this.buildSolvedPocketCubeFromCornerCubelet(fixedCubelet, cube.getDimension());
        this.goalStateHash = goalState.getHash();
        const dimension = cube.getDimension();
        this.numberOfStickersMovedInOneTwistInAverage = dimension * dimension + dimension * getAdjacentSides(Sides.UP).length; //any side would do
        this.bound = this.calculateDistanceToFinalState(cube);

        this.root = {
            cube: cube,
            rotation: undefined,
            parent: undefined
        };
    }

    public abort(): void {
        this.aborted = true;
    }

    public async findSolution(): Promise<Solution> {
        console.log('start')
        return new Promise((resolve, reject) => {
            this.measurer.start();
            while (!this.aborted) {
                this.currentPath = [this.root.cube.getHash()];

                const searchResult = this.beginSearch(this.root, 0)
                if (searchResult.solution) {
                    return resolve(this.createSolution(searchResult.solution));
                } else if (searchResult.aborted) {
                    break;
                } else {
                    this.bound = searchResult.cost;
                    console.log(this.bound)
                }
            }
            reject(Error(`Aborted`));
        });
    }

    private beginSearch(candidate: Candidate, depth: number): SearchResult {
        ++this.visitedNodes;
        if (this.aborted) {
            return { aborted: true };
        }
        const estimatedCost = this.calculateDistanceToFinalState(candidate.cube);
        const sum = depth + estimatedCost;
        if (sum > this.bound) {
            return { cost: sum };
        }

        if (candidate.cube.isSolved()) {
            return { solution: candidate };
        }

        let minGreaterValue = Infinity;
        const children = this.applyRotations(candidate);
        for (let child of children) {
            if (this.currentPath
                .every(hash => hash !== child.cube.getHash())) {// avoid cycles
                this.currentPath.push(child.cube.getHash());
                const searchResult = this.beginSearch(child, depth + 1);
                if (searchResult.solution || searchResult.aborted) {
                    return searchResult;
                } else {
                    minGreaterValue = Math.min(searchResult.cost, minGreaterValue);
                }
                this.currentPath.pop();
            }
        }

        return { cost: minGreaterValue };
    }

    private createSolution(candidate: Candidate): Solution {
        this.measurer.finish();
        const rotations: FaceRotation[] = [];
        let current: Candidate | undefined = candidate;
        while (current && current.rotation) {
            rotations.unshift(current.rotation);
            current = current.parent;
        }

        return {
            rotations: new RotationsTuner().tune(rotations),
            totalTime: this.measurer.getTotalTime()!,
            data: {
                metrics: this.measurer.getData({ notMeasuredLabel: Metrics[Metrics.NOT_MEASURED] }),
                visitedNodes: this.visitedNodes,
            }
        };
    }

    private applyRotations(current: Candidate): Candidate[] {
        const result: Candidate[] = [];
        this.actions
            .forEach(rotation => {
                const newCandidate: RubiksCube = this.measurer.add(Metrics[Metrics.PERFORM_ROTATION], () => current.cube.rotateFace(rotation));
                this.measurer.add(Metrics[Metrics.ADD_CANDIDATE], () => {
                    result.push({
                        cube: newCandidate,
                        rotation: rotation,
                        parent: current
                    });
                })
            });
        return result;
    }

    //Calcs how many stickers have the same color as they should
    private calculateDistanceToFinalState(cube: RubiksCube): number {
        const cubeConfiguration = cube.getConfiguration();
        return cubeConfiguration
            .split('')
            .filter((char, index) => char !== this.goalStateHash[index])
            .length / this.numberOfStickersMovedInOneTwistInAverage;
    }

    public buildSolvedPocketCubeFromCornerCubelet(cubelet: Cubelet, dimension: number): RubiksCube {
        const colorMap: Map<Sides, Colors> = new Map();
        cubelet.stickers
            .forEach(sticker => {
                colorMap.set(sticker.side, sticker.color);
                colorMap.set(getOppositeSide(sticker.side), getOppositeColor(sticker.color));
            });
        return new RubiksCube({ colorMap: colorMap, dimension: dimension });
    }

}