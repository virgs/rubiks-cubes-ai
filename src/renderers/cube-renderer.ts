import type { PocketCube } from "@/engine/pocket-cube";
import { BoxGeometry, Mesh, MeshStandardMaterial, Vector3 } from "three";

export class CubeRenderer {
    private static readonly angularSpeed: number = Math.PI * 0.001;
    private static readonly cubeletSize: number = 1;
    private readonly cube: Mesh;
    private readonly dimension: number;

    public constructor(cube: PocketCube) {
        this.cube = new Mesh();
        this.dimension = cube.getDimension()
        Array.from(new Array(this.dimension))
            .forEach((_, x) => Array.from(new Array(this.dimension))
                .forEach((_, y) => Array.from(new Array(this.dimension))
                    .forEach((_, z) => {
                        // create a geometry
                        const geometry = new BoxGeometry(CubeRenderer.cubeletSize, CubeRenderer.cubeletSize, CubeRenderer.cubeletSize);
                        // create a default (white) Basic material
                        const material = new MeshStandardMaterial({ color: 'purple' });
                        // create a Mesh containing the geometry and material
                        const cubelet = new Mesh(geometry, material)
                        cubelet.position.x = CubeRenderer.cubeletSize * (x - 0.5);
                        cubelet.position.y = CubeRenderer.cubeletSize * (y - 0.5);
                        cubelet.position.z = CubeRenderer.cubeletSize * (z - 0.5);

                        this.cube.add(cubelet);

                    })));
        this.cube.rotateOnAxis(new Vector3(1,1,1).normalize(), Math.PI)
    }

    public getMesh(): Mesh {
        return this.cube;
    }

    public update(delta: number): void {
        this.cube.rotateOnAxis(new Vector3(1, 0, 0).normalize(), delta * CubeRenderer.angularSpeed);
        this.cube.updateMatrix()
    }

}