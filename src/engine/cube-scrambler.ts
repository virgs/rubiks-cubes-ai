import { getAllSides, Sides } from "../constants/sides";
import type { FaceRotation } from "./face-rotation";
import type { RubiksCube } from "./rubiks-cube";

export class CubeScrambler {
    private readonly moves: number;

    public constructor(moves: number = 30) {
        this.moves = moves;
    }

    public scramble(cube: RubiksCube): FaceRotation[] {
        let lastRotation: FaceRotation | undefined = undefined;
        const layers = Math.floor(cube.getDimension() / 2); //If it's a 5x5, for example, rotating the first two layers of each face is enough 
        const allSides = getAllSides();
        const rotations: FaceRotation[] = [];
        Array.from(new Array(this.moves))
            .forEach(() => {
                const duplicated = Math.floor(Math.random() * 6) === 0; // 1/6 is an arbitrary chance to make this rotation a duplicated one
                const direction = Math.floor(Math.random() * 2) === 0; //
                const layer = Math.floor(Math.random() * layers);

                let side = Math.floor(Math.random() * allSides.length);
                let rotation = { side: side, counterClockwiseDirection: direction, layer: layer } as FaceRotation;
                while (lastRotation !== undefined && (lastRotation.side === rotation.side && lastRotation.layer === rotation.layer)) {
                    side = Math.floor(Math.random() * allSides.length);
                    rotation = { side: side, counterClockwiseDirection: direction, layer: layer } as FaceRotation;
                }
                lastRotation = rotation;
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
