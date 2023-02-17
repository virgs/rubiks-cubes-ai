import type { FaceRotation } from "./face-rotation";
import type { PocketCube } from "./pocket-cube";
import { getAllSides, Sides } from "./sides";

export class CubeScrambler {
    private readonly moves: number;

    public constructor(moves: number = 30) {
        this.moves = moves;
    }

    public scramble(cube: PocketCube): FaceRotation[] {
        const layers = Math.floor(cube.getDimension() / 2);
        let rotations = '';
        const allSides = getAllSides();
        return Array.from(new Array(this.moves))
            .map((_, index: number) => {
                const side = Math.floor(Math.random() * allSides.length);
                const direction = Math.floor(Math.random() * 2) === 0;
                const layer = Math.floor(Math.random() * layers);
                rotations += `${Sides[side].substring(0, 1)}${direction ? '' : '\''}`;
                if (index % 5 === 4) {
                    rotations += '\n'
                }
                return { side: side, clockwiseDirection: direction, layer: layer };
            });
    }
    //TODO tune this rotations (avoid things like RRRR, RR', RRR=R' of same layer)
}