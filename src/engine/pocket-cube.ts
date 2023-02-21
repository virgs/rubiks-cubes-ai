import { Colors } from '../constants/colors';
import { PocketCubeFaceRotator } from './pocket-cube-face-rotator';
import { getAllSides, Sides } from '@/constants/sides';
import type { Cubelet, RubiksCube } from './rubiks-cube';
import type { FaceRotation } from './face-rotation';


export const getInitialColorOfSide = (orientation: Sides): Colors => {
    switch (orientation) {
        case Sides.FRONT:
            return Colors.BLUE;
        case Sides.UP:
            return Colors.YELLOW;
        case Sides.RIGHT:
            return Colors.RED;
        case Sides.LEFT:
            return Colors.ORANGE
        case Sides.BACK:
            return Colors.GREEN;
        case Sides.DOWN:
            return Colors.WHITE;
    }
}

// Initial configuration
//       UP
//        0  1
//        3  2
// LEFT  FRONT  RIGHT  BACK
// 4  5   8  9  12 13  16 17
// 7  6  11 10  15 14  19 18
//       DOWN
//       20 21
//       23 22

export type StickerMap = { side: Sides, id: number }[];
const stickerMap: StickerMap[] = [
    [{ side: Sides.FRONT, id: 8 }, { side: Sides.LEFT, id: 5 }, { side: Sides.UP, id: 3 }],
    [{ side: Sides.FRONT, id: 9 }, { side: Sides.RIGHT, id: 12 }, { side: Sides.UP, id: 2 }],
    [{ side: Sides.FRONT, id: 11 }, { side: Sides.LEFT, id: 6 }, { side: Sides.DOWN, id: 20 }],
    [{ side: Sides.FRONT, id: 10 }, { side: Sides.RIGHT, id: 15 }, { side: Sides.DOWN, id: 21 }],

    [{ side: Sides.BACK, id: 16 }, { side: Sides.RIGHT, id: 13 }, { side: Sides.UP, id: 1 }],
    [{ side: Sides.BACK, id: 17 }, { side: Sides.LEFT, id: 4 }, { side: Sides.UP, id: 0 }],
    [{ side: Sides.BACK, id: 19 }, { side: Sides.RIGHT, id: 14 }, { side: Sides.DOWN, id: 22 }],
    [{ side: Sides.BACK, id: 23 }, { side: Sides.LEFT, id: 7 }, { side: Sides.DOWN, id: 18 }],
];

export class PocketCube implements RubiksCube {
    private readonly faceRotator: PocketCubeFaceRotator;
    private readonly stickers: Colors[];
    private readonly hash: string;


    public constructor(clone?: Colors[]) {
        if (clone) {
            this.stickers = [...clone];
        } else {
            let id = 0;
            this.stickers = [];
            getAllSides()
                .forEach(side => {
                    const stickers: Colors[] = Array
                        .from(new Array(this.getDimension() * this.getDimension()))
                        .map(() => getInitialColorOfSide(side));
                    this.stickers.push(...stickers);
                })
        }
        this.faceRotator = new PocketCubeFaceRotator();
        this.hash = this.stickers.join('.');
    }

    public getStickers(): Colors[] {
        return [...this.stickers];
    }

    public getDimension(): number {
        return 2;
    }

    public clone(): PocketCube {
        return new PocketCube(this.stickers);
    }

    public rotateFace(faceRotation: FaceRotation): PocketCube {
        const result = this.faceRotator.rotate(this.stickers, faceRotation);
        return new PocketCube(result);
    }

    public isSolved(): boolean {
        const sides = getAllSides();
        const stickersPerSide = 4;
        const stickersArray = Array.from(new Array(stickersPerSide));
        return sides
            .every((_, sideIndex) => stickersArray
                .every((_, index) => this.stickers[sideIndex * stickersPerSide + index] === this.stickers[sideIndex * stickersPerSide]))
    }

    public getHash(): string {
        return this.hash;
    }

    public getCubeletsBySides(...sides: Sides[]): Cubelet[] {
        const found = stickerMap
            .filter(cubelets => cubelets
                .every(sticker => sides.includes(sticker.side)));
        return this.getCubeletsFromStickers(found);
    }

    public getCubeletsByColor(...colors: Colors[]): Cubelet[] {
        const found = stickerMap
            .filter(cubelets => cubelets
                .every(sticker => colors.includes(this.stickers[sticker.id!])));
        return this.getCubeletsFromStickers(found);
    }

    public getAllCubelets(): Cubelet[] {
        return this.getCubeletsFromStickers(stickerMap);
    }

    private getCubeletsFromStickers(stickers: StickerMap[]): Cubelet[] {
        return stickers.map(stickers => ({
            stickers: stickers
                .map(sticker => {
                    let x = (sticker.id % 4 === 0 || sticker.id % 4 === 3) ? 0 : 1;
                    if (sticker.side === Sides.BACK) {
                        // x = 1 - x;
                    }
                    const y = (sticker.id % 4 === 0 || sticker.id % 4 === 1) ? 0 : 1;
                    return {
                        side: sticker.side,
                        id: sticker.id,
                        color: this.stickers[sticker.id],
                        x: x,
                        y: y
                    };

                })
        }))
    }

}