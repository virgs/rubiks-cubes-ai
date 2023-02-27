import type { Colors } from '@/constants/colors';
import { Sides } from '@/constants/sides';
import type { FaceRotation } from './face-rotation';

type FaceRotatorMap = {
    destination: number,
    source: number
};

export class RubiksCubeFaceRotator {
    private static faceRotatorMap: Map<Sides, FaceRotatorMap[]>;

    public constructor() {
        if (!RubiksCubeFaceRotator.faceRotatorMap) {
            this.initializeMap();
        }
    }

    private static setColorOfIndex(configuration: bigint[], index: number, color: number): void {
        configuration
            .forEach((_, i, config) => {
                if (i === color) {
                    config[i] |= BigInt(1 << index); // sets color bit to 1
                } else {
                    config[i] &= BigInt(-1 ^ (1 << index)); //sets bit of every other color to 0
                }
            })
    }

    private static getColorOfIndex(configuration: bigint[], index: number): Colors | undefined {
        let counter = 0;
        for (let color of configuration) {
            if (color & BigInt(1 << index)) {
                return counter;
            }
            ++counter;
        }
    }

    public rotate(original: bigint[], faceRotation: FaceRotation): bigint[] {
        const clone = [...original];
        RubiksCubeFaceRotator.faceRotatorMap.get(faceRotation.side)!
            .forEach(item => {
                if (faceRotation.counterClockwiseDirection) {
                    RubiksCubeFaceRotator.setColorOfIndex(clone, item.source,
                        RubiksCubeFaceRotator.getColorOfIndex(original, item.destination)!);
                } else {
                    RubiksCubeFaceRotator.setColorOfIndex(clone, item.destination,
                        RubiksCubeFaceRotator.getColorOfIndex(original, item.source)!);
                }
            })
        return clone;
    }

    private initializeMap() {
        //           UP
        //           0  1  2
        //           3  4  5
        //           6  7  8
        // LEFT      FRONT     RIGHT     BACK
        // 9  10 11  18 19 20  27 28 29  36 37 38
        // 12 13 14  21 22 23  30 31 32  39 40 41
        // 15 16 17  24 25 26  33 34 35  42 43 44
        //           DOWN
        //           45 46 47
        //           48 49 50
        //           51 52 53

        RubiksCubeFaceRotator.faceRotatorMap = new Map();

        const upFaceRotator: FaceRotatorMap[] = this.createUpFaceClockwiseRotator();
        const leftFaceRotator: FaceRotatorMap[] = this.createLeftFaceClockwiseRotator();
        const frontFaceRotator: FaceRotatorMap[] = this.createFrontFaceClockwiseRotator();
        const rightFaceRotator: FaceRotatorMap[] = this.createRightFaceClockwiseRotator();
        const backFaceRotator: FaceRotatorMap[] = this.createBackFaceClockwiseRotator();
        const downFaceRotator: FaceRotatorMap[] = this.createDownFaceClockwiseRotator();

        RubiksCubeFaceRotator.faceRotatorMap.set(Sides.UP, upFaceRotator);
        RubiksCubeFaceRotator.faceRotatorMap.set(Sides.LEFT, leftFaceRotator);
        RubiksCubeFaceRotator.faceRotatorMap.set(Sides.FRONT, frontFaceRotator);
        RubiksCubeFaceRotator.faceRotatorMap.set(Sides.RIGHT, rightFaceRotator);
        RubiksCubeFaceRotator.faceRotatorMap.set(Sides.BACK, backFaceRotator);
        RubiksCubeFaceRotator.faceRotatorMap.set(Sides.DOWN, downFaceRotator);
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
        //           UP
        //           6  3  0
        //           7  4  1
        //           8  5  2
        // LEFT      FRONT     RIGHT     BACK
        // 18 19 20  27 28 29  36 37 38  9  10 11
        // 12 13 14  21 22 23  30 31 32  39 40 41
        // 15 16 17  24 25 26  33 34 35  42 43 44
        //           DOWN
        //           45 46 47
        //           48 49 50
        //           51 52 53

        return [
            { destination: 6, source: 0 },
            { destination: 3, source: 1 },
            { destination: 0, source: 2 },
            { destination: 7, source: 3 },
            { destination: 1, source: 5 },
            { destination: 8, source: 6 },
            { destination: 5, source: 7 },
            { destination: 2, source: 8 },

            { destination: 9, source: 18 },
            { destination: 10, source: 19 },
            { destination: 11, source: 20 },

            { destination: 18, source: 27 },
            { destination: 19, source: 28 },
            { destination: 20, source: 29 },

            { destination: 27, source: 36 },
            { destination: 28, source: 37 },
            { destination: 29, source: 38 },

            { destination: 36, source: 9 },
            { destination: 37, source: 10 },
            { destination: 38, source: 11 },
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