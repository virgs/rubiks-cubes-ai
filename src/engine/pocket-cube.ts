import { PocketCubeFaceRotator } from './pocket-cube-face-rotator';
import { Sides } from '@/constants/sides';
import { RubiksCube, type Cubelet, type StickerMap } from './rubiks-cube';
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

export class PocketCube extends RubiksCube {
    private readonly faceRotator: PocketCubeFaceRotator;

    public constructor(config?: { clone?: Colors[], colorMap?: Map<Sides, Colors> }) {
        super({ dimension: 2, stickersMap: stickerMap, clone: config && config.clone, colorMap: config && config?.colorMap });
        this.faceRotator = new PocketCubeFaceRotator();
    }

    public rotateFace(faceRotation: FaceRotation): PocketCube {
        const result = this.faceRotator.rotate(this.stickers, faceRotation);
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
                .every(sticker => colors.includes(this.stickers[sticker.id!])));
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
                            color: this.stickers[sticker.id],
                            x: x,
                            y: y
                        };

                    })
            }))
    }

}