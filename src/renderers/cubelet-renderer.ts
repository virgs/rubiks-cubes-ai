import {
    TextureLoader, EdgesGeometry, LineBasicMaterial, LineSegments,
    Mesh, MeshStandardMaterial, Object3D, Vector3, Material, DoubleSide, Texture
} from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry";

import textureFile from "../assets/textures/smooth-stucco-albedo.png"
import textureNormalFile from "../assets/textures/smooth-stucco-Normal-dx.png"

import { Sides } from "@/engine/sides";
import { Colors, getAllColors, mapColorsToHex } from "@/engine/colors";
import { getInitialColorOfSide } from "@/engine/pocket-cube";


export class CubeletRenderer {
    // private static readonly textureLoader = new TextureLoader();
    // private static texture: Texture;
    // private static textureNormal: Texture;

    private readonly cubeletMesh: Mesh;


    public constructor(config: { sideSize: number, position: Vector3, id: number, sides: Sides[] }) {
        // if (!CubeletRenderer.texture) {
        //     CubeletRenderer.texture = CubeletRenderer.textureLoader.load(textureFile);
        //     CubeletRenderer.textureNormal = CubeletRenderer.textureLoader.load(textureNormalFile);
        // }

        const geometry = new RoundedBoxGeometry(config.sideSize, config.sideSize, config.sideSize, 3, 0.1);

        this.cubeletMesh = new Mesh(geometry, this.createMaterial(config.sides))
        this.cubeletMesh.position.set(config.position.x, config.position.y, config.position.z);
        this.cubeletMesh.userData.id = config.id;
    }

    public getMesh(): Mesh {
        return this.cubeletMesh;
    }

    private createMaterial(sides: Sides[]): Material[] {
        return Array.from(new Array(6))
            .map((_, index: number) => {
                const side = this.mapCubeFaceToSide(index)!;
                const material = new MeshStandardMaterial({
                    // map: CubeletRenderer.texture,
                    // normalMap: CubeletRenderer.textureNormal,
                    // color: index === 5 ? mapColorsToHex(index) : 0x220022,
                    color: sides.includes(side) ? mapColorsToHex(getInitialColorOfSide(side)) : 0x0A1B2C,
                    roughness: .1,
                    flatShading: true,
                    transparent: true,
                    side: DoubleSide,
                    // opacity: 0.9
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

}