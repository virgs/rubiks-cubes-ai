import { BoxGeometry, EdgesGeometry, Group, LineBasicMaterial, LineSegments, Mesh, MeshStandardMaterial, Object3D, Vector3 } from "three";

export class CubeletRenderer {
    private readonly cubeletMesh: Mesh;
    public constructor(config: { sideLength: number, position: Vector3, id: number }) {
        const geometry = new BoxGeometry(config.sideLength, config.sideLength, config.sideLength);
        const material = new MeshStandardMaterial({
            color: config.id === 7 ? 'navy' : 'orange',
            roughness: 1,
            flatShading: true,
            transparent: true,
            opacity: 0.9,
        });
        this.cubeletMesh = new Mesh(geometry, material)

        const lineEdges = new EdgesGeometry(geometry);
        const lineMaterial = new LineBasicMaterial({ color: '#FF00FF', linewidth: 100, fog: true });
        const lineMesh = new LineSegments(lineEdges, lineMaterial);

        this.cubeletMesh.add(lineMesh);
        this.cubeletMesh.position.set(config.position.x, config.position.y, config.position.z);
        this.cubeletMesh.userData.id = config.id;
    }

    public getMesh(): Object3D {
        return this.cubeletMesh;
    }
}