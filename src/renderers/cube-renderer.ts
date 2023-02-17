import type { PocketCube } from "@/engine/pocket-cube";
import {
    BoxGeometry, EdgesGeometry, Group, LineBasicMaterial,
    LineSegments, MathUtils, Mesh, MeshStandardMaterial, Scene, Vector3
} from "three";
//https://github.com/tweenjs/tween.js/blob/main/docs/user_guide.md
import * as Tween from '@tweenjs/tween.js'
import type { FaceRotation } from "@/engine/face-rotation";
import { Sides } from "@/engine/sides";
import { CubeletRenderer } from "./cubelet-renderer";

type RotationTween = {
    rotation: number
}

//https://github.com/SuboptimalEng/gamedex/blob/19b0466ad30ef0fb6c760eb78f74e6cf64fa1a73/08-rubiks-cube/src/lib/Cube.js
export class CubeRenderer {
    private static readonly cubeletSide: number = 1;
    private static readonly cubeletFilling: number = .95;
    private static readonly animatioDuration: number = 2500;
    private readonly rubiksCubeGroup: Group;
    private readonly scene: Scene;

    private readonly dimension: number;
    private animation?: Tween.Tween;

    public constructor(config: { cube: PocketCube, scene: Scene }) {
        this.rubiksCubeGroup = new Group();
        this.scene = config.scene;
        this.dimension = config.cube.getDimension()

        let id = 0;
        Array.from(new Array(this.dimension))
            .forEach((_, xIndex) => Array.from(new Array(this.dimension))
                .forEach((_, yIndex) => Array.from(new Array(this.dimension))
                    .forEach((_, zIndex) => {
                        if (xIndex === 0 || xIndex === this.dimension - 1 || yIndex === 0 || yIndex === this.dimension - 1 || zIndex === 0 || zIndex === this.dimension - 1) {
                            const side = CubeRenderer.cubeletFilling * CubeRenderer.cubeletSide;
                            // const x = CubeRenderer.cubeletSide *(1+xIndex- this.dimension*0.5);
                            const x = xIndex - (this.dimension / 2) * CubeRenderer.cubeletSide + CubeRenderer.cubeletSide / 2;
                            const y = yIndex - (this.dimension / 2) * CubeRenderer.cubeletSide + CubeRenderer.cubeletSide / 2;
                            const z = zIndex - (this.dimension / 2) * CubeRenderer.cubeletSide + CubeRenderer.cubeletSide / 2;

                            //2 => 0: -0.5, 1: 0.5
                            //3 => 0: -1.0, 1: 0.0,  2: 1.0
                            //4 => 0: -1.5, 1: -0.5, 2: 0.5, 3: 1.5
                            //5 => 0: -2.0, 1: -1.0, 2: 0.0, 3: 1.0, 4: 2.0

                            const position = new Vector3(x, y, z);
                            const cubelet = new CubeletRenderer({ sideLength: side, position, id: id++ })
                            this.rubiksCubeGroup.add(cubelet.getMesh())
                        }
                    })));
        this.scene.add(this.rubiksCubeGroup);
    }

    public getCube(): Group {
        return this.rubiksCubeGroup;
    }

    public async rotate(faceRotation: FaceRotation & {duration: number}): Promise<void> {
        let sortFunction = (a, b) => b - a;
        let targetAngle = (Math.PI / 2) * (faceRotation.clockwiseDirection ? -1 : 1)

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
        console.log(`${Sides[faceRotation.side].substring(0, 1)}${faceRotation.clockwiseDirection ? '' : '\''}${faceRotation.layer}`);

        const axis = new Vector3(0, 0, 0);
        axis[axisName] = 1;

        const rotationGroup = new Group();
        const cubeletsByPosition = Array.from(this.rubiksCubeGroup.children)
            .map(child => child as Mesh)
            .reduce((acc, item) => {
                if (acc[item.position[axisName]]) {
                    acc[item.position[axisName]].push(item)
                } else {
                    acc[item.position[axisName]] = [item]
                }
                acc.positions.push(item.position[axisName]);
                return acc
            }, { positions: [] } as any);
        cubeletsByPosition.positions = [...new Set(cubeletsByPosition.positions)]
            .sort((first: Mesh, second: Mesh) => sortFunction(first, second));
        const layerPosition = cubeletsByPosition.positions[faceRotation.layer];
        const cubesToRotate = cubeletsByPosition[layerPosition];

        cubesToRotate
            .forEach(cubelet => rotationGroup.add(cubelet));
        this.scene.add(rotationGroup);

        rotationGroup.setRotationFromEuler(this.rubiksCubeGroup.rotation.clone());

        const start: RotationTween = { rotation: 0 };
        const prev: RotationTween = { rotation: 0 };
        const end: RotationTween = { rotation: targetAngle };

        return new Promise((resolve) => {
            this.animation = new Tween.Tween(start)
                .to(end, faceRotation.duration !== undefined ? faceRotation.duration : CubeRenderer.animatioDuration)
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