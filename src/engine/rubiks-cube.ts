import { getAllSides, Sides } from '@/constants/sides';
import type { FaceRotation } from './face-rotation';
import { Colors, mapColorInitialsToString, mapStringInitialToColor } from '@/constants/colors';
import { CubeletsCreator } from './cubelets-creator';
import { RubiksCubeFaceRotator } from './rubiks-cube-face-rotator';


export const defaultColorMap: Map<Sides, Colors> = new Map();
defaultColorMap.set(Sides.FRONT, Colors.BLUE);
defaultColorMap.set(Sides.UP, Colors.YELLOW);
defaultColorMap.set(Sides.RIGHT, Colors.RED);
defaultColorMap.set(Sides.LEFT, Colors.ORANGE);
defaultColorMap.set(Sides.BACK, Colors.GREEN);
defaultColorMap.set(Sides.DOWN, Colors.WHITE);

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

export type ColorPermutation = {
    index: number,
    color: Colors
};

export class RubiksCube {
    private configuration: string;
    private readonly dimension: number;
    private readonly faceRotator: RubiksCubeFaceRotator;
    private readonly cubelets: ColorlessCubelet[];

    public constructor(config?: { clone?: string, colorMap?: Map<Sides, Colors>, dimension?: number }) {
        this.dimension = config?.dimension!;
        if (config?.clone) {
            this.dimension = Math.sqrt(config.clone.length / 6);
            this.configuration = config.clone.slice();
        } else {
            const stickersPerSide = this.dimension * this.dimension;
            const colorMap = config?.colorMap || defaultColorMap;
            const allSides = getAllSides();
            this.configuration = '';
            for (let side = 0; side < allSides.length; ++side) {
                const color = colorMap.get(side)!;
                const initial = mapColorInitialsToString(color);
                this.configuration += initial.repeat(stickersPerSide);
            }
        }
        this.faceRotator = new RubiksCubeFaceRotator(this.dimension);
        this.cubelets = new CubeletsCreator(this.dimension).create();
    }


    public clone(): RubiksCube {
        return new RubiksCube({ clone: this.configuration });
    }

    public getDimension(): number {
        return this.dimension;
    }

    public getConfiguration(): string {
        return this.configuration;
    }

    public getHash(): string {
        return this.configuration;
    }

    public translateCubeBits(): string {
        return this.configuration;
    }
    //     const stickersPerSide = this.dimension * this.dimension;
    //     let text = getAllSides()
    //         .map(side => (Sides[side] + new Array(stickersPerSide + 5).fill(' ').join('')).substring(0, stickersPerSide + 2))
    //         .join('')
    //         .concat('\n');

    //     const spacing = '-'.repeat(stickersPerSide)
    //         .concat('  ')
    //         .repeat(6)
    //         .concat('\n')

    //     text += spacing;
    //     this.configuration
    //         .forEach(config => {
    //             const bytes = new Uint8Array(config.buffer).slice(0); //clones it
    //             text += bytes
    //                 .reverse()
    //                 .reduce((str, byte) => str + byte.toString(2).padStart(8, '0'), '')
    //                 .split('').reverse().join('')
    //                 .match(new RegExp(`.{${stickersPerSide}}`, 'g'))!
    //                 .join('  ')
    //                 .concat('\n');
    //         });
    //     text += spacing;
    //     text += Array.from(new Array(stickersPerSide * 6))
    //         .map((_, index) => Colors[this.getColorOfIndex(index)].substring(0, 1))
    //         .join('')
    //         .match(new RegExp(`.{1,${stickersPerSide}}`, 'g'))!
    //         .join('  ')
    //         .concat('\n');
    //     return text;
    // }

    public isSolved(): boolean {
        const stickersPerSide = this.dimension * this.dimension;
        const sides = getAllSides();
        const stickersArray = Array.from(new Array(stickersPerSide));
        return sides
            .every((_, sideIndex) => stickersArray
                .every((_, index) => this.configuration[sideIndex * stickersPerSide + index] === this.configuration[sideIndex * stickersPerSide]))
    }

    public rotateFace(faceRotation: FaceRotation): RubiksCube {
        return this.faceRotator.rotate(this, faceRotation);
    }

    public getAllCubelets(): Cubelet[] {
        return this.addColorToCubelets(this.cubelets);
    }

    public getAllColorlessCubelets(): ColorlessCubelet[] {
        return this.cubelets;
    }

    public getCubeletsBySides(...sides: Sides[]): Cubelet[] {
        const found = this.cubelets
            .filter(cubelet => cubelet.stickers
                .every(sticker => sides.includes(sticker.side)));
        return this.addColorToCubelets(found);
    }

    public getCubeletsByColor(...colors: Colors[]): Cubelet[] {
        const found = this.cubelets
            .filter(cubelet => cubelet
                .stickers
                .every(sticker => colors
                    .includes(mapStringInitialToColor(this.configuration[sticker.id]))));
        return this.addColorToCubelets(found);
    }

    public getColorOfIndex(index: number): Colors {
        return mapStringInitialToColor(this.configuration[index])!;
    }

    public setColorsOfIndexes(permutations: ColorPermutation[]): void {
        const temp = this.configuration.split('');
        permutations
            .forEach(permutation => {
                temp[permutation.index] = mapColorInitialsToString(permutation.color);
            })
        this.configuration = temp.join('');
    }

    private addColorToCubelets(colorless: ColorlessCubelet[]): Cubelet[] {
        return colorless
            .map(cubelet => ({
                stickers: cubelet.stickers
                    .map(sticker => ({
                        ...sticker,
                        color: mapStringInitialToColor(this.configuration[sticker.id]),
                    }))
            }))
    }

}