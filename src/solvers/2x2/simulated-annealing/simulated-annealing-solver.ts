import { SimulatedAnnealingConfig } from "@/configuration";
import { getOppositeColor, type Colors } from "@/constants/colors";
import { Sides, getOppositeSide, } from "@/constants/sides";
import type { FaceRotation } from "@/engine/face-rotation";
import { RubiksCube, type Cubelet } from "@/engine/rubiks-cube";
import { RotationsTuner } from "@/printers/rotations-tuner";
import type { CubeSolver, Solution } from "../../cube-solver";
import { ProcedureMeasurer } from "../../procedure-measurer";
import { SimulatedAnnealing, type Candidate } from "./simulated-annealing";

enum Metrics {
    NOT_MEASURED,
    RUN_CANDIDATE_ROTATIONS,
    CALCULATE_CANDIDATE_SCORE,
    APPLY_ROTATIONS_TO_CUBE,
    CREATE_NEXT_GENERATION,
    ADD_ROTATION_TO_SOLUTION_CANDIDATE,
    AGGREGATE_CURRENT_GENERATION,
    CHECK_SOLUTION,
    MEASUREMENT_OVERHEAD
}

export class SimulatedAnnealingSolver implements CubeSolver {
    private readonly measurer: ProcedureMeasurer;
    private readonly initialState: RubiksCube;
    private readonly goalStateHash: string;
    private simulatedAnnealing: SimulatedAnnealing;
    private candidates: Candidate[];
    private aborted: boolean;
    private actions: FaceRotation[];
    private restartCounter: number = 0;
    private iterations: number = 0;

    public constructor(cube: RubiksCube) {
        this.measurer = new ProcedureMeasurer();
        this.initialState = cube.clone();
        this.aborted = false;
        this.actions = [];
        const fixedCubelet = cube.getCubeletsBySides(Sides.BACK, Sides.LEFT, Sides.DOWN)[0];
        const goalState = this.buildSolvedPocketCubeFromCornerCubelet(fixedCubelet);
        this.goalStateHash = goalState.getHash();
        [Sides.FRONT, Sides.UP, Sides.RIGHT] //So the fixed cubelet doesn't move
            .map(side => [true, false] // So that cancelling rotations are adjacents to each other
                .map(direction => {
                    this.actions.push({ side: side, counterClockwiseDirection: direction, layer: 0 });
                })
            );

        this.simulatedAnnealing = new SimulatedAnnealing(this.actions.length)
        this.candidates = this.simulatedAnnealing.iterate();
    }

    public async findSolution(): Promise<Solution> {
        this.measurer.start();
        return new Promise((resolve, reject) => {
            while (true) {
                ++this.iterations;
                if (this.aborted) {
                    return reject();
                }
                if (this.simulatedAnnealing.getIterationCounter() > SimulatedAnnealingConfig.restartThreshold) {
                    ++this.restartCounter;
                    console.log('Restart: ' + this.restartCounter)
                    this.simulatedAnnealing = new SimulatedAnnealing(this.actions.length)
                    this.candidates = this.simulatedAnnealing.iterate();
                }
                const result: Candidate[] = [];
                for (let citizen of this.candidates) {
                    const citizenResult = this.runCitizen(citizen);
                    if (citizenResult.score === this.goalStateHash.length) {
                        return resolve(this.createSolution(citizenResult));
                    }
                    this.measurer.add(Metrics[Metrics.AGGREGATE_CURRENT_GENERATION], () => result.push(citizenResult));
                }

                this.candidates = this.measurer.add(Metrics[Metrics.CREATE_NEXT_GENERATION], () => this.simulatedAnnealing.iterate(result));
            }
        });
    }

    public abort(): void {
        this.aborted = true;
    }

    private runCitizen(citizen: Candidate): Candidate {
        let cube = this.initialState.clone()
        return citizen.actions
            .reduce((acc, actionIndex) => {
                if (this.measurer.add(Metrics[Metrics.CHECK_SOLUTION], () => acc.score === this.goalStateHash.length)) {
                    return acc;
                } else {
                    cube = this.measurer.add(Metrics[Metrics.APPLY_ROTATIONS_TO_CUBE], () => cube.rotateFace(this.actions[actionIndex]));
                    this.measurer.add(Metrics[Metrics.ADD_ROTATION_TO_SOLUTION_CANDIDATE], () => acc.actions.push(actionIndex));
                    acc.score = this.measurer.add(Metrics[Metrics.CALCULATE_CANDIDATE_SCORE], () => this.calculateCandidateScore(cube));
                }
                return acc;
            }, { score: 0, actions: [] as number[] });
    }

    private calculateCandidateScore(currentCube: RubiksCube): number {
        const cubeConfiguration = currentCube.getConfiguration();
        return cubeConfiguration
            .split('')
            .filter((char, index) => char === this.goalStateHash[index])
            .length;
    }

    private createSolution(solution: Candidate): Solution {
        // console.log(new HumanTranslator().translateRotations(solution.actions.map(action => this.actions[action])))
        const rotations = new RotationsTuner().tune(solution.actions.map(action => this.actions[action]));
        this.measurer.finish();
        return {
            rotations: rotations,
            totalTime: this.measurer.getTotalTime()!,
            data: {
                restartCounter: this.restartCounter,
                iterations: this.iterations,
                metrics: this.measurer.getData({ notMeasuredLabel: Metrics[Metrics.NOT_MEASURED], measurementOverheadLabel: Metrics[Metrics.MEASUREMENT_OVERHEAD] }),
            }
        }
    }

    public buildSolvedPocketCubeFromCornerCubelet(cubelet: Cubelet): RubiksCube {
        const colorMap: Map<Sides, Colors> = new Map();
        cubelet.stickers
            .forEach(sticker => {
                colorMap.set(sticker.side, sticker.color);
                colorMap.set(getOppositeSide(sticker.side), getOppositeColor(sticker.color));
            });
        return new RubiksCube({ colorMap: colorMap, dimension: this.initialState.getDimension() });
    }

}