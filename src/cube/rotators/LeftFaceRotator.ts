import {Sides} from '@/cube/Sides';
import type {Face} from '@/cube/Face';
import type {FaceRotator} from '@/cube/rotators/FaceRotator';

export class LeftFaceRotator implements FaceRotator {
    // Configuration after a clockwise rotation of the side
    //       b2 u1
    //       b1 u2
    // l0 l1 u0 f1 r0 r1 b0 d0
    // l3 l2 u3 f2 r3 r2 b3 d3
    //       f0 d1
    //       f3 d2

    //       18  1
    //       17  2
    // 7  4   0  9  12 13  16 23
    // 6  5   3 10  15 14  19 20
    //        8 21
    //       11 22

    //       20  1
    //       23  2
    // 6  7  18  9  12 13  16 11
    // 5  4  17 10  15 14  19  8
    //        0 21
    //        3 22


    private readonly side = Sides.LEFT;
    private faceMap: Map<Sides, Face>;

    constructor(faceMap: Map<Sides, Face>) {
        this.faceMap = faceMap;
    }

    public rotate(clockwiseDirection: boolean): void {
        const stickersOfSide = this.faceMap.get(this.side)!
        if (clockwiseDirection) {
            stickersOfSide.addStickersAtIndexes({index: 0, sticker: stickersOfSide.removeStickersFromIndexes(3)[0]})

            const upFace = this.faceMap.get(Sides.UP)!;
            const frontFace = this.faceMap.get(Sides.FRONT)!;
            const downFace = this.faceMap.get(Sides.DOWN)!;
            const backFace = this.faceMap.get(Sides.BACK)!;

            const removedFromUpFace = upFace.removeStickersFromIndexes(0, 3);
            const removedFromFrontFace = frontFace.removeStickersFromIndexes(0, 3);
            const removedFromDownFace = downFace.removeStickersFromIndexes(0, 3);
            const removedFromBackFace = backFace.removeStickersFromIndexes(1, 2);

            frontFace.addStickersAtIndexes({
                sticker: removedFromUpFace[0],
                index: 0
            }, {
                sticker: removedFromUpFace[1],
                index: 3
            });
            downFace.addStickersAtIndexes({
                sticker: removedFromFrontFace[0],
                index: 0
            }, {
                sticker: removedFromFrontFace[1],
                index: 3
            });
            backFace.addStickersAtIndexes({
                sticker: removedFromDownFace[0],
                index: 1
            }, {
                sticker: removedFromDownFace[1],
                index: 1
            });
            upFace.addStickersAtIndexes({
                sticker: removedFromBackFace[1],
                index: 0
            }, {
                sticker: removedFromBackFace[0],
                index: 3
            });
        } else {
            this.rotate(true)
            this.rotate(true)
            this.rotate(true)
        }
    }
}