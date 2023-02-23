import { Colors } from '../constants/colors';
import { getAllSides, Sides } from '@/constants/sides';
import type { FaceRotation } from './face-rotation';

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
    protected readonly configuration: number[];
    protected readonly dimension: number;

    public constructor(config: { dimension: number, stickersMap: StickerMap[], clone?: number[], colorMap?: Map<Sides, Colors> }) {
        this.dimension = config.dimension;
        if (config.clone) {
            this.configuration = [...config.clone];
        } else {
            let colorMap = defaultColorMap;
            if (config.colorMap) {
                colorMap = config.colorMap;
            }
            this.configuration = [];
            getAllSides()
                .forEach(side => {
                    const stickers: Colors[] = Array
                        .from(new Array(this.dimension * this.dimension))
                        .map(() => colorMap.get(side)!);
                    this.configuration.push(...stickers);
                })
        }
        this.hash = this.configuration.join('.');
    }

    public getDimension(): number {
        return this.dimension;
    }

    public getConfiguration(): number[] {
        return [...this.configuration];
    }

    public getHash(): string {
        return this.hash;
    }

    public abstract isSolved(): boolean;
    public abstract clone(): RubiksCube;
    public abstract rotateFace(faceRotation: FaceRotation): RubiksCube;
    public abstract getAllCubelets(): Cubelet[];
}
