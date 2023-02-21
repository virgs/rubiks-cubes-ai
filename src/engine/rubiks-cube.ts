import type { Colors } from '../constants/colors';
import type { Sides } from '@/constants/sides';
import type { FaceRotation } from './face-rotation';

export type Cubelet = { stickers: { side: Sides, id: number, color: Colors, x: number, y: number }[] };

export interface RubiksCube {
    getStickers(): Colors[];
    getDimension(): number;
    clone(): RubiksCube;
    rotateFace(faceRotation: FaceRotation): RubiksCube;
    isSolved(): boolean;
    getHash(): string;
    getCubeletsBySides(...sides: Sides[]): Cubelet[];
    getCubeletsByColor(...colors: Colors[]): Cubelet[];
    getAllCubelets(): Cubelet[];
}
