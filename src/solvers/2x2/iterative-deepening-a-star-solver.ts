import { Colors, getOppositeColor } from "@/constants/colors";
import { rotationsCancel, type FaceRotation, rotationsAreEqual } from "@/engine/face-rotation";
import { RubiksCube, type Cubelet } from "@/engine/rubiks-cube";
import { getAdjacentSides, getOppositeSide, Sides } from "../../constants/sides";
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
    NOT_MEASURED,
    CYCLE_AVOIDANCE_CHECK
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

type IterationData = {
    bound: number;
    visitedNodes: number;
};

export class InterativeDeepeningAStarSolver implements CubeSolver {
    private readonly measurer: ProcedureMeasurer;
    private readonly actions: FaceRotation[];
    private readonly goalStateHash: string;
    private readonly root: Candidate;
    private readonly numberOfStickersThatChangeFaceInOneTwist: number;
    private readonly iterations: IterationData[];
    private readonly minBoundGrow: number = 1.25 //Avoids new nodes visited per iteration non exponential grow
    private bound: number;
    private visitedNodes: number;
    private aborted: boolean;

    public constructor(cube: RubiksCube) {
        this.iterations = [];
        this.measurer = new ProcedureMeasurer();
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
        this.numberOfStickersThatChangeFaceInOneTwist = dimension * 4; //stickers in the face that is moving don't actually change faces
        this.bound = Math.max(this.calculateDistanceToFinalState(cube), 8); // More than 80% of the scrambled cubes are 8 steps away from the solution AND it's really cheap to go this deep if the cube is easier than this

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
        return new Promise((resolve, reject) => {
            this.measurer.start();
            while (!this.aborted) {
                const searchResult = this.search(this.root, 0)
                if (searchResult.solution) {
                    return resolve(this.createSolution(searchResult.solution));
                } else if (searchResult.aborted) {
                    break;
                } else {
                    this.iterations.push({ visitedNodes: this.visitedNodes, bound: this.bound });
                    this.bound = Math.max(searchResult.cost!, this.bound + this.minBoundGrow);
                    this.visitedNodes = 0;
                }
            }
            reject(Error(`Aborted`));
        });
    }

    private search(candidate: Candidate, depth: number): SearchResult {
        ++this.visitedNodes;
        if (this.aborted) {
            return { aborted: true };
        }
        let estimatedCost = this.calculateDistanceToFinalState(candidate.cube);

        if (candidate.cube.isSolved()) {
            return { solution: candidate };
        }

        let minGreaterValue = Infinity;
        const children = this.applyRotations(candidate);
        for (let child of children) {
            const sum = depth + estimatedCost;
            if (sum > this.bound) {
                return { cost: sum };
            }

            const searchResult = this.search(child, depth + 1);
            if (searchResult.solution || searchResult.aborted) {
                return searchResult;
            } else {
                // https://github.com/lukapopijac/pocket-cube-optimal-solver#about-the-search-algorithm
                estimatedCost = Math.min(estimatedCost, searchResult.cost! - 1);
                minGreaterValue = Math.min(searchResult.cost!, minGreaterValue);
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
            rotations: rotations,
            totalTime: this.measurer.getTotalTime()!,
            data: {
                metrics: this.measurer.getData({ notMeasuredLabel: Metrics[Metrics.NOT_MEASURED] }),
                visitedNodes: this.iterations
                    .reduce((acc, item) => acc + item.visitedNodes, 0),
                iterations: this.iterations
            }
        };
    }

    private applyRotations(current: Candidate): Candidate[] {
        const result: Candidate[] = [];
        this.actions
            .forEach(rotation => {
                // Avoids undoing stuff
                if (current.rotation) {
                    if (rotationsCancel(current.rotation, rotation)) {
                        return;
                    }
                    if (current.parent && current.parent.rotation &&
                        rotationsAreEqual(current.rotation, rotation) &&
                        rotationsAreEqual(current.parent.rotation, rotation)) {
                        return;
                    }
                }
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
        return Math.ceil(cubeConfiguration
            .split('')
            .filter((char, index) => char !== this.goalStateHash[index])
            .length / this.numberOfStickersThatChangeFaceInOneTwist);
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