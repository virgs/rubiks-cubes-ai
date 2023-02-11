import {Sides} from '@/cube/sides';
import type {Face} from '@/cube/face';
import type {FaceRotator} from '@/cube/rotators/face-rotator';

export class BackFaceRotator implements FaceRotator {
    // Configuration after a clockwise rotation of the side
    //       13 14
    //        3  2
    // 1  5   8  9  12 22  19 16
    // 0  6  11 10  15 23  18 17
    //       20 21
    //        4 7

    private readonly side = Sides.BACK;
    private faceMap: Map<Sides, Face>;

    constructor(faceMap: Map<Sides, Face>) {
        this.faceMap = faceMap;
    }

    public rotateClockwise(): void {
        const stickersOfSide = this.faceMap.get(this.side)!
        stickersOfSide.addStickersAtIndexes({index: 0, sticker: stickersOfSide.removeStickersFromIndexes(3)[0]})

        const upFace = this.faceMap.get(Sides.UP)!;
        const rightFace = this.faceMap.get(Sides.RIGHT)!;
        const downFace = this.faceMap.get(Sides.DOWN)!;
        const leftFace = this.faceMap.get(Sides.LEFT)!;

        const removedFromUpFace = upFace.removeStickersFromIndexes(0, 1);
        const removedFromLeftFace = leftFace.removeStickersFromIndexes(0, 3);
        const removedFromDown = downFace.removeStickersFromIndexes(2, 3);
        const removedFromRightFace = rightFace.removeStickersFromIndexes(1, 2);

        upFace.addStickersAtIndexes({
            sticker: removedFromRightFace[0],
            index: 0
        }, {
            sticker: removedFromRightFace[1],
            index: 1
        });
        rightFace.addStickersAtIndexes({
            sticker: removedFromDown[0],
            index: 1
        },
        {
            sticker: removedFromDown[1],
            index: 2
        });
        downFace.addStickersAtIndexes({
            sticker: removedFromLeftFace[1],
            index: 2
        }, {
            sticker: removedFromLeftFace[0],
            index: 3
        });
        leftFace.addStickersAtIndexes({
            sticker: removedFromUpFace[1],
            index: 0
        }, {
            sticker: removedFromUpFace[0],
            index: 3
        });
    }
}