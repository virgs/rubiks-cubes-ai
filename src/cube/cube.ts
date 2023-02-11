import {Face} from '@/cube/face';
import {Sticker} from '@/cube/sticker';
import {UpFaceRotator} from '@/cube/rotators/up-face-rotator';
import type {FaceRotator} from '@/cube/rotators/face-rotator';
import {LeftFacerotator} from '@/cube/rotators/left-facerotator';
import {BackFaceRotator} from '@/cube/rotators/back-face-rotator';
import {FrontFaceRotator} from '@/cube/rotators/front-face-rotator';
import {getAllSides, getInitialColorOfSide, Sides} from '@/cube/sides';

export class Cube {
    private readonly rotatorMap: Map<Sides, FaceRotator>;
    private readonly faceMap: Map<Sides, Face>;

    public constructor() {
        this.faceMap = new Map<Sides, Face>();
        getAllSides()
            .forEach(side => {
                const faceStickers = Array.from(new Array(4)) //four stickers per side
                    .map(() => new Sticker(getInitialColorOfSide(side)));
                this.faceMap.set(side, new Face(faceStickers))
            })
        this.rotatorMap = new Map<Sides, FaceRotator>();
        this.rotatorMap.set(Sides.UP, new UpFaceRotator(this.faceMap));
        this.rotatorMap.set(Sides.LEFT, new LeftFacerotator(this.faceMap));
        this.rotatorMap.set(Sides.FRONT, new FrontFaceRotator(this.faceMap));
        this.rotatorMap.set(Sides.BACK, new BackFaceRotator(this.faceMap));
    }

    public rotateFace(pivot: Sides, clockwiseDirection: boolean = true): void {
        console.log('Rotating: ' + Sides[pivot])
        const faceRotator = this.rotatorMap.get(pivot)!;
        faceRotator.rotateClockwise();
        if (!clockwiseDirection) {
            faceRotator.rotateClockwise();
            faceRotator.rotateClockwise();
        }
    }

    public printFace(side: Sides): void {
        console.log('-----', Sides[side], '-----')
        this.faceMap.get(side)!.print();
    }
}