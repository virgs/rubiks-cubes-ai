import LinkedList from "double-linked-list";
import type { FaceRotation } from "@/engine/face-rotation";
import type { CubeSolver, Solution } from "@/solvers/cube-solver";
import { RubiksCube } from "@/engine/rubiks-cube";
import { type Colors } from "@/constants/colors";
import { getAllSides, Sides } from "@/constants/sides";
import { ProcedureMeasurer } from "../procedure-measurer";
import { HumanTranslator } from "@/printers/human-translator";

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
    edgesHash: string,
    rotation?: FaceRotation,
    parent?: Candidate
}

const translator = new HumanTranslator();

const revolutions = [
    // "F F2 F3",
    // "F' F2' F3'",
    // "R R2 R3",
    // "R' R2' R3'",
    // "U U2 U3",
    // "U' U2' U3'",
]
    .map(permutation => translator.convertStringToFaceRotations(permutation));

const cornersPermutations = [
    // "2R2 2F2 2F2",
    // // permutes two corners: U face, bottom left and bottom right
    // "2U B 2U B' 2R F R' F' 2U F' 2U F R'",
    // // permutes three corners: U face, bottom left and top left
    // "2U R 2U R' 2F L F' L' 2U L' 2U L F'",
    // // permutes three corners: U face, bottom right, bottom left and top left
    // "F' U B U' F U B' U'",
    // // permutes three corners: U face, bottom left, bottom right and top right
    // "F U' B' U F' U' B U",
]
    .map(permutation => translator.convertStringToFaceRotations(permutation))


export class MultiStepSearchSolver implements CubeSolver {
    private readonly measurer: ProcedureMeasurer;
    private readonly goalState: RubiksCube;

    private readonly forwardSearchToExploreList: LinkedList;
    private readonly forwardSearchExploredMap: Map<string, Candidate>;
    private readonly reverseSearchToExploreList: LinkedList;
    private readonly reverseSearchExploredMap: Map<string, Candidate>;
    private readonly edgesIndexes: number[];
    private readonly initialState: RubiksCube;
    private readonly firstStepActions: FaceRotation[];

    private readonly cornersIndexes: number[];
    private readonly secondStepActions: FaceRotation[][];

    private aborted: boolean;

    public constructor(cube: RubiksCube) {
        this.forwardSearchToExploreList = new LinkedList();
        this.reverseSearchToExploreList = new LinkedList();
        this.firstStepActions = [];
        this.measurer = new ProcedureMeasurer();
        this.forwardSearchExploredMap = new Map();
        this.reverseSearchExploredMap = new Map();
        this.edgesIndexes = cube.getAllColorlessCubelets()
            .filter(cubelet => cubelet.stickers.length === 2)
            .map(cubelet => cubelet.stickers
                .map(sticker => sticker.id))
            .reduce((acc, ids) => acc.concat(...ids), []);
        this.cornersIndexes = cube.getAllColorlessCubelets()
            .filter(cubelet => cubelet.stickers.length === 3)
            .map(cubelet => cubelet.stickers
                .map(sticker => sticker.id))
            .reduce((acc, ids) => acc.concat(...ids), []);

        this.aborted = false;
        this.goalState = this.buildSolvedCubeFromCenterCubelets(cube);
        this.initialState = cube;
        this.initializeEdgesStep();

        this.secondStepActions = revolutions.concat(cornersPermutations);
    }

    private initializeEdgesStep(): void {
        const current: Candidate = {
            cube: this.initialState,
            edgesHash: this.getEdgesHash(this.initialState),
            rotation: undefined,
            parent: undefined,
        };
        this.forwardSearchToExploreList.push(current);

        getAllSides()
            .map(side => [true, false]
                .map(direction => {
                    this.firstStepActions.push({ side: side, counterClockwiseDirection: direction, layer: 0 });
                }));


        const reverse: Candidate = {
            cube: this.goalState,
            edgesHash: this.getEdgesHash(this.goalState),
            rotation: undefined,
            parent: undefined,
        };

        this.reverseSearchToExploreList.push(reverse);
        console.log(reverse.edgesHash)
    }

    private getEdgesHash(cube: RubiksCube): string {
        const configuration = cube.getConfiguration();
        return this.edgesIndexes
            .map(index => configuration.charAt(index)).join('')
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
                } while (this.measurer.add(Metrics[Metrics.VISISTED_LIST_CHECK], () => this.forwardSearchExploredMap.has(forward!.edgesHash)));
                do {
                    reverse = this.measurer.add(Metrics[Metrics.POP_CANDIDATE], () => this.reverseSearchToExploreList.shift());
                } while (this.measurer.add(Metrics[Metrics.VISISTED_LIST_CHECK], () => this.reverseSearchExploredMap.has(reverse!.edgesHash)));
                ++visitedNodes;

                if (forward.edgesHash === this.getEdgesHash(this.goalState)) {
                    console.log('half solved')
                }

                let meetPoint = this.measurer.add(Metrics[Metrics.VISISTED_LIST_CHECK], () => this.forwardSearchExploredMap.get(reverse.edgesHash));
                if (meetPoint) {
                    console.log('forward')
                    const solution = this.createFirstSolution(meetPoint, reverse, visitedNodes)
                    return resolve(solution);
                }
                meetPoint = this.measurer.add(Metrics[Metrics.VISISTED_LIST_CHECK], () => this.reverseSearchExploredMap.get(forward.edgesHash));
                if (meetPoint) {
                    console.log('reverse')
                    const solution = this.createFirstSolution(forward, meetPoint, visitedNodes)
                    return resolve(solution);
                }
                if (visitedNodes % 1000 === 0) {
                    console.log(visitedNodes, this.forwardSearchToExploreList.length, this.reverseSearchToExploreList.length)
                }

                this.measurer.add(Metrics[Metrics.ADD_TO_VISISTED_LIST_CHECK], () => this.forwardSearchExploredMap.set(forward.edgesHash, forward!));
                this.measurer.add(Metrics[Metrics.ADD_TO_VISISTED_LIST_CHECK], () => this.reverseSearchExploredMap.set(reverse.edgesHash, reverse!));
                this.applyRotations(this.forwardSearchToExploreList, this.forwardSearchExploredMap, forward);
                this.applyRotations(this.reverseSearchToExploreList, this.reverseSearchExploredMap, reverse);
            }
            return reject();
        });
    }

    private applyRotations(list: LinkedList, exploredMap: Map<string, Candidate>, current: Candidate): void {
        this.firstStepActions
            .forEach(rotation => {
                const newCandidate: RubiksCube = this.measurer.add(Metrics[Metrics.PERFORM_ROTATION], () => current.cube.rotateFace(rotation));
                const edgesHash = this.getEdgesHash(newCandidate);
                if (!this.measurer.add(Metrics[Metrics.VISISTED_LIST_CHECK], () => exploredMap.has(edgesHash))) {
                    this.measurer.add(Metrics[Metrics.ADD_CANDIDATE], () => {
                        list.push({
                            cube: newCandidate,
                            rotation: rotation,
                            parent: current,
                            edgesHash: edgesHash
                        });

                    })
                }
            });
    }

    private async createFirstSolution(forward: Candidate, reverse: Candidate, visitedNodes: number): Promise<Solution> {
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

        const halfSolvedCube = rotations
            .reduce((finalState, rotation) => finalState.rotateFace(rotation), forward.cube);

        console.log(`found it`);
        console.log(new HumanTranslator().translateRotations(rotations))

        this.forwardSearchExploredMap.clear();
        this.reverseSearchExploredMap.clear();

        // return await this.findSecondStepSolution(halfSolvedCube)

        this.measurer.finish();

        return {
            rotations: rotations,
            totalTime: this.measurer.getTotalTime()!,
            data: {
                metrics: this.measurer.getData({ notMeasuredLabel: Metrics[Metrics.NOT_MEASURED] }),
            }
        };
    }

    private async findSecondStepSolution(halfSolvedCube: RubiksCube): Promise<Solution> {




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
                } while (this.measurer.add(Metrics[Metrics.VISISTED_LIST_CHECK], () => this.forwardSearchExploredMap.has(forward!.edgesHash)));
                do {
                    reverse = this.measurer.add(Metrics[Metrics.POP_CANDIDATE], () => this.reverseSearchToExploreList.shift());
                } while (this.measurer.add(Metrics[Metrics.VISISTED_LIST_CHECK], () => this.reverseSearchExploredMap.has(reverse!.edgesHash)));
                ++visitedNodes;

                let meetPoint = this.measurer.add(Metrics[Metrics.VISISTED_LIST_CHECK], () => this.forwardSearchExploredMap.get(reverse.edgesHash));
                if (meetPoint) {
                    const solution = this.createFirstSolution(meetPoint, reverse, visitedNodes)
                    return resolve(solution);
                }
                meetPoint = this.measurer.add(Metrics[Metrics.VISISTED_LIST_CHECK], () => this.reverseSearchExploredMap.get(forward.edgesHash));
                if (meetPoint) {
                    const solution = this.createFirstSolution(forward, meetPoint, visitedNodes)
                    return resolve(solution);
                }
                if (visitedNodes % 1000 === 0) {
                    console.log(visitedNodes, this.forwardSearchToExploreList.length, this.reverseSearchToExploreList.length)
                }

                this.measurer.add(Metrics[Metrics.ADD_TO_VISISTED_LIST_CHECK], () => this.forwardSearchExploredMap.set(forward.edgesHash, forward!));
                this.measurer.add(Metrics[Metrics.ADD_TO_VISISTED_LIST_CHECK], () => this.reverseSearchExploredMap.set(reverse.edgesHash, reverse!));
                this.applyRotations(this.forwardSearchToExploreList, this.forwardSearchExploredMap, forward);
                this.applyRotations(this.reverseSearchToExploreList, this.reverseSearchExploredMap, reverse);
            }
            return reject();
        });












        return new Promise(resolve => {
            return resolve(this.createSecondSolution())
        })
    }

    private createSecondSolution(): Solution {
        this.measurer.finish();

        return {
            rotations: [],
            totalTime: this.measurer.getTotalTime()!,
            data: {
                metrics: this.measurer.getData({ notMeasuredLabel: Metrics[Metrics.NOT_MEASURED] }),
            }
        };

    }

    public buildSolvedCubeFromCenterCubelets(cube: RubiksCube): RubiksCube {
        const centersIndexes = cube.getAllColorlessCubelets()
            .filter(cubelet => cubelet.stickers.length === 1)
            .map(cubelet => cubelet.stickers[0].id);
        const colorMap: Map<Sides, Colors> = new Map();
        getAllSides()
            .forEach((side, index) => {
                colorMap.set(side, cube.getColorOfIndex(centersIndexes[index]));
            })

        return new RubiksCube({ colorMap: colorMap, dimension: cube.getDimension() });
    }


}