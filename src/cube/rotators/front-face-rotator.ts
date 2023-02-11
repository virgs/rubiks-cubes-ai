import {Sides} from '@/cube/sides';
import type {Face} from '@/cube/face';
import type {FaceRotator} from '@/cube/rotators/face-rotator';

export class FrontFaceRotator implements FaceRotator {
    // Configuration after a clockwise rotation of the side
    //        0  1
    //        6  5
    // 4 20  11  8   3 13  16 17
    // 7 21  10  9   2 14  19 18
    //       15 12
    //       23 22

    private readonly side = Sides.FRONT;
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

        const removedFromUpFace = upFace.removeStickersFromIndexes(2, 3);
        const removedFromLeftFace = leftFace.removeStickersFromIndexes(1, 2);
        const removedFromDown = downFace.removeStickersFromIndexes(0, 1);
        const removedFromRightFace = rightFace.removeStickersFromIndexes(0, 3);

        upFace.addStickersAtIndexes({
            sticker: removedFromLeftFace[1],
            index: 2
        }, {
            sticker: removedFromLeftFace[0],
            index: 2
        });
        rightFace.addStickersAtIndexes({
                sticker: removedFromUpFace[1],
                index: 0
            },
            {
                sticker: removedFromUpFace[0],
                index: 3
            });
        downFace.addStickersAtIndexes({
            sticker: removedFromRightFace[0],
            index: 0
        }, {
            sticker: removedFromRightFace[1],
            index: 0
        });
        leftFace.addStickersAtIndexes({
            sticker: removedFromDown[1],
            index: 1
        }, {
            sticker: removedFromDown[0],
            index: 1
        });
    }
}