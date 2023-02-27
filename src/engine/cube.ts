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

export type ColorlessSticker = {
    side: Sides,
    id: number,
    x: number,
    y: number
};

export type Sticker = ColorlessSticker & {
    color: Colors
};

export type ColorlessCubelet = {
    stickers: ColorlessSticker[]
}

export type Cubelet = {
    stickers: Sticker[]
}

// export type StickerMap = {
//     side: Sides,
//     id: number
// }[];

export interface Cube {
    getDimension(): number;
    getConfiguration(): bigint[];
    getHash(): string;
    isSolved(): boolean;
    clone(): Cube;
    rotateFace(faceRotation: FaceRotation): Cube;
    getAllCubelets(): Cubelet[];
    getCubeletsBySides(...sides: Sides[]): Cubelet[];
    getCubeletsByColor(...colors: Colors[]): Cubelet[];
}
