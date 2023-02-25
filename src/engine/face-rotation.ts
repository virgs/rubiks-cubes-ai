import type { Sides } from "../constants/sides";

export type FaceRotation = {
    side: Sides;
    layer?: number;
    counterClockwiseDirection?: boolean;
};

export const rotationsAreEqual = (first: FaceRotation, second: FaceRotation): boolean => {
    return first.layer === second.layer &&
        first.side === second.side &&
        first.counterClockwiseDirection === second.counterClockwiseDirection;
}

export const rotationsCancel = (first: FaceRotation, second: FaceRotation): boolean => {
    return first.layer === second.layer &&
        first.side === second.side &&
        first.counterClockwiseDirection !== second.counterClockwiseDirection;
}

export const getOppositeRotation = (rotation: FaceRotation): FaceRotation => {
    return {
        layer: rotation.layer,
        side: rotation.side,
        counterClockwiseDirection: !rotation.counterClockwiseDirection
    }
}

