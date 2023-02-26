import { Colors } from '../constants/colors';
import { Sides } from '@/constants/sides';
import type { FaceRotation } from './face-rotation';

export const defaultColorMap: Map<Colors, Sides> = new Map();
defaultColorMap.set(Colors.BLUE, Sides.FRONT);
defaultColorMap.set(Colors.YELLOW, Sides.UP);
defaultColorMap.set(Colors.RED, Sides.RIGHT);
defaultColorMap.set(Colors.ORANGE, Sides.LEFT);
defaultColorMap.set(Colors.GREEN, Sides.BACK);
defaultColorMap.set(Colors.WHITE, Sides.DOWN);

export type Sticker = {
    side: Sides,
    id: number,
    color: Colors,
    x: number,
    y: number
};

export type Cubelet = {
    stickers: Sticker[]
};

export type StickerMap = {
    side: Sides,
    id: number
}[];

export interface RubiksCube {
    getDimension(): number;
    getConfiguration(): number[];
    getHash(): string;
    isSolved(): boolean;
    clone(): RubiksCube;
    rotateFace(faceRotation: FaceRotation): RubiksCube;
    getAllCubelets(): Cubelet[];
}
