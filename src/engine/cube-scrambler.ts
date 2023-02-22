import { getAllSides } from "../constants/sides";
import type { FaceRotation } from "./face-rotation";
import type { Side } from "three";
import type { RubiksCube } from "./rubiks-cube";

export class CubeScrambler {
    private readonly minMoves: number;

    public constructor(minMoves: number = 30) {
        this.minMoves = minMoves;
    }

    public scramble(cube: RubiksCube): FaceRotation[] {
        let lastRotatedSide: Side | undefined = undefined;
        const layers = Math.floor(cube.getDimension() / 2);
        const allSides = getAllSides();
        const rotations: FaceRotation[] = [];
        Array.from(new Array(this.minMoves))
            .forEach(() => {
                let side = Math.floor(Math.random() * allSides.length);
                while (lastRotatedSide !== undefined && side === lastRotatedSide) {
                    side = Math.floor(Math.random() * allSides.length);
                }
                lastRotatedSide = side
                const duplicated = Math.floor(Math.random() * 6) === 0;
                const direction = Math.floor(Math.random() * 2) === 0;
                const layer = Math.floor(Math.random() * layers);

                const rotation = { side: side, counterClockwiseDirection: direction, layer: layer } as FaceRotation;
                rotations.push(rotation);
                if (duplicated) {
                    rotations.push(rotation);
                }
            });
        return rotations;
    }
}