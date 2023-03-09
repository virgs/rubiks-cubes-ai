import { getOppositeSide, Sides } from "../../constants/sides";
import { ProcedureMeasurer } from "../procedure-measurer";
import type { CubeSolver, Solution } from "../cube-solver";
import type { FaceRotation } from "@/engine/face-rotation";
import { RubiksCube } from "@/engine/rubiks-cube";
import { Colors, getOppositeColor } from "@/constants/colors";
import { HumanTranslator } from "@/printers/human-translator";

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



enum StepsGroup {
    SCRAMBLED,
    GOOD_EDGES,
    GOOD_CORNERS_AND_HORIZONTAL_EDGES,
    CORNERS_ORBIT
}

type Candidate = {
    cube: RubiksCube;
    rotation?: FaceRotation,
    parent?: Candidate
}

const groupPremutations = [
    "L R F B U D",
    "L R F B 2U 2D",
    "L R 2F 2B 2U 2D",
    "2L 2R 2F 2B 2U 2D",
]

const translator = new HumanTranslator();
const stepsRotationMap: Map<StepsGroup, FaceRotation[]> = new Map();
groupPremutations
    .forEach((rotationsString, step) => stepsRotationMap.set(step, translator.convertStringToFaceRotations(rotationsString)))


const edgesIndexes: number[] = new RubiksCube({ dimension: 3 }).getAllColorlessCubelets()
    .filter(cubelet => cubelet.stickers.length === 2)
    .flatMap(cubelet => cubelet.stickers
        .map(sticker => sticker.id));

//https://www.jaapsch.net/puzzles/thistle.htm
//https://medium.com/@benjamin.botto/implementing-an-optimal-rubiks-cube-solver-using-korf-s-algorithm-bf750b332cf9
export class ThistlethwaiteSolver implements CubeSolver {
    private readonly measurer: ProcedureMeasurer;
    private readonly root: Candidate;
    private currentMaxDepth: number;
    private visitedNodes: number;
    private visitedLeaves: number;
    private aborted: boolean;
    private currentStep: StepsGroup;
    private readonly goalState: RubiksCube;

    public constructor(cube: RubiksCube) {
        this.measurer = new ProcedureMeasurer();
        this.visitedNodes = 0;
        this.visitedLeaves = 0;
        this.aborted = false;
        this.currentStep = StepsGroup.GOOD_EDGES;

        this.goalState = this.buildSolvedCubeFromCentersCubelet(cube);
        this.currentMaxDepth = 0;

        this.root = {
            cube: cube,
            rotation: undefined,
            parent: undefined,
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
                if (solution) {
                    this.measurer.finish();
                    return resolve(this.createSolution(solution));
                }
                ++this.currentMaxDepth;
                console.log(this.currentMaxDepth)
            }
            reject(Error(`Aborted`));
        });
    }

    private beginSearch(candidate: Candidate, depth: number): Candidate | undefined {
        ++this.visitedNodes;
        if (this.aborted) {
            return undefined;
        }
        if (depth <= this.currentMaxDepth) {
            const children = this.applyRotations(candidate);
            for (let child of children) {
                const solution = this.beginSearch(child, depth + 1);
                if (solution) {
                    return solution;
                }
            }
        } else if (depth === this.currentMaxDepth) {
            ++this.visitedLeaves;
            if (this.solvesCurrentStep(candidate)) {
                console.log('indexes are found')
                return candidate;
            }
        }
    }

    private solvesCurrentStep(candidate: Candidate): boolean {
        const configuration = candidate.cube.getConfiguration();
        switch (this.currentStep) {
            case StepsGroup.GOOD_EDGES:
                return edgesIndexes.every(index => configuration[index] === this.goalState[index]);
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
                metrics: this.measurer.getData({ notMeasuredLabel: Metrics[Metrics.NOT_MEASURED] }),
                visitedNodes: this.visitedNodes,
                visitedLeaves: this.visitedLeaves
            }
        };
    }

    private applyRotations(current: Candidate): Candidate[] {
        const result: Candidate[] = [];
        stepsRotationMap.get(this.currentStep)!
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

    private buildSolvedCubeFromCentersCubelet(cube: RubiksCube): RubiksCube {
        const centers = cube.getAllCubelets()
            .filter(cubelet => cubelet.stickers.length === 1)

        const colorMap: Map<Sides, Colors> = new Map();
        centers
            .forEach(cubelet => cubelet.stickers
                .forEach(sticker => {
                    colorMap.set(sticker.side, sticker.color);
                    colorMap.set(getOppositeSide(sticker.side), getOppositeColor(sticker.color));
                })
            );
        return new RubiksCube({ colorMap: colorMap, dimension: cube.getDimension() });

    }

}