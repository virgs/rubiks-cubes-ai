import { Sides } from "@/constants/sides";
import type { FaceRotation } from "@/engine/face-rotation";
import type { RubiksCube } from "@/engine/rubiks-cube";
import type { CubeSolver, Solution } from "./cube-solver";

export type KeyboardEvent = {
    key: string,
    shiftKey: boolean
}

export class HumanSolver implements CubeSolver {
    private readonly moves: FaceRotation[];
    private cube: RubiksCube;
    private findSolutionResolve?: (value: Solution) => any;
    private startTime?: number;

    public constructor(cube: RubiksCube) {
        this.cube = cube;
        this.moves = [];
    }

    public static getSolverTag(): string {
        return "Human";
    }

    public async findSolution(): Promise<Solution> {
        this.startTime = Date.now()
        return new Promise(resolve => {
            this.findSolutionResolve = resolve;
        });
    }

    public async readKeys(event: KeyboardEvent): Promise<FaceRotation | undefined> {
        if (this.cube.isSolved()) {
            return;
        }

        let side: Sides | undefined;
        switch (event.key.toLowerCase()) {
            case 'w':
                side = Sides.UP;
                break;
            case 'a':
                side = Sides.LEFT;
                break;
            case 's':
                side = Sides.FRONT;
                break;
            case 'd':
                side = Sides.RIGHT;
                break;
            case 'f':
                side = Sides.BACK;
                break;
            case 'x':
                side = Sides.DOWN;
                break;
        }
        if (side !== undefined) {
            const faceRotation = { side: side, counterClockwiseDirection: event.shiftKey };
            this.moves.push(faceRotation);
            this.cube = this.cube.rotateFace(faceRotation);
            if (this.cube.isSolved()) {
                this.findSolutionResolve!({
                    rotations: this.moves,
                    totalTime: Date.now() - this.startTime!,
                    data: {}
                })
            }
            return faceRotation;
        }
    }
}