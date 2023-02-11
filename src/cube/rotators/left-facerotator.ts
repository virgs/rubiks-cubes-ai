import {Sides} from '@/cube/sides';
import type {Face} from '@/cube/face';
import type {FaceRotator} from '@/cube/rotators/face-rotator';

export class LeftFacerotator implements FaceRotator {
    // Configuration after a clockwise rotation of the side
    //       18  1
    //       17  2
    // 7  4   0  9  12 13  16 23
    // 6  5   3 10  15 14  19 20
    //        8 21
    //       11 22

    private readonly side = Sides.LEFT;
    private faceMap: Map<Sides, Face>;

    constructor(faceMap: Map<Sides, Face>) {
        this.faceMap = faceMap;
    }

    public rotateClockwise(): void {
        const stickersOfSide = this.faceMap.get(this.side)!
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
    }
}