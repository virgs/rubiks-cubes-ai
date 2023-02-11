import {Colors} from "@/cube/colors";

export enum Sides {
    UP,
    LEFT,
    FRONT,
    RIGHT,
    BACK,
    DOWN
}

export const getAllSides = () => Object.keys(Sides)
    .filter(key => !isNaN(Number(key)))
    .map(key => Number(key) as Sides);

export const getInitialColorOfSide = (orientation: Sides): Colors => {
    switch (orientation) {
        case Sides.FRONT:
            return Colors.BLUE;
        case Sides.UP:
            return Colors.YELLOW;
        case Sides.RIGHT:
            return Colors.RED;
        case Sides.LEFT:
            return Colors.ORANGE
        case Sides.BACK:
            return Colors.GREEN;
        case Sides.DOWN:
            return Colors.WHITE;
    }
}
