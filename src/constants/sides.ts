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
