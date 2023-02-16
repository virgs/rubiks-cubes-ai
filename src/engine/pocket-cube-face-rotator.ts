import { Sides } from '@/engine/sides';
import type { Colors } from './colors';

type FaceRotatorMap = {
    destination: number,
    source: number
};

export class PocketCubeFaceRotator {
    private static faceRotatorMap: Map<Sides, FaceRotatorMap[]>;

    public constructor() {
        if (!PocketCubeFaceRotator.faceRotatorMap) {
            this.initializeMap();
        }
    }

    public rotateClockwise(original: Colors[], side: Sides, clockwise: boolean): Colors[] {
        const result = [...original];
        PocketCubeFaceRotator.faceRotatorMap.get(side)!
            .forEach(item => {
                if (clockwise) {
                    result[item.destination] = original[item.source];
                } else {
                    result[item.source] = original[item.destination];
                }
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

        const upFaceRotator: FaceRotatorMap[] = this.createUpFaceClockwiseRotator();
        const leftFaceRotator: FaceRotatorMap[] = this.createLeftFaceClockwiseRotator();
        const frontFaceRotator: FaceRotatorMap[] = this.createFrontFaceClockwiseRotator();
        const rightFaceRotator: FaceRotatorMap[] = this.createRightFaceClockwiseRotator();
        const backFaceRotator: FaceRotatorMap[] = this.createBackFaceClockwiseRotator();
        const downFaceRotator: FaceRotatorMap[] = this.createDownFaceClockwiseRotator();

        PocketCubeFaceRotator.faceRotatorMap.set(Sides.UP, upFaceRotator);
        PocketCubeFaceRotator.faceRotatorMap.set(Sides.LEFT, leftFaceRotator);
        PocketCubeFaceRotator.faceRotatorMap.set(Sides.FRONT, frontFaceRotator);
        PocketCubeFaceRotator.faceRotatorMap.set(Sides.RIGHT, rightFaceRotator);
        PocketCubeFaceRotator.faceRotatorMap.set(Sides.BACK, backFaceRotator);
        PocketCubeFaceRotator.faceRotatorMap.set(Sides.DOWN, downFaceRotator);
    }

    private createDownFaceClockwiseRotator(): FaceRotatorMap[] {
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
            { destination: 6, source: 18 },
            { destination: 7, source: 19 },

            { destination: 10, source: 6 },
            { destination: 11, source: 7 },


            { destination: 14, source: 10 },
            { destination: 15, source: 11 },

            { destination: 18, source: 14 },
            { destination: 19, source: 15 },

            { destination: 20, source: 23 },
            { destination: 21, source: 20 },
            { destination: 22, source: 21 },
            { destination: 23, source: 22 },
        ];
    }
    private createRightFaceClockwiseRotator(): FaceRotatorMap[] {
        // Initial configuration
        //       UP
        //        0 9
        //        3 10
        // LEFT  FRONT  RIGHT  BACK
        // 4  5   8 21  15 12   2 17
        // 7  6  11 22  14 13   1 18
        //       DOWN
        //       20 19
        //       23 16
        return [
            { destination: 1, source: 9 },
            { destination: 2, source: 10 },

            { destination: 9, source: 21 },
            { destination: 10, source: 22 },

            { destination: 12, source: 15 },
            { destination: 13, source: 12 },
            { destination: 14, source: 13 },
            { destination: 15, source: 14 },

            { destination: 16, source: 2 },
            { destination: 19, source: 1 },

            { destination: 21, source: 19 },
            { destination: 22, source: 16 },
        ];
    }

    private createUpFaceClockwiseRotator(): FaceRotatorMap[] {
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
            { destination: 0, source: 3 },
            { destination: 1, source: 0 },
            { destination: 2, source: 1 },
            { destination: 3, source: 2 },

            { destination: 4, source: 8 },
            { destination: 5, source: 9 },

            { destination: 8, source: 12 },
            { destination: 9, source: 13 },

            { destination: 12, source: 16 },
            { destination: 13, source: 17 },

            { destination: 16, source: 4 },
            { destination: 17, source: 5 },
        ];

    }

    private createBackFaceClockwiseRotator(): FaceRotatorMap[] {
        //       UP
        //       13 14
        //        3  2
        // LEFT  FRONT  RIGHT  BACK
        // 1  5   8  9  12 22  19 16
        // 0  6  11 10  15 23  18 17
        //       DOWN
        //       20 21
        //        4  7

        return [
            { destination: 0, source: 13 },
            { destination: 1, source: 14 },

            { destination: 4, source: 1 },
            { destination: 7, source: 0 },

            { destination: 13, source: 22 },
            { destination: 14, source: 23 },

            { destination: 16, source: 19 },
            { destination: 17, source: 16 },
            { destination: 18, source: 17 },
            { destination: 19, source: 18 },

            { destination: 22, source: 7 },
            { destination: 23, source: 4 },
        ];

    }

    private createLeftFaceClockwiseRotator(): FaceRotatorMap[] {
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
            { destination: 0, source: 18 },
            { destination: 3, source: 17 },

            { destination: 4, source: 7 },
            { destination: 5, source: 4 },
            { destination: 6, source: 5 },
            { destination: 7, source: 6 },

            { destination: 8, source: 0 },
            { destination: 11, source: 3 },

            { destination: 17, source: 23 },
            { destination: 18, source: 20 },

            { destination: 20, source: 8 },
            { destination: 23, source: 11 },
        ];
    }

    private createFrontFaceClockwiseRotator(): FaceRotatorMap[] {
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
            { destination: 2, source: 5 },
            { destination: 3, source: 6 },

            { destination: 5, source: 20 },
            { destination: 6, source: 21 },

            { destination: 8, source: 11 },
            { destination: 9, source: 8 },
            { destination: 10, source: 9 },
            { destination: 11, source: 10 },

            { destination: 12, source: 3 },
            { destination: 15, source: 2 },

            { destination: 20, source: 15 },
            { destination: 21, source: 12 },
        ];
    }

}