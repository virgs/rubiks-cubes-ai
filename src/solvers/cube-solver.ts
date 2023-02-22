import type { FaceRotation } from "@/engine/face-rotation";

export type Solution = {
    rotations: FaceRotation[];
    totalTime: number;
    data: any;
};

export interface CubeSolver {
    findSolution(): Promise<Solution>;
}
