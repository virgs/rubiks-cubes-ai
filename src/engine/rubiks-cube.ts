import { getAllSides, Sides } from '@/constants/sides';
import type { FaceRotation } from './face-rotation';
import { Colors, getAllColors } from '@/constants/colors';
import { CubeletsCreator } from './cubelets-creator';
import { RubiksCubeFaceRotator } from './rubiks-cube-face-rotator';
import { BitStream, BitView } from 'bit-buffer'
import { Buffer } from 'buffer';


export const defaultColorMap: Map<Colors, Sides> = new Map();
defaultColorMap.set(Colors.BLUE, Sides.FRONT);
defaultColorMap.set(Colors.YELLOW, Sides.UP);
defaultColorMap.set(Colors.RED, Sides.RIGHT);
defaultColorMap.set(Colors.ORANGE, Sides.LEFT);
defaultColorMap.set(Colors.GREEN, Sides.BACK);
defaultColorMap.set(Colors.WHITE, Sides.DOWN);

export type ColorlessSticker = {
    side: Sides,
    id: number,
    x: number,
    y: number
};

export type Sticker = ColorlessSticker & {
    color: Colors
};

export type ColorlessCubelet = {
    stickers: ColorlessSticker[]
}

export type Cubelet = {
    stickers: Sticker[]
}

export class RubiksCube {
    private readonly configuration: BitView[];
    private readonly dimension: number;
    private readonly faceRotator: RubiksCubeFaceRotator;
    private readonly cubelets: ColorlessCubelet[];
    private hash?: string;

    public constructor(dimension: number, config?: { clone?: ArrayBuffer[], colorMap?: Map<Colors, Sides> }) {
        this.dimension = dimension;
        if (config?.clone) {
            this.configuration = config.clone
                .map(config => new BitView(config.slice(0)));
        } else {
            const stickersPerSide = this.dimension * this.dimension;
            const colorMap = config?.colorMap || defaultColorMap;
            const numOfBytes = Math.ceil(stickersPerSide * 6 * 0.125); //muliplied by number of sides divided by number of bits per byte
            this.configuration = Array.from(new Array(3))
                .map(() => new BitView(new ArrayBuffer(numOfBytes)));

            getAllColors()
                .forEach(color => {
                    const side = colorMap.get(color)!;
                    const fullBitsValue = (1 << stickersPerSide) - 1;
                    const value0 = (color & 0b1) > 0b0 ? fullBitsValue : 0b0000;
                    const value1 = (color & 0b10) > 0b0 ? fullBitsValue : 0b0000;
                    const value2 = (color & 0b100) > 0b0 ? fullBitsValue : 0b0000;
                    this.configuration[0].setBits(side * stickersPerSide, value0, stickersPerSide);
                    this.configuration[1].setBits(side * stickersPerSide, value1, stickersPerSide);
                    this.configuration[2].setBits(side * stickersPerSide, value2, stickersPerSide);
                });
        }

        this.faceRotator = new RubiksCubeFaceRotator(this.dimension);
        this.cubelets = new CubeletsCreator(this.dimension).create();
        this.updateHash();
    }


    public clone(): RubiksCube {
        return new RubiksCube(this.dimension, { clone: this.configuration.map(config => config.buffer) });
    }

    public getDimension(): number {
        return this.dimension;
    }

    public getConfiguration(): ArrayBuffer[] {
        return this.configuration
            .map(config => config.buffer);
    }

    private updateHash(): void {
        this.hash = this.configuration
            .map(config => Buffer.from(config.buffer).toString('base64'))
            .join('.');
    }

    public getHash(): string {
        const newHash = this.configuration
            .map(config => Buffer.from(config.buffer).toString('base64'))
            .join('.');
        return newHash;
    }

    public translateCubeBits(): string {
        let text = getAllSides()
            .map(side => (Sides[side] + new Array(10).fill(' ').join('')).substring(0, 6))
            .join('')
            .concat('\n');

        const spacing = '-'.repeat(this.dimension * this.dimension)
            .concat('  ')
            .repeat(6)
            .concat('\n')

        text += spacing;
        this.configuration
            .map(config => {
                const bytes = new Uint8Array(config.buffer).slice(0); //clones it
                text += bytes
                    .reverse()
                    .reduce((str, byte) => str + byte.toString(2).padStart(8, '0'), '')
                    .match(new RegExp(`.{1,${this.dimension * this.dimension}}`, 'g'))!
                    .reverse()
                    .join("  ")
                    .concat('\n');
            });
        text += spacing;
        text += Array.from(new Array(this.dimension * this.dimension * 6))
            .map((_, index) => Colors[this.getColorOfIndex(index)].substring(0, 1))
            .join('')
            .match(new RegExp(`.{1,${this.dimension * this.dimension}}`, 'g'))!
            .join("  ")
            .concat('\n');
        return text;
    }

    public isSolved(): boolean {
        const stickersPerSide = this.dimension * this.dimension;
        const sides = getAllSides();
        const stickersArray = Array.from(new Array(stickersPerSide));
        return sides
            .every((_, sideIndex) => stickersArray
                .every((_, index) => this.getColorOfIndex(sideIndex * stickersPerSide + index) === this.getColorOfIndex(sideIndex * stickersPerSide)))
    }

    public rotateFace(faceRotation: FaceRotation): RubiksCube {
        const result = this.faceRotator.rotate(this, faceRotation);
        result.updateHash();
        return result;
    }

    public getAllCubelets(): Cubelet[] {
        return this.addColorToCubelets(this.cubelets);
    }

    public getCubeletsBySides(...sides: Sides[]): Cubelet[] {
        const found = this.cubelets
            .filter(cubelet => cubelet.stickers
                .every(sticker => sides.includes(sticker.side)));
        return this.addColorToCubelets(found);
    }

    public getCubeletsByColor(...colors: Colors[]): Cubelet[] {
        const found = this.cubelets
            .filter(cubelet => cubelet.stickers
                .every(sticker => colors.includes(this.getColorOfIndex(sticker.id)!)));
        return this.addColorToCubelets(found);
    }

    public getColorOfIndex(index: number): Colors {
        return this.configuration
            .reduce((acc, config, i) => acc | (config.getBits(index, 1) << i), 0b0)
            .valueOf();
    }

    public setColorOfIndex(index: number, color: Colors): void {
        const value0 = (color & 0b1) > 0b0 ? 0b1 : 0b0
        const value1 = (color & 0b10) > 0b0 ? 0b1 : 0b0000;
        const value2 = (color & 0b100) > 0b0 ? 0b1 : 0b0000;

        this.configuration[0].setBits(index, value0, 1);
        this.configuration[1].setBits(index, value1, 1);
        this.configuration[2].setBits(index, value2, 1);
    }

    private addColorToCubelets(colorless: ColorlessCubelet[]): Cubelet[] {
        return colorless
            .map(cubelet => ({
                stickers: cubelet.stickers
                    .map(sticker => ({
                        ...sticker,
                        color: this.getColorOfIndex(sticker.id)!,
                    }))
            }))
    }

}