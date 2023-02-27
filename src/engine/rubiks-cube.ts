import { getAllSides, Sides } from '@/constants/sides';
import { defaultColorMap, type Cubelet, type Cube, type StickerMap } from './cube';
import type { FaceRotation } from './face-rotation';
import { getAllColors, type Colors } from '@/constants/colors';
import { RubiksCubeFaceRotator } from './rubiks-cube-face-rotator';

// Initial configuration
//           UP
//            0  1  2
//            3  4  5
//            6  7  8
// LEFT      FRONT     RIGHT     BACK
// 9  10 11  18 19 20  27 28 29  36 37 38
// 12 13 14  21 22 23  30 31 32  39 40 41
// 15 16 17  24 25 26  33 34 35  42 43 44
//           DOWN
//           45 46 47
//           48 49 50
//           51 52 53

const stickerMap: StickerMap[] = [
    //corners
    [{ side: Sides.FRONT, id: 18 }, { side: Sides.UP, id: 6 }, { side: Sides.LEFT, id: 11 }],
    [{ side: Sides.FRONT, id: 20 }, { side: Sides.UP, id: 8 }, { side: Sides.RIGHT, id: 27 }],
    [{ side: Sides.FRONT, id: 24 }, { side: Sides.DOWN, id: 45 }, { side: Sides.LEFT, id: 17 }],
    [{ side: Sides.FRONT, id: 26 }, { side: Sides.DOWN, id: 47 }, { side: Sides.RIGHT, id: 33 }],
    [{ side: Sides.BACK, id: 36 }, { side: Sides.UP, id: 2 }, { side: Sides.RIGHT, id: 29 }],
    [{ side: Sides.BACK, id: 38 }, { side: Sides.UP, id: 0 }, { side: Sides.LEFT, id: 9 }],
    [{ side: Sides.BACK, id: 42 }, { side: Sides.DOWN, id: 53 }, { side: Sides.RIGHT, id: 35 }],
    [{ side: Sides.BACK, id: 44 }, { side: Sides.DOWN, id: 51 }, { side: Sides.LEFT, id: 15 }],

    //edges
    [{ side: Sides.FRONT, id: 19 }, { side: Sides.UP, id: 7 }],
    [{ side: Sides.FRONT, id: 21 }, { side: Sides.LEFT, id: 14 }],
    [{ side: Sides.FRONT, id: 23 }, { side: Sides.RIGHT, id: 30 }],
    [{ side: Sides.FRONT, id: 25 }, { side: Sides.DOWN, id: 46 }],
    [{ side: Sides.UP, id: 5 }, { side: Sides.RIGHT, id: 28 }],
    [{ side: Sides.DOWN, id: 48 }, { side: Sides.LEFT, id: 16 }],
    [{ side: Sides.DOWN, id: 50 }, { side: Sides.RIGHT, id: 34 }],
    [{ side: Sides.BACK, id: 37 }, { side: Sides.UP, id: 1 }],
    [{ side: Sides.BACK, id: 39 }, { side: Sides.RIGHT, id: 32 }],
    [{ side: Sides.BACK, id: 41 }, { side: Sides.LEFT, id: 12 }],
    [{ side: Sides.BACK, id: 43 }, { side: Sides.DOWN, id: 52 }],
    [{ side: Sides.UP, id: 3 }, { side: Sides.LEFT, id: 10 }],

    //centers
    [{ side: Sides.BACK, id: 40 }],
    [{ side: Sides.FRONT, id: 22 }],
    [{ side: Sides.UP, id: 4 }],
    [{ side: Sides.DOWN, id: 49 }],
    [{ side: Sides.LEFT, id: 13 }],
    [{ side: Sides.RIGHT, id: 31 }],
];

export class RubiksCube implements Cube {
    private readonly hash: string;
    private readonly configuration: bigint[];
    private readonly dimension: number;
    private readonly faceRotator: RubiksCubeFaceRotator;

    public constructor(config?: { clone?: bigint[], colorMap?: Map<Colors, Sides> }) {
        this.faceRotator = new RubiksCubeFaceRotator();
        this.dimension = 3;
        if (config?.clone) {
            this.configuration = [...config.clone];
        } else {
            const colorMap = config?.colorMap || defaultColorMap;
            this.configuration = getAllColors()
                .map(color => {
                    const side = BigInt(colorMap.get(color)!);
                    return BigInt(511n << (side * 9n)); // 511 = 111.111.111 in binary
                });
        }
        this.hash = this.configuration.join('.');
    }


    public clone(): RubiksCube {
        return new RubiksCube({ clone: this.configuration });
    }

    public getDimension(): number {
        return this.dimension;
    }

    public getConfiguration(): bigint[] {
        return [...this.configuration];
    }

    public getHash(): string {
        return this.hash;
    }

    private getColorOfIndex(index: number): Colors | undefined {
        let counter = 0;
        for (let color of this.configuration) {
            if (color & BigInt(1n << BigInt(index))) {
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

    public rotateFace(faceRotation: FaceRotation): RubiksCube {
        const result = this.faceRotator.rotate(this.configuration, faceRotation);
        return new RubiksCube({ clone: result });
    }

    public getAllCubelets(): Cubelet[] {
        return this.getCubeletsFromStickers(stickerMap);
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

    private getCubeletsFromStickers(stickers: StickerMap[]): Cubelet[] {
        return stickers
            .map(stickers => ({
                stickers: stickers
                    .map(sticker => {
                        const x = sticker.id % this.dimension;
                        const y = Math.floor((sticker.id % (this.dimension * this.dimension)) / this.dimension);
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