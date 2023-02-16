import type { Sides } from "./sides";

export type FaceRotation = {
    side: Sides;
    layer?: number;
    clockwiseDirection?: boolean;
};
