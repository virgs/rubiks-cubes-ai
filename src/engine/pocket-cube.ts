import { Colors } from './colors';
import { PocketCubeFaceRotator } from './pocket-cube-face-rotator';
import { getAllSides, Sides } from '@/engine/sides';
import type { FaceRotation } from './face-rotation';


export const getInitialColorOfSide = (orientation: Sides): Colors => {
    switch (orientation) {
        case Sides.FRONT:
            return Colors.BLUE;
        case Sides.UP:
            return Colors.YELLOW;
        case Sides.RIGHT:
            return Colors.RED;
        case Sides.LEFT:
            return Colors.ORANGE
        case Sides.BACK:
            return Colors.GREEN;
        case Sides.DOWN:
            return Colors.WHITE;
    }
}


export class PocketCube {
    private readonly faceRotator: PocketCubeFaceRotator;
    private readonly colors: Colors[];
    private readonly hash: string;


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
        this.hash = this.colors.join('.');
    }

    public getConfiguration(): Colors[] {
        return [...this.colors];
    }

    public getDimension(): number {
        return 2;
    }

    public clone(): PocketCube {
        return new PocketCube(this.colors);
    }

    public rotateFace(faceRotation: FaceRotation): PocketCube {
        const result = this.faceRotator.rotate(this.colors, faceRotation);
        return new PocketCube(result);
    }

    public isSolved(): boolean {
        const sides = getAllSides();
        const stickersPerSide = 4;
        const stickersArray = Array.from(new Array(stickersPerSide));
        return sides
            .every((_, sideIndex) => stickersArray
                .every((_, index) => this.colors[sideIndex * stickersPerSide + index] === this.colors[sideIndex * stickersPerSide]))

    }

    public getHash(): string {
        return this.hash;
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
            });

    }
}