import Heap from 'heap';
import { getOppositeSide, Sides } from "../../constants/sides";
import type { CubeSolver, Solution } from "../cube-solver";
import { ProcedureMeasurer } from "../procedure-measurer";
import { rotationsCancel, type FaceRotation, rotationsAreEqual } from "@/engine/face-rotation";
import { Colors, getOppositeColor } from "@/constants/colors";
import { RubiksCube, type Cubelet } from '@/engine/rubiks-cube';
import { WeightedAStarAlgorithmConfig } from '@/configuration';

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
    HEURISTIC_CALCULATION,
    GET_ALL_CUBELETS,
    CUBELET_FINAL_POSITION,
    CUBELET_SIMILARITY,
    ITERATION,
    SOLUTION_CREATION,
    MEASUREMENT_OVERHEAD,
    ITERATIONS_COUNTER_INCREMENT,
    ABORTED_VERIFICATION,
    BUILD_SOLUTION
}
type Candidate = {
    cost: number,
    heuristicValue: number,
    cube: RubiksCube;
    rotation?: FaceRotation,
    parent?: Candidate;
}

// https://theory.stanford.edu/~amitp/GameProgramming/Variations.html#weighted-a-star
export class WeightedAStarSolver implements CubeSolver {
    private readonly measurer: ProcedureMeasurer;
    private readonly candidates: Heap<Candidate>;
    private readonly visitedChecklist: Map<string, Candidate>;
    private readonly actions: FaceRotation[];
    private readonly dimension: number;
    private readonly goalStateHash: string;
    private aborted: boolean;

    public constructor(cube: RubiksCube) {
        this.aborted = false;
        this.dimension = cube.getDimension();
        this.candidates = new Heap((a: Candidate, b: Candidate) => {
            return (a.cost + WeightedAStarAlgorithmConfig.heuristicWeight * a.heuristicValue) -
                (b.cost + WeightedAStarAlgorithmConfig.heuristicWeight * b.heuristicValue);
        });
        this.visitedChecklist = new Map();
        const current: Candidate = {
            cost: 0,
            heuristicValue: 0,
            cube: cube,
            rotation: undefined,
            parent: undefined,
        };
        this.candidates.push(current);
        this.actions = [];
        const fixedCubelet = cube.getCubeletsBySides(Sides.BACK, Sides.LEFT, Sides.DOWN)[0];
        const goalState = this.buildSolvedPocketCubeFromCornerCubelet(fixedCubelet);
        this.goalStateHash = goalState.getHash();
        [Sides.FRONT, Sides.UP, Sides.RIGHT] //So the fixed cubelet doesn't move
            .map(side => [true, false]
                .map(direction => {
                    this.actions.push({ side: side, counterClockwiseDirection: direction, layer: 0 });
                }));
        this.measurer = new ProcedureMeasurer();
    }

    public async findSolution(): Promise<Solution> {
        return new Promise((resolve, reject) => {
            this.measurer.start();
            let current: Candidate;
            let visitedNodes = 0;
            let differentNodes = 0;
            while (this.measurer.add(Metrics[Metrics.ITERATIONS_COUNTER_INCREMENT], () => this.candidates.size() > 0)) {
                if (this.measurer.add(Metrics[Metrics.ABORTED_VERIFICATION], () => this.aborted)) {
                    return reject();
                }
                this.measurer.add(Metrics[Metrics.ITERATIONS_COUNTER_INCREMENT], () => ++visitedNodes)
                current = this.measurer.add(Metrics[Metrics.POP_CANDIDATE], () => this.candidates.pop());
                if (this.measurer.add(Metrics[Metrics.VISISTED_LIST_CHECK], () => this.visitedChecklist.has(current.cube.getHash()))) {
                    continue;
                }
                ++differentNodes;
                if (this.measurer.add(Metrics[Metrics.CHECK_SOLUTION], () => current.cube.getHash() === this.goalStateHash)) {
                    return resolve((this.measurer.add(Metrics[Metrics.SOLUTION_CREATION], () => this.createSolution(current!, visitedNodes, differentNodes))));
                } else {
                    this.measurer.add(Metrics[Metrics.ADD_TO_VISISTED_LIST_CHECK], () => this.visitedChecklist.set(current.cube.getHash(), current));
                    this.applyRotations(current!);
                }
            }
            reject(Error(`No more candidates to explore`));
        })
    }

    public abort(): void {
        this.aborted = true;
    }

    private createSolution(candidate: Candidate, visitedNodes: number, differentNodes: number): Solution {
        const rotations: FaceRotation[] = [];
        let current: Candidate | undefined = candidate;
        this.measurer.add(Metrics[Metrics.BUILD_SOLUTION], () => {
            while (current && current.rotation) {
                rotations.unshift(current.rotation);
                current = current.parent;
            }
        })
        this.measurer.finish();
        this.candidates.clear();
        return {
            rotations: rotations,
            totalTime: this.measurer.getTotalTime()!,
            data: {
                metrics: this.measurer.getData({ notMeasuredLabel: Metrics[Metrics.NOT_MEASURED], measurementOverheadLabel: Metrics[Metrics.MEASUREMENT_OVERHEAD] }),
                visitedNodes: visitedNodes,
                differentNodes: differentNodes
            }
        }
    }

    private applyRotations(current: Candidate): void {
        for (let rotation of this.actions) {
            // Avoids undoing stuff
            if (current.rotation) {
                if (rotationsCancel(current.rotation, rotation)) {
                    continue;
                }
                if (current.parent && current.parent.rotation &&
                    rotationsAreEqual(current.rotation, rotation) &&
                    rotationsAreEqual(current.parent.rotation, rotation)) {
                    continue;
                }
            }

            const newCubeConfiguration: RubiksCube = this.measurer.add(Metrics[Metrics.PERFORM_ROTATION], () => current.cube.rotateFace(rotation));
            const newCubeHash = newCubeConfiguration.getHash();
            const heuristicFunctionValue = this.measurer.add(Metrics[Metrics.HEURISTIC_CALCULATION], () => this.calculateDistanceToFinalState(newCubeConfiguration));
            const newCandidate: Candidate = {
                cost: current.cost + 1,
                cube: newCubeConfiguration,
                rotation: rotation,
                heuristicValue: heuristicFunctionValue,
                parent: current
            };
            const alreadyVisited = this.measurer.add(Metrics[Metrics.VISISTED_LIST_CHECK], () => this.visitedChecklist.get(newCubeHash));
            if (!alreadyVisited) {
                this.measurer.add(Metrics[Metrics.ADD_CANDIDATE], () => {
                    this.candidates.push(newCandidate);
                });
            }
        }
    }

    //Calcs how many stickers have the same color as they should
    private calculateDistanceToFinalState(cube: RubiksCube): number {
        const numberOfStickersThatChangeFaceInOneTwist = this.dimension * 4; //stickers in the face that is moving don't actually change faces
        const cubeConfiguration = cube.getConfiguration();
        return cubeConfiguration
            .split('')
            .filter((char, index) => char !== this.goalStateHash[index])
            .length / numberOfStickersThatChangeFaceInOneTwist;

    }

    public buildSolvedPocketCubeFromCornerCubelet(cubelet: Cubelet): RubiksCube {
        const colorMap: Map<Sides, Colors> = new Map();
        cubelet.stickers
            .forEach(sticker => {
                colorMap.set(sticker.side, sticker.color);
                colorMap.set(getOppositeSide(sticker.side), getOppositeColor(sticker.color));
            });
        return new RubiksCube({ colorMap: colorMap, dimension: this.dimension });
    }

}