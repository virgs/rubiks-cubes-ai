import {
    Mesh, MeshStandardMaterial, Material, DoubleSide, Vector3, ConeGeometry
} from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry";
import { Sides } from "@/constants/sides";
import { Colors, mapColorsToHex } from "@/constants/colors";
import type { Cubelet } from "@/engine/rubiks-cube";

type Config = {
    sideSize: number;
    cubelet: Cubelet;
    cubeDimension: number;
};

export class CubeletRenderer {
    private static readonly stickerlessColor = 0x0A1B2C;
    private static readonly gap: number = .01;
    private readonly cubeletMesh: Mesh;

    public constructor(config: Config) {
        const size = config.sideSize - CubeletRenderer.gap;
        const geometry = new RoundedBoxGeometry(size, size, size, 3, 0.1);
        const position: Vector3 = this.getPositionFromCubelet(config);
        this.cubeletMesh = new Mesh(geometry, this.createMaterial(config.cubelet))
        this.cubeletMesh.position.set(position.x, position.y, position.z);
    }
    public getMesh(): Mesh {
        return this.cubeletMesh;
    }

    private createMaterial(cubelet: Cubelet): Material[] {
        return Array.from(new Array(6))
            .map((_, index: number) => {
                const side = this.mapCubeFaceToSide(index)!;
                const sticker = cubelet.stickers
                    .find(sticker => sticker.side === side);
                const material = new MeshStandardMaterial({
                    color: sticker ? mapColorsToHex(sticker.color) : CubeletRenderer.stickerlessColor,
                    // roughness: 10,
                    // flatShading: true,
                    // transparent: true,
                    // side: DoubleSide,
                });
                return material;
            })
    }

    private mapCubeFaceToSide(faceIndex: number): Sides | undefined {
        switch (faceIndex) {
            case 0: return Sides.RIGHT;
            case 1: return Sides.LEFT;
            case 2: return Sides.UP;
            case 3: return Sides.DOWN;
            case 4: return Sides.FRONT;
            case 5: return Sides.BACK;
        }
    }

    // [{ side: Sides.FRONT, id: 8 }, { side: Sides.LEFT, id: 5 }, { side: Sides.UP, id: 3 }],
    // [{ side: Sides.FRONT, id: 9 }, { side: Sides.RIGHT, id: 12 }, { side: Sides.UP, id: 2 }],
    // [{ side: Sides.FRONT, id: 10 }, { side: Sides.LEFT, id: 6 }, { side: Sides.DOWN, id: 20 }],
    // [{ side: Sides.FRONT, id: 11 }, { side: Sides.RIGHT, id: 15 }, { side: Sides.DOWN, id: 21 }],

    // [{ side: Sides.BACK, id: 16 }, { side: Sides.RIGHT, id: 13 }, { side: Sides.UP, id: 1 }],
    // [{ side: Sides.BACK, id: 17 }, { side: Sides.LEFT, id: 4 }, { side: Sides.UP, id: 0 }],
    // [{ side: Sides.BACK, id: 19 }, { side: Sides.RIGHT, id: 14 }, { side: Sides.DOWN, id: 22 }],
    // [{ side: Sides.BACK, id: 23 }, { side: Sides.LEFT, id: 7 }, { side: Sides.DOWN, id: 18 }],


    private getPositionFromCubelet(config: Config): Vector3 {
        const position = new Vector3();
        console.log('---')
        config.cubelet.stickers
            .map(sticker => {
                console.log(Sides[sticker.side], Colors[sticker.color], sticker.x, sticker.y)
            })
        const sticker = config.cubelet.stickers[0];
        switch (sticker.side) {
            // case Sides.UP:
            //     position.y = (config.cubeDimension - 0) * config.sideSize;
            //     position.x = sticker.x * config.sideSize;
            //     position.z = sticker.y * config.sideSize;
            //     break;
            // case Sides.DOWN:
            //     position.y = (config.cubeDimension - config.cubeDimension) * config.sideSize;
            //     position.x = sticker.x * config.sideSize;
            //     position.z = (config.cubeDimension - sticker.y) * config.sideSize;
            //     break;
            // case Sides.RIGHT:
            //     position.x = (config.cubeDimension - 0) * config.sideSize;
            //     position.y = (sticker.y) * config.sideSize;
            //     position.z = (config.cubeDimension - sticker.x) * config.sideSize;
            //     break;
            // case Sides.LEFT:
            //     position.x = (config.cubeDimension - config.cubeDimension) * config.sideSize;
            //     position.y = (sticker.y) * config.sideSize;
            //     position.z = sticker.x * config.sideSize;
            //     break;
            case Sides.FRONT:
                position.z = (config.cubeDimension - 1) * config.sideSize;
                position.x = sticker.x * config.sideSize;
                position.y = (config.cubeDimension - sticker.y) * config.sideSize;
                break;
            case Sides.BACK:
                position.z = (config.cubeDimension - config.cubeDimension) * config.sideSize;
                position.x = (config.cubeDimension - sticker.x - 1) * config.sideSize;
                position.y = (config.cubeDimension - sticker.y) * config.sideSize;
                break;
        }
console.log(sticker, position)
        return position.subScalar(config.cubeDimension * config.sideSize * .5);
    }
}
