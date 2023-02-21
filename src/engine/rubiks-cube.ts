import { Colors } from '../constants/colors';
import { getAllSides, Sides } from '@/constants/sides';
import type { FaceRotation } from './face-rotation';
import { PocketCube } from './pocket-cube';

const defaultColorMap: Map<Sides, Colors> = new Map();
defaultColorMap.set(Sides.FRONT, Colors.BLUE);
defaultColorMap.set(Sides.UP, Colors.YELLOW);
defaultColorMap.set(Sides.RIGHT, Colors.RED);
defaultColorMap.set(Sides.LEFT, Colors.ORANGE);
defaultColorMap.set(Sides.BACK, Colors.GREEN);
defaultColorMap.set(Sides.DOWN, Colors.WHITE);

export type Sticker = {
    side: Sides,
    id: number,
    color: Colors,
    x: number,
    y: number
};

export type Cubelet = {
    stickers: Sticker[]
};

export type StickerMap = {
    side: Sides,
    id: number
}[];

export abstract class RubiksCube {
    private readonly hash: string;
    protected readonly stickers: Colors[];
    protected readonly dimension: number;

    public constructor(config: { dimension: number, stickersMap: StickerMap[], clone?: Colors[], colorMap?: Map<Sides, Colors> }) {
        this.dimension = config.dimension;
        if (config.clone) {
            this.stickers = [...config.clone];
        } else {
            let colorMap = defaultColorMap;
            if (config.colorMap) {
                colorMap = config.colorMap;
            }
            this.stickers = [];
            getAllSides()
                .forEach(side => {
                    const stickers: Colors[] = Array
                        .from(new Array(this.getDimension() * this.getDimension()))
                        .map(() => colorMap.get(side)!);
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
        return new PocketCube({ clone: this.stickers });
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
