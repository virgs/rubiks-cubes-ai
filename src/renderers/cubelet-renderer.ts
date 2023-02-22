import {
    Mesh, MeshStandardMaterial, Material, Vector3
} from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry";
import { Sides } from "@/constants/sides";
import { mapColorsToHex } from "@/constants/colors";
import type { Cubelet } from "@/engine/rubiks-cube";

type Config = {
    sideSize: number;
    cubelet: Cubelet;
    cubeDimension: number;
};

export class CubeletRenderer {
    private static readonly stickerlessColor = 0x0A1B2C;
    private static readonly gap: number = .05;
    private readonly cubeletMesh: Mesh;

    public constructor(config: Config) {
        const size = config.sideSize - CubeletRenderer.gap;
        const geometry = new RoundedBoxGeometry(size, size, size, 3, 0.1);
        let position: Vector3 = this.getPositionFromCubelet(config);
        position.subScalar((config.cubeDimension - 1) * .5);
        position.multiplyScalar(config.sideSize);
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

    private getPositionFromCubelet(config: Config): Vector3 {
        let x = 0;
        let y = 0;
        let z = 0;
        const sticker = config.cubelet.stickers[2];
        switch (sticker.side) {
            case Sides.UP:
                y = config.cubeDimension - 1;
                x = sticker.x;
                z = sticker.y;
                break;
            case Sides.DOWN:
                y = 0;
                x = sticker.x
                z = config.cubeDimension - 1 - sticker.y;
                break;
            case Sides.RIGHT:
                x = config.cubeDimension - 1;
                y = config.cubeDimension - 1 - sticker.y;
                z = config.cubeDimension - 1 - sticker.x;
                break;
            case Sides.LEFT:
                x = 0
                y = config.cubeDimension - 1 - sticker.y;
                z = sticker.x;
                break;
            case Sides.FRONT:
                z = config.cubeDimension - 1;
                x = sticker.x;
                y = config.cubeDimension - 1 - sticker.y;
                break;
            case Sides.BACK:
                z = 0;
                x = config.cubeDimension - 1 - sticker.x;
                y = config.cubeDimension - 1 - sticker.y;
                break;
        }
        return new Vector3(x, y, z);
    }
}
