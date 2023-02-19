import { Colors } from './colors';
import { PocketCubeFaceRotator } from './pocket-cube-face-rotator';
import { getAllSides, Sides } from '@/engine/sides';
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

export type Sticker = {
    color: Colors;
    originalPosition: number;
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

export type Cubelet = { side: Sides, position?: number, color?: Colors }[];
const cubeletMap: Cubelet[] = [
    [{ side: Sides.FRONT, position: 8 }, { side: Sides.LEFT, position: 5 }, { side: Sides.UP, position: 3 }],
    [{ side: Sides.FRONT, position: 9 }, { side: Sides.RIGHT, position: 12 }, { side: Sides.UP, position: 2 }],
    [{ side: Sides.FRONT, position: 10 }, { side: Sides.LEFT, position: 6 }, { side: Sides.DOWN, position: 20 }],
    [{ side: Sides.FRONT, position: 11 }, { side: Sides.RIGHT, position: 15 }, { side: Sides.DOWN, position: 21 }],

    [{ side: Sides.BACK, position: 16 }, { side: Sides.RIGHT, position: 13 }, { side: Sides.UP, position: 1 }],
    [{ side: Sides.BACK, position: 17 }, { side: Sides.LEFT, position: 4 }, { side: Sides.UP, position: 0 }],
    [{ side: Sides.BACK, position: 19 }, { side: Sides.RIGHT, position: 14 }, { side: Sides.DOWN, position: 22 }],
    [{ side: Sides.BACK, position: 23 }, { side: Sides.LEFT, position: 7 }, { side: Sides.DOWN, position: 18 }],
];

export class PocketCube {
    private readonly faceRotator: PocketCubeFaceRotator;
    private readonly stickers: Sticker[];
    private readonly hash: string;


    public constructor(clone?: Sticker[]) {
        if (clone) {
            this.stickers = [...clone];
        } else {
            let id = 0;
            this.stickers = [];
            getAllSides()
                .forEach(side => {
                    const stickers: Sticker[] = Array
                        .from(new Array(this.getDimension() * this.getDimension()))
                        .map(() => ({ color: getInitialColorOfSide(side), originalPosition: id++ }));
                    this.stickers.push(...stickers);
                })
        }
        this.faceRotator = new PocketCubeFaceRotator();
        this.hash = this.stickers.map(sticker => sticker.originalPosition).join('.');
    }

    public getConfiguration(): Sticker[] {
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
                .every((_, index) => this.stickers[sideIndex * stickersPerSide + index].color === this.stickers[sideIndex * stickersPerSide].color))

    }

    public getHash(): string {
        return this.hash;
    }

    public getCubeletsByCorner(...sides: Sides[]): Cubelet[] {
        const found = cubeletMap
            .filter(cubelets => cubelets
                .every(sticker => sides.includes(sticker.side)));

        return found
            .map(cubelet => cubelet
                .map(sticker => ({
                    side: sticker.side,
                    position: sticker.position,
                    color: this.stickers[sticker.position!].color
                })));
    }

    public getCubeletsByColor(...colors: Colors[]): Cubelet[] {
        const found = cubeletMap
            .filter(cubelets => cubelets
                .every(sticker => colors.includes(this.stickers[sticker.position!].color)));

        return found
            .map(cubelet => cubelet
                .map(sticker => ({
                    side: sticker.side,
                    position: sticker.position,
                    color: this.stickers[sticker.position!].color
                })));
    }

}