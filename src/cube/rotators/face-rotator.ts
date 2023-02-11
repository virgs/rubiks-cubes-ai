export interface FaceRotator {
    // Initial configuration
    //        0  1
    //        3  2
    // 4  5   8  9  12 13  16 17
    // 7  6  11 10  15 14  19 18
    //       20 21
    //       23 22

    rotateClockwise(): void;
}