import type { FaceRotation } from "@/engine/face-rotation";
import type { RubiksCube } from "@/engine/rubiks-cube";
import { KeyboardInterpreter } from "@/keyboard-interpreter";
import type { CubeSolver, Solution } from "./cube-solver";

export type KeyboardEvent = {
    key: string,
    shiftKey: boolean
}

export class HumanSolver implements CubeSolver {
    private readonly moves: FaceRotation[];
    private findSolutionResolve?: (value: Solution | PromiseLike<Solution>) => void;
    private findSolutionReject?: (reason?: any) => void;
    private cube: RubiksCube;
    private startTime?: number;
    private keyboardInterpreter: KeyboardInterpreter;

    public constructor(cube: RubiksCube) {
        this.cube = cube;
        this.moves = [];
        this.keyboardInterpreter = new KeyboardInterpreter();
    }

    public async findSolution(): Promise<Solution> {
        this.startTime = Date.now()
        return new Promise((resolve, reject) => {
            this.findSolutionResolve = resolve;
            this.findSolutionReject = reject
        });
    }

    public abort(): void {
        this.findSolutionReject!();
    }

    public async readKeys(event: KeyboardEvent): Promise<FaceRotation | undefined> {
        if (this.cube.isSolved()) {
            return;
        }

        const faceRotation = this.keyboardInterpreter.readKeys(event);
        if (faceRotation !== undefined) {
            this.moves.push(faceRotation);
            this.cube = this.cube.rotateFace(faceRotation);
            if (this.cube.isSolved()) {
                this.findSolutionResolve!({
                    rotations: this.moves,
                    totalTime: Date.now() - this.startTime!,
                    data: {
                        human: true,
                    }
                })
            }
            return faceRotation;
        }
    }
}