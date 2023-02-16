import type { Sides } from "../sides"

export type Rotation = {
    side: Sides;
    clockwiseDirection: boolean;
}

export type Solution = {
    aborted: boolean;
    rotations: Rotation[];
    totalTime: number;
    data: any;
};
