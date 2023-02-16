import type { PocketCube } from "./pocket-cube";
import { getAllSides, Sides } from "./sides";

export class CubeScrambler {
    private readonly moves: number;

    public constructor(moves: number = 30) {
        this.moves = moves;
    }

    public scramble(cube: PocketCube): PocketCube {
        let rotations = '';
        const allSides = getAllSides();
        const result = Array.from(new Array(this.moves))
            .reduce((acc: PocketCube, _, index: number) => {
                const side = Math.floor(Math.random() * allSides.length);
                const direction = Math.floor(Math.random() * 2) === 0;
                rotations += `${Sides[side].substring(0, 1)}${direction ? '' : '\''}`;
                if (index % 5 === 4) {
                    rotations += '\n'
                }
                return acc.rotateFace({side: side, clockwiseDirection: direction});
            }, cube as PocketCube)
        console.log(rotations);
        return result;
    }
}