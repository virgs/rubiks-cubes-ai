import { getOppositeSide, Sides } from "../../constants/sides";
import { ProcedureMeasurer } from "../procedure-measurer";
import type { CubeSolver, Solution } from "../cube-solver";
import type { FaceRotation } from "@/engine/face-rotation";
import { type Cubelet, RubiksCube } from "@/engine/rubiks-cube";
import { Colors, getOppositeColor } from "@/constants/colors";
import { RotationsTuner } from "@/printers/rotations-tuner";

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
    cost: number
}

export class InterativeDeepeningAStarSolver implements CubeSolver {
    private readonly measurer: ProcedureMeasurer;
    private readonly actions: FaceRotation[];
    private readonly goalStateHash: string;
    private readonly root: Candidate;
    private bound: number;
    private visitedNodes: number;
    private aborted: boolean;

    public constructor(cube: RubiksCube) {
        this.measurer = new ProcedureMeasurer();
        this.visitedNodes = 0;
        this.aborted = false;

        this.actions = [];
        [Sides.FRONT, Sides.UP, Sides.RIGHT] //So the fixed cubelet doesn't move
            .map(side => {
                this.actions.push({ side: side, layer: 0 });
            });

        const fixedCubelet = cube.getCubeletsBySides(Sides.BACK, Sides.LEFT, Sides.DOWN)[0];
        const goalState = this.buildSolvedPocketCubeFromCornerCubelet(fixedCubelet, cube.getDimension());
        this.goalStateHash = goalState.getHash();
        this.bound = this.calculateDistanceToFinalState(cube);

        this.root = {
            cube: cube,
            rotation: undefined,
            parent: undefined,
            cost: 0
        };
    }

    public abort(): void {
        this.aborted = true;
    }

    public async findSolution(): Promise<Solution> {
        return new Promise((resolve, reject) => {
            this.measurer.start();
            while (!this.aborted) {
                const solution = this.beginSearch(this.root, 0)
                if (typeof (solution) === 'number') {
                    this.bound = Number(solution);
                } else {
                    this.measurer.finish();
                    return resolve(this.createSolution(solution as Candidate));
                }
            }
            reject(Error(`Aborted`));
        });
    }

    private beginSearch(candidate: Candidate, depth: number): Candidate | number {
        ++this.visitedNodes;
        if (this.aborted) {
            return -1;
        }
        const heuristicValue = this.calculateDistanceToFinalState(candidate.cube);
        const predictedCost = candidate.cost + heuristicValue;
        if (predictedCost > this.bound) {
            return predictedCost;
        }

        if (candidate.cube.isSolved()) {
            return candidate;
        }

        let minGreaterValue = Infinity;
        const children = this.applyRotations(candidate);
        for (let child of children) {
            const foundOrCost = this.beginSearch(child, depth + 1);
            if (typeof (foundOrCost) === 'number') {
                minGreaterValue = Math.min(foundOrCost, minGreaterValue);
            } else {
                return foundOrCost as Candidate;
            }
        }

        return minGreaterValue as number;
    }

    private createSolution(candidate: Candidate): Solution {
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
                        parent: current,
                        cost: current.cost + 1
                    });
                })
            });
        return result;
    }

    //Calcs how many stickers have the same color as they should
    private calculateDistanceToFinalState(cube: RubiksCube): number {
        const numberOfStickersMovedInOneTwistInAverage = (cube.getDimension() * cube.getDimension()) + cube.getDimension() * 4;
        const cubeConfiguration = cube.getConfiguration();
        return Math.ceil(cubeConfiguration
            .split('')
            .filter((char, index) => char !== this.goalStateHash[index])
            .length / numberOfStickersMovedInOneTwistInAverage);
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