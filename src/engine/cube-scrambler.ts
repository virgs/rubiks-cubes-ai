import { getAllSides } from "../constants/sides";
import type { FaceRotation } from "./face-rotation";
import type { Side } from "three";
import type { RubiksCube } from "./rubiks-cube";

export class CubeScrambler {
    private readonly moves: number;

    public constructor(moves: number = 30) {
        this.moves = moves;
    }

    public scramble(cube: RubiksCube): FaceRotation[] {
        let lastRotatedSide: Side | undefined = undefined;
        const layers = Math.floor(cube.getDimension() / 2); //If it's a 5x5, for example, rotating the first two layers of each face is enough 
        const allSides = getAllSides();
        const rotations: FaceRotation[] = [];
        Array.from(new Array(this.moves))
            .forEach(() => {
                let side = Math.floor(Math.random() * allSides.length);
                while (lastRotatedSide !== undefined && side === lastRotatedSide) {
                    side = Math.floor(Math.random() * allSides.length);
                }
                lastRotatedSide = side
                const duplicated = Math.floor(Math.random() * 6) === 0; // 1/6 is an arbitrary chance to make this rotation a duplicated one
                const direction = Math.floor(Math.random() * 2) === 0; //
                const layer = Math.floor(Math.random() * layers);

                const rotation = { side: side, counterClockwiseDirection: direction, layer: layer } as FaceRotation;
                if (duplicated) {
                    rotation.counterClockwiseDirection = false; //It is the same, but looks nicer
                    rotations.push(rotation);
                }
                rotations.push(rotation);
            });
        return rotations
            .filter((_, index) => index < this.moves);
    }
}