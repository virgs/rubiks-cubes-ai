import {
    TextureLoader, EdgesGeometry, LineBasicMaterial, LineSegments,
    Mesh, MeshStandardMaterial, Object3D, Vector3, Material, DoubleSide, Texture
} from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry";

import textureFile from "../assets/textures/smooth-stucco-albedo.png"
import textureNormalFile from "../assets/textures/smooth-stucco-Normal-dx.png"

import type { Sides } from "@/engine/sides";
import { Colors, getAllColors, mapColorsToHex } from "@/engine/colors";


export class CubeletRenderer {
    private static readonly textureLoader = new TextureLoader();
    private static texture: Texture;
    private static textureNormal: Texture;

    private readonly cubeletMesh: Mesh;


    public constructor(config: { sideSize: number, position: Vector3, id: number, sides: Sides[] }) {
        if (!CubeletRenderer.texture) {
            CubeletRenderer.texture = CubeletRenderer.textureLoader.load(textureFile);
            CubeletRenderer.textureNormal = CubeletRenderer.textureLoader.load(textureNormalFile);
        }

        // const geometry = new BoxGeometry(config.sideSize, config.sideSize, config.sideSize);
        const geometry = new RoundedBoxGeometry(config.sideSize, config.sideSize, config.sideSize, 3, 0.1);

        // console.log(config.sides.map(side => getInitialColorOfSide(side)))
        this.cubeletMesh = new Mesh(geometry, this.createMaterial(config.sides))

        // const lineEdges = new EdgesGeometry(geometry);
        // const lineMaterial = new LineBasicMaterial({ color: '#FF00FF', linewidth: 100, fog: true });
        // const lineMesh = new LineSegments(lineEdges, lineMaterial);

        // this.cubeletMesh.add(lineMesh);
        this.cubeletMesh.position.set(config.position.x, config.position.y, config.position.z);
        this.cubeletMesh.userData.id = config.id;
    }

    public getMesh(): Mesh {
        return this.cubeletMesh;
    }

    private createMaterial(sides: Sides[]): Material[] {
        // texture.center.set(4,4)
        return Array.from(new Array(6))
            .map((_, index: number) => {
            const material = new MeshStandardMaterial({
                map: CubeletRenderer.texture,
                normalMap: CubeletRenderer.textureNormal,
                color: mapColorsToHex(index),
                roughness: .01,
                flatShading: true,
                transparent: true,
                side: DoubleSide,
                // opacity: 0.9
            });
            return material;
        })

    }

}