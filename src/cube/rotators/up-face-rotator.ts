import {Sides} from '@/cube/sides';
import type {Face} from '@/cube/face';
import type {FaceRotator} from '@/cube/rotators/face-rotator';

export class UpFaceRotator implements FaceRotator {
    // Configuration after a clockwise rotation of the side
    //        3  0
    //        2  1
    // 8  9  12 13  16 17  4  5
    // 7  6  11 10  15 14  19 18
    //       20 21
    //       23 22

    private readonly side = Sides.UP;
    private faceMap: Map<Sides, Face>;

    constructor(faceMap: Map<Sides, Face>) {
        this.faceMap = faceMap;
    }

    public rotateClockwise(): void {
        const stickersOfSide = this.faceMap.get(this.side)!
        stickersOfSide.addStickersAtIndexes({index: 0, sticker: stickersOfSide.removeStickersFromIndexes(3)[0]})

        const frontFace = this.faceMap.get(Sides.FRONT)!;
        const leftFace = this.faceMap.get(Sides.LEFT)!;
        const backFace = this.faceMap.get(Sides.BACK)!;
        const rightFace = this.faceMap.get(Sides.RIGHT)!;

        const removedFromFrontFace = frontFace.removeStickersFromIndexes(0, 1);
        const removedFromLeftFace = leftFace.removeStickersFromIndexes(0, 1);
        const removedFromBackFace = backFace.removeStickersFromIndexes(0, 1);
        const removedFromRightFace = rightFace.removeStickersFromIndexes(0, 1);

        frontFace.addStickersAtIndexes({
            sticker: removedFromRightFace[0],
            index: 0
        }, {
            sticker: removedFromRightFace[1],
            index: 1
        });
        leftFace.addStickersAtIndexes({
            sticker: removedFromFrontFace[0],
            index: 0
        }, {
            sticker: removedFromFrontFace[1],
            index: 1
        });
        backFace.addStickersAtIndexes({
            sticker: removedFromLeftFace[0],
            index: 0
        }, {
            sticker: removedFromLeftFace[1],
            index: 1
        });
        rightFace.addStickersAtIndexes({
            sticker: removedFromBackFace[0],
            index: 0
        }, {
            sticker: removedFromBackFace[1],
            index: 1
        });
    }
}