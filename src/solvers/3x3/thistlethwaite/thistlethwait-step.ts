import { type FaceRotation } from "@/engine/face-rotation";
import { type RubiksCube } from "@/engine/rubiks-cube";

export interface ThistlethwaiteResult {
    stepFinished: boolean;
    nextStepSolver: ThistlethwaiteStep;
    data: any;
}

export interface ThistlethwaiteStep {
    getAllowedMoves(): FaceRotation[][];
    iterate(cube: RubiksCube): ThistlethwaiteResult;
}
