import { BoxGeometry, EdgesGeometry, LineBasicMaterial, LineSegments, Mesh, MeshStandardMaterial, Object3D, Shape, Vector3 } from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import { Sides } from "@/engine/sides";
import { getInitialColorOfSide } from "@/engine/pocket-cube";
import { Colors, getAllColors } from "@/engine/colors";


export class CubeletRenderer {
    private readonly cubeletMesh: Mesh;
    public constructor(config: { sideSize: number, position: Vector3, id: number, sides: Sides[] }) {
        // const geometry = new BoxGeometry(config.sideSize, config.sideSize, config.sideSize);
        const geometry = new RoundedBoxGeometry(config.sideSize, config.sideSize, config.sideSize, 5, 0.1);
        
        // console.log(config.sides.map(side => getInitialColorOfSide(side)))
        const material = new MeshStandardMaterial({
            color: Colors[Math.floor(Math.random()*getAllColors().length)],
            roughness: 1,
            flatShading: true,
            // transparent: true,
            // opacity: 0.9,
        });
        this.cubeletMesh = new Mesh(geometry, material)

        const lineEdges = new EdgesGeometry(geometry);
        const lineMaterial = new LineBasicMaterial({ color: '#FF00FF', linewidth: 100, fog: true });
        const lineMesh = new LineSegments(lineEdges, lineMaterial);

        // this.cubeletMesh.add(lineMesh);
        this.cubeletMesh.position.set(config.position.x, config.position.y, config.position.z);
        this.cubeletMesh.userData.id = config.id;
    }

    public getMesh(): Object3D {
        return this.cubeletMesh;
    }

}