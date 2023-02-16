import { Sides } from '@/engine/sides';
import type { Colors } from './colors';

type FaceRotatorMap = {
    src: number,
    dst: number
};

export class PocketCubeFaceRotator {
    private static faceRotatorMap: Map<Sides, FaceRotatorMap[]>;

    public constructor() {
        if (!PocketCubeFaceRotator.faceRotatorMap) {
            this.initializeMap();
        }
    }

    public rotateClockwise(original: Colors[], side: Sides): Colors[] {
        const result = [...original];
        PocketCubeFaceRotator.faceRotatorMap.get(side)!
            .forEach(item => {
                result[item.dst] = original[item.src]
            })
        return result;
    }

    private initializeMap() {
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

        PocketCubeFaceRotator.faceRotatorMap = new Map();

        const upFaceRotator: FaceRotatorMap[] = this.createUpFaceRotator();
        const leftFaceRotator: FaceRotatorMap[] = this.createLeftFaceRotator();
        const frontFaceRotator: FaceRotatorMap[] = this.createFrontFaceRotator();
        const rightFaceRotator: FaceRotatorMap[] = this.createRightFaceRotator();
        const backFaceRotator: FaceRotatorMap[] = this.createBackFaceRotator();
        const downFaceRotator: FaceRotatorMap[] = this.createDownFaceRotator();

        PocketCubeFaceRotator.faceRotatorMap.set(Sides.UP, upFaceRotator);
        PocketCubeFaceRotator.faceRotatorMap.set(Sides.LEFT, leftFaceRotator);
        PocketCubeFaceRotator.faceRotatorMap.set(Sides.FRONT, frontFaceRotator);
        PocketCubeFaceRotator.faceRotatorMap.set(Sides.RIGHT, rightFaceRotator);
        PocketCubeFaceRotator.faceRotatorMap.set(Sides.BACK, backFaceRotator);
        PocketCubeFaceRotator.faceRotatorMap.set(Sides.DOWN, downFaceRotator);
    }

    private createDownFaceRotator(): FaceRotatorMap[] {
        //       UP
        //        0  1
        //        3  2
        // LEFT  FRONT  RIGHT  BACK
        //  4  5  8  9  12 13  16 17
        // 19 18  7  6  11 10  15 14
        //       DOWN
        //       23 20
        //       22 21

        return [
            { src: 6, dst: 18 },
            { src: 7, dst: 19 },

            { src: 10, dst: 6 },
            { src: 11, dst: 7 },


            { src: 14, dst: 10 },
            { src: 15, dst: 11 },

            { src: 18, dst: 14 },
            { src: 19, dst: 15 },

            { src: 20, dst: 23 },
            { src: 21, dst: 20 },
            { src: 22, dst: 21 },
            { src: 23, dst: 22 },
        ];
    }
    private createRightFaceRotator(): FaceRotatorMap[] {
        // Initial configuration
        //       UP
        //        0  9
        //        3  10
        // LEFT  FRONT  RIGHT  BACK
        // 4  5   8 21  15 12   2 17
        // 7  6  11 22  14 13   1 18
        //       DOWN
        //       20 19
        //       23 16
        return [
            { src: 1, dst: 9 },
            { src: 2, dst: 10 },

            { src: 9, dst: 21 },
            { src: 10, dst: 22 },

            { src: 12, dst: 15 },
            { src: 13, dst: 12 },
            { src: 14, dst: 13 },
            { src: 15, dst: 14 },


            { src: 16, dst: 2 },
            { src: 19, dst: 1 },

            { src: 21, dst: 19 },
            { src: 22, dst: 16 },
        ];
    }

    private createUpFaceRotator(): FaceRotatorMap[] {
        //       UP
        //        3  0
        //        2  1
        // LEFT  FRONT  RIGHT  BACK
        // 8  9  12 13  16 17  4  5
        // 7  6  11 10  15 14  19 18
        //       DOWN
        //       20 21
        //       23 22

        return [
            { src: 0, dst: 3 },
            { src: 1, dst: 0 },
            { src: 2, dst: 1 },
            { src: 3, dst: 2 },

            { src: 4, dst: 8 },
            { src: 5, dst: 9 },

            { src: 8, dst: 12 },
            { src: 9, dst: 13 },

            { src: 12, dst: 16 },
            { src: 13, dst: 17 },

            { src: 16, dst: 4 },
            { src: 17, dst: 5 },
        ];

    }

    private createBackFaceRotator(): FaceRotatorMap[] {
        //       UP
        //       13 14
        //        3  2
        // LEFT  FRONT  RIGHT  BACK
        // 1  5   8  9  12 22  19 16
        // 0  6  11 10  15 23  18 17
        //       DOWN
        //       20 21
        //        4 7

        return [
            { src: 0, dst: 13 },
            { src: 1, dst: 14 },

            { src: 4, dst: 1 },
            { src: 7, dst: 0 },

            { src: 13, dst: 22 },
            { src: 14, dst: 23 },

            { src: 16, dst: 19 },
            { src: 17, dst: 16 },
            { src: 18, dst: 17 },
            { src: 19, dst: 18 },

            { src: 22, dst: 4 },
            { src: 23, dst: 7 },
        ];

    }

    private createLeftFaceRotator(): FaceRotatorMap[] {
        //       UP
        //       18  1
        //       17  2
        // LEFT  FRONT  RIGHT  BACK
        // 7  4   0  9  12 13  16 23
        // 6  5   3 10  15 14  19 20
        //       DOWN
        //        8 21
        //       11 22
        return [
            { src: 0, dst: 18 },
            { src: 3, dst: 17 },

            { src: 4, dst: 7 },
            { src: 5, dst: 4 },
            { src: 6, dst: 4 },
            { src: 7, dst: 6 },

            { src: 8, dst: 0 },
            { src: 11, dst: 3 },

            { src: 17, dst: 23 },
            { src: 18, dst: 20 },

            { src: 20, dst: 8 },
            { src: 23, dst: 11 },
        ];
    }

    private createFrontFaceRotator(): FaceRotatorMap[] {
        //       UP
        //        0  1
        //        6  5
        // LEFT  FRONT  RIGHT  BACK
        // 4 20  11  8   3 13  16 17
        // 7 21  10  9   2 14  19 18
        //       DOWN
        //       15 12
        //       23 22
        return [
            { src: 2, dst: 5 },
            { src: 3, dst: 6 },

            { src: 5, dst: 20 },
            { src: 6, dst: 21 },

            { src: 8, dst: 11 },
            { src: 9, dst: 8 },
            { src: 10, dst: 9 },
            { src: 11, dst: 10 },

            { src: 12, dst: 3 },
            { src: 15, dst: 2 },

            { src: 20, dst: 15 },
            { src: 21, dst: 12 },
        ];
    }

}