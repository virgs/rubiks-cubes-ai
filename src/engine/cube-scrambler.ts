import type { FaceRotation } from "../constants/face-rotation";
import type { PocketCube } from "./pocket-cube";
import { getAllSides, Sides } from "../constants/sides";

export class CubeScrambler {
    private readonly moves: number;

    public constructor(moves: number = 30) {
        this.moves = moves;
    }

    public scramble(cube: PocketCube): FaceRotation[] {
        const layers = Math.floor(cube.getDimension() / 2);
        const allSides = getAllSides();
        return Array.from(new Array(this.moves))
            .map(() => {
                const side = Math.floor(Math.random() * allSides.length);
                const direction = Math.floor(Math.random() * 2) === 0;
                const layer = Math.floor(Math.random() * layers);
                return { side: side, counterClockwiseDirection: direction, layer: layer } as FaceRotation;
            }) as FaceRotation[];
    }
    //TODO tune these rotations (avoid things like RRRR, RR', RRR=R' of same layer)
}