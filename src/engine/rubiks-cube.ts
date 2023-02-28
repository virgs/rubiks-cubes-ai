import { getAllSides, Sides } from '@/constants/sides';
import { defaultColorMap, type Cubelet, type Cube, type ColorlessCubelet } from './cube';
import type { FaceRotation } from './face-rotation';
import { Colors, getAllColors } from '@/constants/colors';
import { CubeletsCreator } from './cubelets-creator';
import { RubiksCubeFaceRotator } from './rubiks-cube-face-rotator';

export class RubiksCube implements Cube {
    private readonly hash: string;
    private readonly configuration: bigint[];
    private readonly dimension: number;
    private readonly faceRotator: RubiksCubeFaceRotator;
    private readonly cubelets: ColorlessCubelet[];

    public constructor(dimension: number, config?: { clone?: bigint[], colorMap?: Map<Colors, Sides> }) {
        this.dimension = dimension;
        if (config?.clone) {
            this.configuration = [...config.clone];
        } else {
            const colorMap = config?.colorMap || defaultColorMap;
            this.configuration = getAllColors()
                .map(color => {
                    const side = BigInt(colorMap.get(color)!);
                    const fullBits = (1 << (this.dimension * this.dimension)) - 1; //dimension 2: 1111, dimension 3: 111111111 and so on...
                    return BigInt(BigInt(fullBits) << (side * BigInt(this.dimension * this.dimension)));
                });
        }
        this.faceRotator = new RubiksCubeFaceRotator(this.dimension);
        this.cubelets = new CubeletsCreator(this.dimension).create();
        this.hash = this.configuration.join('.');
    }


    public clone(): RubiksCube {
        return new RubiksCube(this.dimension, { clone: this.configuration });
    }

    public getDimension(): number {
        return this.dimension;
    }

    public getConfiguration(): bigint[] {
        return [...this.configuration];
    }

    public getHash(): string {
        return this.hash;
    }

    // Up    Left  Front Right Back  Down
    // 1111  0000  0000  0000  0000  0000 (<- Yellow)
    // 0000  1111  0000  0000  0000  0000 (<- Orange)
    // 0000  0000  1111  0000  0000  0000 (<- Blue)
    // 0000  0000  0000  1111  0000  0000 (<- Red)
    // 0000  0000  0000  0000  1111  0000 (<- Green)
    // 0000  0000  0000  0000  0000  1111 (<- White)

    public translateCubeBits(): string {
        const stickersPerSide = this.dimension * this.dimension;
        const stickersNumber = stickersPerSide * 6;
        const zeroedBits = Array.from(new Array(stickersNumber)).fill('0').join('');
        const tab = Array.from(new Array(stickersPerSide).fill(' '))
            .join('');
        let text = getAllSides()
            .reduce((acc, side) => acc + Sides[side]
                .concat(tab).substring(0, stickersPerSide + 2), '')

        this.configuration
            .forEach((color, index) => {
                const sideText = (zeroedBits + color.toString(2)).
                    slice(-stickersNumber)
                    .split('')
                    .reverse()
                    .join('')
                const parts = sideText
                    .match(new RegExp(`.{${stickersPerSide}}`, 'g'))!
                    .join("  ");

                text += '\n' + parts + ' (<- ' + Colors[index] + ')';
            })
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
        return new RubiksCube(this.dimension, { clone: result });
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

    private getColorOfIndex(index: number): Colors | undefined {
        let counter = 0;
        for (let color of this.configuration) {
            if (color & BigInt(1n << BigInt(index))) {
                return counter;
            }
            ++counter;
        }
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