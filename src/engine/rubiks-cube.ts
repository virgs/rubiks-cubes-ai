import { Colors } from '../constants/colors';
import { getAllSides, Sides } from '@/constants/sides';
import type { FaceRotation } from './face-rotation';
import { PocketCube } from './pocket-cube';

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

export type Cubelet = {
    stickers: {
        side: Sides,
        id: number,
        color: Colors,
        x: number,
        y: number
    }[]
};
export type StickerMap = {
    side: Sides,
    id: number
}[];

export abstract class RubiksCube {
    private readonly hash: string;
    protected readonly stickers: Colors[];
    protected readonly dimension: number;

    public constructor(config: { dimension: number, stickersMap: StickerMap[], clone?: Colors[] }) {
        this.dimension = config.dimension;
        if (config.clone) {
            this.stickers = [...config.clone];
        } else {
            this.stickers = [];
            getAllSides()
                .forEach(side => {
                    const stickers: Colors[] = Array
                        .from(new Array(this.getDimension() * this.getDimension()))
                        .map(() => getInitialColorOfSide(side));
                    this.stickers.push(...stickers);
                })
        }
        this.hash = this.stickers.join('.');

    }

    public getStickers(): Colors[] {
        return [...this.stickers];
    }

    public getDimension(): number {
        return this.dimension;
    }

    public clone(): PocketCube {
        return new PocketCube(this.stickers);
    }

    public isSolved(): boolean {
        const stickersPerSide = this.dimension * this.dimension;
        const sides = getAllSides();
        const stickersArray = Array.from(new Array(stickersPerSide));
        return sides
            .every((_, sideIndex) => stickersArray
                .every((_, index) => this.stickers[sideIndex * stickersPerSide + index] === this.stickers[sideIndex * stickersPerSide]))
    }

    public getHash(): string {
        return this.hash;
    }

    public abstract rotateFace(faceRotation: FaceRotation): RubiksCube;
    public abstract getAllCubelets(): Cubelet[];
}
