import { PocketCubeFaceRotator } from './pocket-cube-face-rotator';
import { getAllSides, Sides } from '@/constants/sides';
import { defaultColorMap, type Cubelet, type RubiksCube, type StickerMap } from './rubiks-cube';
import type { FaceRotation } from './face-rotation';
import { getAllColors, type Colors } from '@/constants/colors';

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

// Since every sticker can assume 6 colors and we have a total of 24 stickers. We can have an array of 6 elements to represent it, being each color an item and each bit one index.
// I could represent 2 colors in every byte, since we only care about 24 bits out of 64 available.
// However, javascript uses 32 bits bitwise operations.
//
// So, let's say we have a solved cube (up: yellow, left: orange, front: blue, right: red, back: green, down: white), it would be represented like this:
//
// Up    Left  Front Right Back  Down
// 1111  0000  0000  0000  0000  0000 (<- Yellow)
// 0000  1111  0000  0000  0000  0000 (<- Orange)
// 0000  0000  1111  0000  0000  0000 (<- Blue)
// 0000  0000  0000  1111  0000  0000 (<- Red)
// 0000  0000  0000  0000  1111  0000 (<- Green)
// 0000  0000  0000  0000  0000  1111 (<- White)
//
//
//
// It makes the rotation operations quicker and the hash is these numbers concatenated

const stickerMap: StickerMap[] = [
    [{ side: Sides.FRONT, id: 8 }, { side: Sides.LEFT, id: 5 }, { side: Sides.UP, id: 3 }],
    [{ side: Sides.FRONT, id: 9 }, { side: Sides.RIGHT, id: 12 }, { side: Sides.UP, id: 2 }],
    [{ side: Sides.FRONT, id: 11 }, { side: Sides.LEFT, id: 6 }, { side: Sides.DOWN, id: 20 }],
    [{ side: Sides.FRONT, id: 10 }, { side: Sides.RIGHT, id: 15 }, { side: Sides.DOWN, id: 21 }],

    [{ side: Sides.BACK, id: 16 }, { side: Sides.RIGHT, id: 13 }, { side: Sides.UP, id: 1 }],
    [{ side: Sides.BACK, id: 17 }, { side: Sides.LEFT, id: 4 }, { side: Sides.UP, id: 0 }],
    [{ side: Sides.BACK, id: 19 }, { side: Sides.RIGHT, id: 14 }, { side: Sides.DOWN, id: 22 }],
    [{ side: Sides.BACK, id: 18 }, { side: Sides.LEFT, id: 7 }, { side: Sides.DOWN, id: 23 }],
];

export class PocketCube implements RubiksCube {
    private readonly hash: string;
    private readonly configuration: number[];
    private readonly dimension: number;
    private readonly faceRotator: PocketCubeFaceRotator;

    public constructor(config?: { clone?: number[], colorMap?: Map<Colors, Sides> }) {
        this.faceRotator = new PocketCubeFaceRotator();
        this.dimension = 2;
        if (config?.clone) {
            this.configuration = [...config.clone];
        } else {
            const colorMap = config?.colorMap || defaultColorMap;
            this.configuration = getAllColors()
                .map(color => {
                    const side = colorMap.get(color)!
                    return (15 << (side * 4)); // 15 = 1111 in binary
                });
        }
        this.hash = this.configuration.join('.');
    }

    public clone(): PocketCube {
        return new PocketCube({ clone: this.configuration });
    }

    public getDimension(): number {
        return this.dimension;
    }

    public getConfiguration(): number[] {
        return [...this.configuration];
    }

    public getHash(): string {
        return this.hash;
    }

    private getColorOfIndex(index: number): Colors | undefined {
        let counter = 0;
        for (let color of this.configuration) {
            if (color & (1 << index)) {
                return counter;
            }
            ++counter;
        }
    }

    public isSolved(): boolean {
        const stickersPerSide = this.dimension * this.dimension;
        const sides = getAllSides();
        const stickersArray = Array.from(new Array(stickersPerSide));
        return sides
            .every((_, sideIndex) => stickersArray
                .every((_, index) => this.getColorOfIndex(sideIndex * stickersPerSide + index) === this.getColorOfIndex(sideIndex * stickersPerSide)))
    }

    public rotateFace(faceRotation: FaceRotation): PocketCube {
        const result = this.faceRotator.rotate(this.configuration, faceRotation);
        return new PocketCube({ clone: result });
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
                .every(sticker => colors.includes(this.getColorOfIndex(sticker.id)!)));
        return this.getCubeletsFromStickers(found);
    }

    public getAllCubelets(): Cubelet[] {
        return this.getCubeletsFromStickers(stickerMap);
    }

    private getCubeletsFromStickers(stickers: StickerMap[]): Cubelet[] {
        return stickers
            .map(stickers => ({
                stickers: stickers
                    .map(sticker => {
                        const x = (sticker.id % 4 === 0 || sticker.id % 4 === 3) ? 0 : 1;
                        const y = (sticker.id % 4 === 0 || sticker.id % 4 === 1) ? 0 : 1;
                        return {
                            side: sticker.side,
                            id: sticker.id,
                            color: this.getColorOfIndex(sticker.id)!,
                            x: x,
                            y: y
                        };

                    })
            }))
    }

}