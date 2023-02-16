import type { PocketCube } from "./pocket-cube";
import { getAllSides, Sides } from "./sides";

export class CubeScrambler {
    private readonly moves: number;

    public constructor(moves: number = 30) {
        this.moves = moves;
    }

    public scramble(cube: PocketCube): PocketCube {
        const allSides = getAllSides();
        return Array.from(new Array(this.moves))
            .reduce((acc: PocketCube) => {
                const side = Math.floor(Math.random() * allSides.length);
                const direction = Math.floor(Math.random() * 2) === 0;
                console.log(`Rotating ${Sides[side]} \t\t${direction ? '' : 'counter'}clockwise`)
                return acc.rotateFace(side, direction);
            }, cube as PocketCube)
    }
}