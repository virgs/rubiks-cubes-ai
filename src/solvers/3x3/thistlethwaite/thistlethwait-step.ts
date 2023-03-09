import { type FaceRotation } from "@/engine/face-rotation";
import { type RubiksCube } from "@/engine/rubiks-cube";

export interface ThistlethwaiteStep {
    getAllowedMoves(parentRotations: FaceRotation[]): FaceRotation[][];
    calculateDistanceToGoal(cube: RubiksCube): boolean;
}
