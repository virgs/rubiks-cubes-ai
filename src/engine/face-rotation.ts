import type { Sides } from "../constants/sides";

export type FaceRotation = {
    side: Sides;
    layer?: number;
    counterClockwiseDirection?: boolean;
};
