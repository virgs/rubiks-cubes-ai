import { Sides } from "./sides";

export enum Axis {
    x = 'x',
    y = 'y',
    z = 'z'
}

export const getAxisFromSide = (side: Sides): Axis => {
    switch (side) {
        case Sides.BACK:
        case Sides.FRONT:
            return Axis.z;
        case Sides.UP:
        case Sides.DOWN:
            return Axis.y;
        case Sides.LEFT:
        case Sides.RIGHT:
            return Axis.x;
    }
}