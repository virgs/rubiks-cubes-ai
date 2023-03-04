import Heap from 'heap';
import { getOppositeSide, Sides } from "../constants/sides";
import type { CubeSolver, Solution } from "./cube-solver";
import { ProcedureMeasurer } from "./procedure-measurer";
import type { FaceRotation } from "@/engine/face-rotation";
import { Colors, getOppositeColor } from "@/constants/colors";
import { RubiksCube, type Cubelet } from '@/engine/rubiks-cube';
import { Configuration } from '@/configuration';

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
    ABORTED_VERIFICATION
}
type Candidate = {
    cost: number,
    cube: RubiksCube;
    rotation?: FaceRotation,
    parent?: Candidate;
    hash: string;
}


export class AStarSolver implements CubeSolver {
    private readonly measurer: ProcedureMeasurer;
    private readonly candidates: Heap<Candidate>;
    private readonly goalState: RubiksCube;
    private readonly visitedChecklist: Map<string, boolean>;
    private readonly actions: FaceRotation[];
    private readonly dimension: number;
    private readonly goalStateCubelets: Map<string, Sides[]>;
    private readonly goalStateHash: string;
    private aborted: boolean;

    public constructor(cube: RubiksCube) {
        this.aborted = false;
        this.dimension = cube.getDimension();
        this.candidates = new Heap((a: Candidate, b: Candidate) => a.cost - b.cost);
        this.visitedChecklist = new Map();
        const current: Candidate = {
            cost: 0,
            cube: cube,
            rotation: undefined,
            parent: undefined,
            hash: cube.getHash()
        };
        this.candidates.push(current);
        this.actions = [];
        const fixedCubelet = cube.getCubeletsBySides(Sides.BACK, Sides.LEFT, Sides.DOWN)[0];
        this.goalState = this.buildSolvedPocketCubeFromCornerCubelet(fixedCubelet);
        this.goalStateHash = this.goalState.getHash();
        console.log(this.goalStateHash)
        this.goalStateCubelets = new Map();
        this.goalState.getAllCubelets()
            .forEach(cubelet => {
                const colors = cubelet.stickers.map(sticker => sticker.color).sort().toString()
                const sides = cubelet.stickers.map(sticker => sticker.side)
                this.goalStateCubelets.set(colors, sides);
            });
        [Sides.FRONT, Sides.UP, Sides.RIGHT] //So the fixed cubelet doesn't move
            .map(side => [true, false]
                .map(direction => {
                    this.actions.push({ side: side, counterClockwiseDirection: direction, layer: 0 });
                }));
        this.measurer = new ProcedureMeasurer(Configuration.metrics.enabled);
    }

    public async findSolution(): Promise<Solution> {
        return new Promise((resolve, reject) => {
            this.measurer.start();
            let current: Candidate;
            let iterations = 0;
            while (this.measurer.add(Metrics[Metrics.ITERATIONS_COUNTER_INCREMENT], () => this.candidates.size() > 0)) {
                if (this.measurer.add(Metrics[Metrics.ABORTED_VERIFICATION], () => this.aborted)) {
                    return reject();
                }
                this.measurer.add(Metrics[Metrics.ITERATIONS_COUNTER_INCREMENT], () => ++iterations)
                current = this.measurer.add(Metrics[Metrics.POP_CANDIDATE], () => this.candidates.pop());
                if (this.measurer.add(Metrics[Metrics.VISISTED_LIST_CHECK], () => this.visitedChecklist.has(current.hash))) {
                    continue;
                }
                if (this.measurer.add(Metrics[Metrics.CHECK_SOLUTION], () => current.hash === this.goalStateHash)) {
                    return resolve((this.measurer.add(Metrics[Metrics.SOLUTION_CREATION], () => this.createSolution(current!, iterations))));
                } else {
                    this.measurer.add(Metrics[Metrics.ADD_TO_VISISTED_LIST_CHECK], () => this.visitedChecklist.set(current.hash, true));
                    this.applyRotations(current!);
                }
            }
            reject(Error(`No more candidates to explore`));
        })
    }

    public abort(): void {
        this.aborted = true;
    }

    private createSolution(candidate: Candidate, iterations: number): Solution {
        this.measurer.finish();
        this.candidates.clear();
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
                metrics: this.measurer.getData({ notMeasuredLabel: Metrics[Metrics.NOT_MEASURED], measurementOverheadLabel: Metrics[Metrics.MEASUREMENT_OVERHEAD] }),
                iterations: iterations
            }
        }
    }

    private applyRotations(parent: Candidate): void {
        for (let rotation of  this.actions) {
            const newCandidate: RubiksCube = this.measurer.add(Metrics[Metrics.PERFORM_ROTATION], () => parent.cube.rotateFace(rotation));
            const newCandidateHash = newCandidate.getHash();
            const heuristicFunctionValue = this.measurer.add(Metrics[Metrics.HEURISTIC_CALCULATION], () => this.calculateDistanceToFinalState(newCandidate));
            if (!this.measurer.add(Metrics[Metrics.VISISTED_LIST_CHECK], () => this.visitedChecklist.has(newCandidateHash))) {
                this.measurer.add(Metrics[Metrics.ADD_CANDIDATE], () => {
                    this.candidates.push({
                        cost: parent.cost + 1 + heuristicFunctionValue,
                        cube: newCandidate,
                        rotation: rotation,
                        parent: parent,
                        hash: newCandidateHash
                    } as Candidate);
                });
            }
        }
    }

    //Calcs how many stickers have the same color as they should
    private calculateDistanceToFinalState(cube: RubiksCube): number {
        const numberOfStickersMovedInOneTwistInAverage = (this.dimension * this.dimension) + this.dimension * 4;
        const cubeConfiguration = cube.getConfiguration();
        return cubeConfiguration
            .split('')
            .filter((char, index) => char !== this.goalStateHash[index])
            .length / numberOfStickersMovedInOneTwistInAverage;
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