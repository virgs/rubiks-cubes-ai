export interface FaceRotator {
    // Initial configuration
    //       u0 u1
    //       u3 u2
    // l0 l1 f0 f1 r0 r1 b0 b1
    // l3 l2 f3 f2 r3 r2 b3 b2
    //       d0 d1
    //       d3 d2

    //        0  1
    //        3  2
    // 4  5   8  9  12 13  16 17
    // 7  6  11 10  15 14  19 18
    //       20 21
    //       23 22

    rotate(clockwiseDirection: boolean): void;
}