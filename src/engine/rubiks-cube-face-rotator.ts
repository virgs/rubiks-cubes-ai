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

    private static setColorOfIndex(configuration: bigint[], index: bigint, color: number): void {
        // console.log(this.configuration.map(c => c.toString(2)))
        configuration
            .forEach((_, i, config) => {
                if (i === color) {
                    config[i] |= BigInt(1n << index); // sets color bit to 1
                } else {
                    config[i] &= BigInt(-1n ^ (1n << index)); //sets bit of every other color to 0
                }
            })
    }

    private static getColorOfIndex(configuration: bigint[], index: bigint): Colors | undefined {
        // console.log(this.configuration.map(c => c.toString(2)))
        let counter = 0;
        for (let color of configuration) {
            if (color & BigInt(1n << BigInt(index))) {
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
                    RubiksCubeFaceRotator.setColorOfIndex(clone, BigInt(item.source),
                        RubiksCubeFaceRotator.getColorOfIndex(original, BigInt(item.destination))!);
                } else {
                    RubiksCubeFaceRotator.setColorOfIndex(clone, BigInt(item.destination),
                        RubiksCubeFaceRotator.getColorOfIndex(original, BigInt(item.source))!);
                }
            })
        return clone;
    }

    private initializeMap() {
        //           UP
        //            0  1  2
        //            3  4  5
        //            6  7  8
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

    private createUpFaceClockwiseRotator(): FaceRotatorMap[] {
        //           UP
        //            6  3  0
        //            7  4  1
        //            8  5  2
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

    private createLeftFaceClockwiseRotator(): FaceRotatorMap[] {
        //           UP
        //           44  1  2
        //           41  4  5
        //           38  7  8
        // LEFT      FRONT     RIGHT     BACK
        // 15 12  9   0 19 20  27 28 29  36 37 45
        // 16 13 10   3 22 23  30 31 32  39 40 48
        // 17 14 11   6 25 26  33 34 35  42 43 51
        //           DOWN
        //           18 46 47
        //           21 49 50
        //           24 52 53

        return [
            { destination: 9, source: 15 },
            { destination: 10, source: 12 },
            { destination: 11, source: 9 },
            { destination: 12, source: 16 },
            { destination: 14, source: 10 },
            { destination: 15, source: 17 },
            { destination: 16, source: 14 },
            { destination: 17, source: 11 },

            { destination: 0, source: 44 },
            { destination: 3, source: 41 },
            { destination: 6, source: 38 },

            { destination: 18, source: 0 },
            { destination: 21, source: 3 },
            { destination: 24, source: 6 },

            { destination: 45, source: 18 },
            { destination: 48, source: 21 },
            { destination: 51, source: 24 },

            { destination: 38, source: 45 },
            { destination: 41, source: 48 },
            { destination: 44, source: 51 },
        ];
    }

    private createFrontFaceClockwiseRotator(): FaceRotatorMap[] {
        //           UP
        //            0  1  2
        //            3  4  5
        //            6  7  8
        // LEFT      FRONT     RIGHT     BACK
        // 9  10 11  18 19 20  27 28 29  36 37 38
        // 12 13 14  21 22 23  30 31 32  39 40 41
        // 15 16 17  24 25 26  33 34 35  42 43 44
        //           DOWN
        //           45 46 47
        //           48 49 50
        //           51 52 53

        //           UP
        //            0  1  2
        //            3  4  5
        //           17 14 11
        // LEFT      FRONT     RIGHT     BACK
        // 9  10 45  24 21 18  6 28 29  36 37 38
        // 12 13 46  25 22 19  7 31 32  39 40 41
        // 15 16 47  26 23 20  8 34 35  42 43 44
        //           DOWN
        //           33 30 27
        //           48 49 50
        //           51 52 53
        return [
            { destination: 6, source: 17 },
            { destination: 7, source: 14 },
            { destination: 8, source: 11 },

            { destination: 11, source: 45 },
            { destination: 14, source: 46 },
            { destination: 17, source: 47 },

            { destination: 45, source: 33 },
            { destination: 46, source: 30 },
            { destination: 47, source: 27 },

            { destination: 27, source: 6 },
            { destination: 30, source: 7 },
            { destination: 33, source: 8 },            


            { destination: 18, source: 24 },
            { destination: 19, source: 21 },
            { destination: 20, source: 18 },
            { destination: 21, source: 25 },
            { destination: 23, source: 19 },
            { destination: 24, source: 26 },
            { destination: 25, source: 23 },
            { destination: 26, source: 20 },
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
}