import { Colors } from '../constants/colors';
import { getAllSides, Sides } from '@/constants/sides';
import type { FaceRotation } from './face-rotation';

export const defaultColorMap: Map<Sides, Colors> = new Map();
defaultColorMap.set(Sides.FRONT, Colors.BLUE);
defaultColorMap.set(Sides.UP, Colors.YELLOW);
defaultColorMap.set(Sides.RIGHT, Colors.RED);
defaultColorMap.set(Sides.LEFT, Colors.ORANGE);
defaultColorMap.set(Sides.BACK, Colors.GREEN);
defaultColorMap.set(Sides.DOWN, Colors.WHITE);

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
