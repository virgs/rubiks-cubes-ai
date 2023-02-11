import {Face} from '@/cube/Face';
import {Sticker} from '@/cube/sticker';
import {UpFaceRotator} from '@/cube/rotators/UpFaceRotator';
import type {FaceRotator} from '@/cube/rotators/FaceRotator';
import {LeftFaceRotator} from '@/cube/rotators/LeftFaceRotator';
import {getAllSides, getInitialColorOfSide, Sides} from '@/cube/Sides';

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
        this.rotatorMap.set(Sides.LEFT, new LeftFaceRotator(this.faceMap));
    }

    public rotateFace(pivot: Sides, clockwiseDirection: boolean = true): void {
        console.log('Rotating: ' + Sides[pivot])
        this.rotatorMap.get(pivot)!.rotate(clockwiseDirection);
    }

    public printFace(side: Sides): void {
        console.log('-----', Sides[side], '-----')
        this.faceMap.get(side)!.print();
    }
}