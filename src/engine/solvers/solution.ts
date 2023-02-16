import type { FaceRotation } from "../face-rotation";

export type Solution = {
    aborted: boolean;
    rotations: FaceRotation[];
    totalTime: number;
    data: any;
};
