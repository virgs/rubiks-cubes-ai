import type { Colors } from '@/constants/colors';
import { Sides } from '@/constants/sides';
import type { FaceRotation } from './face-rotation';
import type { RubiksCube } from './rubiks-cube';

type FaceRotatorMap = {
    destination: number,
    source: number
};

type StickerLocator =
    {
        side: Sides,
        x: number,
        y: number
    }

type FaceStickerRotatorMap = {
    source: StickerLocator;
    destination: StickerLocator;
};


export class RubiksCubeFaceRotator {
    //dimension, layer, side
    private static faceRotatorMap: Map<number, Map<number, Map<Sides, FaceRotatorMap[]>>> = new Map();
    private readonly dimension: number;

    public constructor(dimension: number) {
        this.dimension = dimension;
        if (!RubiksCubeFaceRotator.faceRotatorMap.has(this.dimension)) {
            const layerMap = new Map();
            for (let layer = 0; layer < this.dimension; ++layer) {
                const upFaceRotator: FaceStickerRotatorMap[] = this.createUpFaceClockwiseRotator(layer);
                const leftFaceRotator: FaceStickerRotatorMap[] = this.createLeftFaceClockwiseRotator(layer);
                const frontFaceRotator: FaceStickerRotatorMap[] = this.createFrontFaceClockwiseRotator(layer);
                const rightFaceRotator: FaceStickerRotatorMap[] = this.createRightFaceClockwiseRotator(layer);
                const backFaceRotator: FaceStickerRotatorMap[] = this.createBackFaceClockwiseRotator(layer);
                const downFaceRotator: FaceStickerRotatorMap[] = this.createDownFaceClockwiseRotator(layer);

                const faceRotatorMap: Map<Sides, FaceRotatorMap[]> = new Map();

                faceRotatorMap.set(Sides.UP, upFaceRotator.map((item) => this.faceStickerMapper(item)));
                faceRotatorMap.set(Sides.LEFT, leftFaceRotator.map((item) => this.faceStickerMapper(item)));
                faceRotatorMap.set(Sides.FRONT, frontFaceRotator.map((item) => this.faceStickerMapper(item)));
                faceRotatorMap.set(Sides.RIGHT, rightFaceRotator.map((item) => this.faceStickerMapper(item)));
                faceRotatorMap.set(Sides.BACK, backFaceRotator.map((item) => this.faceStickerMapper(item)));
                faceRotatorMap.set(Sides.DOWN, downFaceRotator.map((item) => this.faceStickerMapper(item)));

                layerMap.set(layer, faceRotatorMap);
            }
            RubiksCubeFaceRotator.faceRotatorMap.set(this.dimension, layerMap);
        }

    }

    public rotate(originalCube: RubiksCube, faceRotation: FaceRotation): bigint[] {
        const original = originalCube.getConfiguration();
        const clone = [...original];
        RubiksCubeFaceRotator.faceRotatorMap
            .get(this.dimension)!
            .get(faceRotation.layer || 0)!
            .get(faceRotation.side)!
            .forEach(item => {
                if (faceRotation.counterClockwiseDirection) {
                    RubiksCubeFaceRotator.setColorOfIndex(clone, item.source,
                        RubiksCubeFaceRotator.getColorOfIndex(original, item.destination)!);
                } else {
                    RubiksCubeFaceRotator.setColorOfIndex(clone, item.destination,
                        RubiksCubeFaceRotator.getColorOfIndex(original, item.source)!);
                }
            })
        return clone;
    }


    private static setColorOfIndex(configuration: bigint[], index: number, color: number): void {
        configuration
            .forEach((_, i, config) => {
                if (i === color) {
                    config[i] |= BigInt(1n << BigInt(index)); // sets color bit to 1
                } else {
                    config[i] &= BigInt(-1n ^ (1n << BigInt(index))); //sets bit of every other color to 0
                }
            })
    }

    private static getColorOfIndex(configuration: bigint[], index: number): Colors | undefined {
        let counter = 0;
        for (let color of configuration) {
            if (color & BigInt(1n << BigInt(index))) {
                return counter;
            }
            ++counter;
        }
    }

    private idMapper(item: StickerLocator): number {
        let sourceOffset = item.side * this.dimension * this.dimension
        sourceOffset += this.dimension * item.y;
        sourceOffset += item.x;
        return sourceOffset;
    }

    private faceStickerMapper(item: FaceStickerRotatorMap): FaceRotatorMap {
        return {
            source: this.idMapper(item.source),
            destination: this.idMapper(item.destination)
        }
    };

    private createSideLidClockwiseRotator(side: Sides): FaceStickerRotatorMap[] {
        const map = [];
        for (let i = 0; i < this.dimension * this.dimension; ++i) {
            const pivot = Math.floor(this.dimension / 2);
            const x = (i % this.dimension) - pivot;
            const y = Math.floor(i / this.dimension) - pivot;
            //rotation matrix
            const xPrime = -y;
            const yPrime = x;

            map.push({
                source: { side: side, x: x + pivot, y: y + pivot },
                destination: { side: side, x: xPrime + pivot, y: yPrime + pivot }
            });
        }
        return map;
    }

    private createUpFaceClockwiseRotator(layer: number): FaceStickerRotatorMap[] {
        const end = this.dimension - 1;
        const map = [];
        if (layer === 0) {
            map.push(...this.createSideLidClockwiseRotator(Sides.UP));
        }

        for (let i = 0; i < this.dimension; ++i) {
            map.push({ source: { side: Sides.FRONT, x: i, y: layer }, destination: { side: Sides.LEFT, x: i, y: layer } });
            map.push({ source: { side: Sides.LEFT, x: i, y: layer }, destination: { side: Sides.BACK, x: end - i, y: layer } });
            map.push({ source: { side: Sides.BACK, x: end - i, y: layer }, destination: { side: Sides.RIGHT, x: i, y: layer } });
            map.push({ source: { side: Sides.RIGHT, x: i, y: layer }, destination: { side: Sides.FRONT, x: i, y: layer } });
        }
        return map;
    }

    private createLeftFaceClockwiseRotator(layer: number): FaceStickerRotatorMap[] {
        //       UP
        //        0  1
        //        6  5
        // LEFT  FRONT  RIGHT  BACK
        // 4 20  11  8   3 13  16 17
        // 7 21  10  9   2 14  19 18
        //       DOWN
        //       15 12
        //       23 22

        const end = this.dimension - 1;
        const map = [];
        if (layer === 0) {
            map.push(...this.createSideLidClockwiseRotator(Sides.LEFT));
        }
        for (let i = 0; i < this.dimension; ++i) {
            map.push({ source: { side: Sides.FRONT, x: layer, y: i }, destination: { side: Sides.DOWN, x: layer, y: i } });
            map.push({ source: { side: Sides.DOWN, x: layer, y: i }, destination: { side: Sides.BACK, x: end - layer, y: end - i } });
            map.push({ source: { side: Sides.BACK, x: end - layer, y: end - i }, destination: { side: Sides.UP, x: layer, y: i } });
            map.push({ source: { side: Sides.UP, x: layer, y: i }, destination: { side: Sides.FRONT, x: layer, y: i } });
        }
        return map;
    }

    private createFrontFaceClockwiseRotator(layer: number): FaceStickerRotatorMap[] {
        const end = this.dimension - 1;
        const map = [];
        if (layer === 0) {
            map.push(...this.createSideLidClockwiseRotator(Sides.FRONT));
        }
        for (let i = 0; i < this.dimension; ++i) {
            map.push({ source: { side: Sides.UP, x: i, y: end - layer }, destination: { side: Sides.RIGHT, x: layer, y: i } });
            map.push({ source: { side: Sides.RIGHT, x: layer, y: i }, destination: { side: Sides.DOWN, x: end - i, y: layer } });
            map.push({ source: { side: Sides.DOWN, x: end - i, y: layer }, destination: { side: Sides.LEFT, x: end - layer, y: end - i } });
            map.push({ source: { side: Sides.LEFT, x: end - layer, y: end - i }, destination: { side: Sides.UP, x: i, y: end - layer } });
        }
        return map;
    }


    private createRightFaceClockwiseRotator(layer: number): FaceStickerRotatorMap[] {
        const end = this.dimension - 1;
        const map = [];
        if (layer === 0) {
            map.push(...this.createSideLidClockwiseRotator(Sides.RIGHT));
        }
        for (let i = 0; i < this.dimension; ++i) {
            map.push({ source: { side: Sides.UP, x: end - layer, y: i }, destination: { side: Sides.BACK, x: layer, y: end - i } });
            map.push({ source: { side: Sides.BACK, x: layer, y: end - i }, destination: { side: Sides.DOWN, x: end - layer, y: end - i } });
            map.push({ source: { side: Sides.DOWN, x: end - layer, y: end - i }, destination: { side: Sides.FRONT, x: end - layer, y: i } });
            map.push({ source: { side: Sides.FRONT, x: end - layer, y: i }, destination: { side: Sides.UP, x: end - layer, y: i } });
        }
        return map;
    }


    private createBackFaceClockwiseRotator(layer: number): FaceStickerRotatorMap[] {
        const end = this.dimension - 1;
        const map = [];
        if (layer === 0) {
            map.push(...this.createSideLidClockwiseRotator(Sides.BACK));
        }
        for (let i = 0; i < this.dimension; ++i) {
            map.push({ source: { side: Sides.LEFT, x: layer, y: i }, destination: { side: Sides.DOWN, x: i, y: end - layer } });
            map.push({ source: { side: Sides.DOWN, x: i, y: end - layer }, destination: { side: Sides.RIGHT, x: end - layer, y: end - i } });
            map.push({ source: { side: Sides.RIGHT, x: end - layer, y: end - i }, destination: { side: Sides.UP, x: end - i, y: end - layer } });
            map.push({ source: { side: Sides.UP, x: end - i, y: end - layer }, destination: { side: Sides.LEFT, x: layer, y: i } });
        }
        return map;
    }

    private createDownFaceClockwiseRotator(layer: number): FaceStickerRotatorMap[] {
        const end = this.dimension - 1;
        const map = [];
        if (layer === 0) {
            map.push(...this.createSideLidClockwiseRotator(Sides.DOWN));
        }
        for (let i = 0; i < this.dimension; ++i) {
            map.push({ source: { side: Sides.LEFT, x: i, y: end - layer }, destination: { side: Sides.FRONT, x: i, y: end - layer } });
            map.push({ source: { side: Sides.FRONT, x: i, y: end - layer }, destination: { side: Sides.RIGHT, x: i, y: end - layer } });
            map.push({ source: { side: Sides.RIGHT, x: i, y: end - layer }, destination: { side: Sides.BACK, x: end - i, y: end - layer } });
            map.push({ source: { side: Sides.BACK, x: end - i, y: end - layer }, destination: { side: Sides.LEFT, x: i, y: end - layer } });
        }
        return map;

    }
}