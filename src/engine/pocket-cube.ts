import { PocketCubeFaceRotator } from './pocket-cube-face-rotator';
import { getAllSides, Sides } from '@/constants/sides';
import { defaultColorMap, type Cubelet, type RubiksCube, type StickerMap } from './rubiks-cube';
import type { FaceRotation } from './face-rotation';
import type { Colors } from '@/constants/colors';

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

// Since every sticker can assume 6 colors and we have a total of 24 stickers. We can have 6 (64bit) numbers to represent it, being each number one color and each bit one index.
// However, since we only care about 24 bits out of 64 available, we can represent two colors (2 x 24 bits) and still have 16 more unused bits per Byte, so 3 Bytes are enough.
//
// So, let's say we have a solved cube (up: yellow, left: orange, front: blue, right: red, back: green, down: white), it would be represented like this:
//
// 11110000 00000000 00000000 (<- 24, Yellow) 00001111 00000000 00000000 (<- 24, Orange) -------- -------- (<- 16, unused)
// 00000000 11110000 00000000 (<- 24, Blue)   00000000 00001111 00000000 (<- 24, Red)    -------- -------- (<- 16, unused)
// 00000000 00000000 11110000 (<- 24, Green)  00000000 00000000 00001111 (<- 24, White)  -------- -------- (<- 16, unused)
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

    public constructor(config?: { clone?: number[], colorMap?: Map<Sides, Colors> }) {
        this.faceRotator = new PocketCubeFaceRotator();
        this.dimension = 2;
        if (config?.clone) {
            this.configuration = [...config.clone];
        } else {
            let colorMap = config?.colorMap || defaultColorMap;
            this.configuration = [];
            getAllSides()
                .forEach(side => {
                    const stickers: Colors[] = Array
                        .from(new Array(this.dimension * this.dimension))
                        .map(() => colorMap.get(side)!);
                    this.configuration.push(...stickers);
                })
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

    public isSolved(): boolean {
        const stickersPerSide = this.dimension * this.dimension;
        const sides = getAllSides();
        const stickersArray = Array.from(new Array(stickersPerSide));
        return sides
            .every((_, sideIndex) => stickersArray
                .every((_, index) => this.configuration[sideIndex * stickersPerSide + index] === this.configuration[sideIndex * stickersPerSide]))
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
                .every(sticker => colors.includes(this.configuration[sticker.id!])));
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
                            color: this.configuration[sticker.id],
                            x: x,
                            y: y
                        };

                    })
            }))
    }

}