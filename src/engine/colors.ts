export enum Colors {
    YELLOW,
    ORANGE,
    BLUE,
    RED,
    GREEN,
    WHITE
}

export const getAllColors = ()=> Object.keys(Colors)
    .filter(key => !isNaN(Number(key)))
    .map(key => Number(key) as Colors);
