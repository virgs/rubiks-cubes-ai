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

export const getOppositeSide = (side: Sides): Sides => {
    switch (side) {
        case Sides.UP: return Sides.DOWN;
        case Sides.DOWN: return Sides.UP;
        case Sides.LEFT: return Sides.RIGHT;
        case Sides.RIGHT: return Sides.LEFT;
        case Sides.FRONT: return Sides.BACK;
        case Sides.BACK: return Sides.FRONT;
    }
}