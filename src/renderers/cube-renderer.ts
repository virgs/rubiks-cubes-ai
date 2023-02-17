import type { PocketCube } from "@/engine/pocket-cube";
import { BoxGeometry, EdgesGeometry, Group, LineBasicMaterial,
     LineSegments, MathUtils, Mesh, MeshStandardMaterial, Scene, Vector3 } from "three";
//https://github.com/tweenjs/tween.js/blob/main/docs/user_guide.md
import * as Tween from '@tweenjs/tween.js'
import type { FaceRotation } from "@/engine/face-rotation";
import { Sides } from "@/engine/sides";

type RotationTween = {
    rotation: number
}

//https://github.com/SuboptimalEng/gamedex/blob/19b0466ad30ef0fb6c760eb78f74e6cf64fa1a73/08-rubiks-cube/src/lib/Cube.js
export class CubeRenderer {
    private static readonly radiansPerSecond: number = MathUtils.degToRad(45);
    private static readonly cubeletSide: number = 1;
    private static readonly cubeletFilling: number = .95;
    private readonly rubiksCubeGroup: Group;
    private readonly scene: Scene;
    // private readonly cube: Mesh;

    private readonly dimension: number;
    private animation?: Tween.Tween;

    public constructor(config: {cube: PocketCube, scene: Scene}) {
        // this.cube = new Mesh();
        this.rubiksCubeGroup = new Group();
        this.scene = config.scene;
        this.dimension = config.cube.getDimension()

        Array.from(new Array(this.dimension))
            .forEach((_, xIndex) => Array.from(new Array(this.dimension))
                .forEach((_, yIndex) => Array.from(new Array(this.dimension))
                    .forEach((_, zIndex) => {
                        const side = CubeRenderer.cubeletFilling * CubeRenderer.cubeletSide;
                        const geometry = new BoxGeometry(side, side, side);
                        const material = new MeshStandardMaterial({
                            color: 'navy',
                            roughness: 1,
                            flatShading: true,
                            transparent: true,
                            opacity: 0.7,
                        });
                        const cubeletMesh = new Mesh(geometry, material)

                        const lineEdges = new EdgesGeometry(geometry);
                        const lineMaterial = new LineBasicMaterial({ color: '#FF00FF', linewidth: 100, fog: true });
                        const lineMesh = new LineSegments(lineEdges, lineMaterial);

                        // const x = CubeRenderer.cubeletSide *(1+xIndex- this.dimension*0.5);
                        const x = xIndex - (this.dimension / 2)*CubeRenderer.cubeletSide + CubeRenderer.cubeletSide/2;
                        const y = yIndex - (this.dimension / 2)*CubeRenderer.cubeletSide + CubeRenderer.cubeletSide/2;
                        const z = zIndex - (this.dimension / 2)*CubeRenderer.cubeletSide + CubeRenderer.cubeletSide/2;

                        //2 => 0: -0.5, 1: 0.5
                        //3 => 0: -1.0, 1: 0.0,  2: 1.0
                        //4 => 0: -1.5, 1: -0.5, 2: 0.5, 3: 1.5
                        //5 => 0: -2.0, 1: -1.0, 2: 0.0, 3: 1.0, 4: 2.0

                        const cubeletGroup = new Group();
                        cubeletGroup.add(cubeletMesh)
                        cubeletMesh.add(lineMesh);
                        cubeletGroup.position.x = x;
                        cubeletGroup.position.y = y;
                        cubeletGroup.position.z = z;
                        this.rubiksCubeGroup.add(cubeletGroup)
                    })));
        this.scene.add(this.rubiksCubeGroup);
    }

    public getCube(): Group {
        return this.rubiksCubeGroup;
    }

    public async rotate(faceRotation: FaceRotation): Promise<void> {
        let sortFunction = (a, b) => b - a;
        let targetAngle = (Math.PI / 2) * (faceRotation.clockwiseDirection? -1 : 1 )

        let axisName = 'y'
        if (faceRotation.side === Sides.BACK || faceRotation.side === Sides.DOWN || faceRotation.side === Sides.LEFT) {
            sortFunction = (a, b) => a - b;
            targetAngle *= -1;
        }
        if (faceRotation.side === Sides.BACK || faceRotation.side === Sides.FRONT) {
            axisName = 'z'
        } else if (faceRotation.side === Sides.RIGHT || faceRotation.side === Sides.LEFT) {
            axisName = 'x'
        }

        const axis = new Vector3(0,0,0);
        axis[axisName] = 1;

        return new Promise((resolve) => {
            const rotationGroup = new Group();
            Array.from(this.rubiksCubeGroup.children)
                .map(child => child as Mesh)
                .sort((first: Mesh, second: Mesh) => sortFunction(first.position[axisName], second.position[axisName]))
                .filter((_, index) => index < this.dimension * this.dimension)
                .forEach(cubelet => rotationGroup.add(cubelet));
            console.log(rotationGroup.children.length, this.rubiksCubeGroup.children.length);
            this.scene.add(rotationGroup);
            rotationGroup.setRotationFromEuler(this.rubiksCubeGroup.rotation.clone());
    
            const start: RotationTween = { rotation: 0 };
            const prev: RotationTween = { rotation: 0 };
            const end: RotationTween = { rotation: targetAngle};
    
            this.animation = new Tween.Tween(start)
              .to(end, faceRotation.duration)
              .easing(Tween.Easing.Quadratic.InOut)
              .onUpdate((item: RotationTween) => {
                rotationGroup.position.applyAxisAngle(axis, item.rotation - prev.rotation);
                rotationGroup.rotateOnWorldAxis(axis, item.rotation - prev.rotation);   
                prev.rotation = item.rotation;
                rotationGroup.updateMatrixWorld();
              })
              .onComplete(() => {
                this.rubiksCubeGroup.add(...rotationGroup.children)
                this.scene.remove(rotationGroup);
                this.animation = undefined;
                resolve();
              })
              .start();
        });
    }
}