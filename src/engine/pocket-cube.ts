import { Colors } from './colors';
import { PocketCubeFaceRotator } from './pocket-cube-face-rotator';
import { getAllSides, getInitialColorOfSide, Sides } from '@/engine/sides';

export class PocketCube {
    private readonly faceRotator: PocketCubeFaceRotator;
    private readonly colors: Colors[];

    public constructor(clone?: Colors[]) {
        if (clone) {
            this.colors = [...clone];
        } else {
            this.colors = [];
            getAllSides()
                .forEach(side => {
                    const colors = Array.from(new Array(this.getDimension() * this.getDimension()))
                        .map(() => getInitialColorOfSide(side));
                    this.colors.push(...colors);
                })
        }
        this.faceRotator = new PocketCubeFaceRotator();
    }

    public getDimension(): number {
        return 2;
    }

    public clone(): PocketCube {
        return new PocketCube(this.colors);
    }

    public rotateFace(side: Sides, clockwiseDirection: boolean = true): PocketCube {
        console.log('Rotating: ' + Sides[side])
        let result = this.faceRotator.rotateClockwise(this.colors, side);
        if (!clockwiseDirection) {
            result = this.faceRotator.rotateClockwise(result, side)!;
            result = this.faceRotator.rotateClockwise(result, side)!;
        }
        return new PocketCube(result);
    }

    public print(): void {
        let index = 0;
        getAllSides()
            .forEach(side => {
            console.log('-----', Sides[side], '-----');
            Array.from(new Array(this.getDimension() * this.getDimension()))
                .forEach((_) => {
                    console.log(Colors[this.colors[index++]]);
                })
        })

    }
}