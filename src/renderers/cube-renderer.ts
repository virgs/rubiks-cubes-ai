import type { PocketCube } from "@/engine/pocket-cube";
import {
    Group, Mesh, Object3D, Scene, Vector3
} from "three";
//https://github.com/tweenjs/tween.js/blob/main/docs/user_guide.md
import * as Tween from '@tweenjs/tween.js'
import type { FaceRotation } from "@/engine/face-rotation";
import { Sides } from "@/engine/sides";
import { CubeletRenderer } from "./cubelet-renderer";

type RotationTween = {
    rotation: number
}

type FaceRotationAnimation = FaceRotation & { duration?: number };

//https://github.com/SuboptimalEng/gamedex/blob/19b0466ad30ef0fb6c760eb78f74e6cf64fa1a73/08-rubiks-cube/src/lib/Cube.js
export class CubeRenderer {
    private static readonly cubeletSide: number = 1;
    private static readonly cubeletFilling: number = .99;
    private static readonly animatioDuration: number = 2500;
    private rubiksCubeGroup: Group;
    private readonly scene: Scene;

    private readonly dimension: number;

    public constructor(config: { cube: PocketCube, scene: Scene, position: Vector3 }) {
        this.rubiksCubeGroup = new Group();
        this.scene = config.scene;
        this.dimension = config.cube.getDimension();

        let id = 0;
        Array.from(new Array(this.dimension))
            .forEach((_, xIndex) => Array.from(new Array(this.dimension))
                .forEach((_, yIndex) => Array.from(new Array(this.dimension))
                    .forEach((_, zIndex) => {
                        const sides = [];
                        if (xIndex === 0) {
                            sides.push(Sides.LEFT)
                        } else if (xIndex === this.dimension - 1) {
                            sides.push(Sides.RIGHT);
                        }
                        if (yIndex === 0) {
                            sides.push(Sides.DOWN)
                        } else if (yIndex === this.dimension - 1) {
                            sides.push(Sides.UP);
                        }
                        if (zIndex === 0) {
                            sides.push(Sides.BACK)
                        } else if (zIndex === this.dimension - 1) {
                            sides.push(Sides.FRONT);
                        }

                        if (sides.length) {
                            const side = CubeRenderer.cubeletFilling * CubeRenderer.cubeletSide;
                            const x = xIndex - (this.dimension / 2) * CubeRenderer.cubeletSide + CubeRenderer.cubeletSide / 2;
                            const y = yIndex - (this.dimension / 2) * CubeRenderer.cubeletSide + CubeRenderer.cubeletSide / 2;
                            const z = zIndex - (this.dimension / 2) * CubeRenderer.cubeletSide + CubeRenderer.cubeletSide / 2;

                            //2 => 0: -0.5, 1: 0.5
                            //3 => 0: -1.0, 1: 0.0,  2: 1.0
                            //4 => 0: -1.5, 1: -0.5, 2: 0.5, 3: 1.5
                            //5 => 0: -2.0, 1: -1.0, 2: 0.0, 3: 1.0, 4: 2.0

                            const position = new Vector3(x, y, z);
                            const cubelet = new CubeletRenderer({
                                sideSize: side,
                                position: position,
                                id: id++,
                                sides: sides
                            })
                            cubelet.getMesh().parent = this.rubiksCubeGroup;
                            this.rubiksCubeGroup.add(cubelet.getMesh())
                        }
                    })));
        this.rubiksCubeGroup.position.set(config.position.x, config.position.y, config.position.z);
        this.scene.add(this.rubiksCubeGroup);
    }

    public getMesh(): Object3D {
        return this.rubiksCubeGroup;
    }

    public async rotateFace(faceRotation: FaceRotationAnimation): Promise<void> {
        let axisName: 'x' | 'y' | 'z' = 'y'
        if (faceRotation.side === Sides.BACK || faceRotation.side === Sides.FRONT) {
            axisName = 'z'
        } else if (faceRotation.side === Sides.RIGHT || faceRotation.side === Sides.LEFT) {
            axisName = 'x'
        }
        let sortFunction = (a: number, b: number) => b - a;
        let targetAngle = (Math.PI / 2) * (faceRotation.counterClockwiseDirection ? 1 : -1)
        if (faceRotation.side === Sides.BACK || faceRotation.side === Sides.DOWN || faceRotation.side === Sides.LEFT) {
            sortFunction = (a, b) => a - b;
            targetAngle *= -1;
        }

        const normalizedAxisVector = new Vector3(0, 0, 0);
        normalizedAxisVector[axisName] = 1;

        let numOfCubeletsToIgnore = 0;
        let numOfCubeletsToRotate = this.dimension * this.dimension;
        if (faceRotation.layer !== undefined) {
            if (faceRotation.layer > 0) {
                numOfCubeletsToRotate = 4 * (this.dimension - 1);
                numOfCubeletsToIgnore += (faceRotation.layer - 1) * numOfCubeletsToRotate + this.dimension * this.dimension;
            }
        }

        const rotationGroup = new Group();
        this.rubiksCubeGroup.children
            .sort((first: Object3D, second: Object3D) => sortFunction(first.position[axisName], second.position[axisName]))
            .filter((_, index) => index >= numOfCubeletsToIgnore && index < numOfCubeletsToIgnore + numOfCubeletsToRotate)
            .forEach(cubelet => {
                cubelet.parent = rotationGroup;
                rotationGroup.add(cubelet);
            });
        this.rubiksCubeGroup.getWorldPosition(rotationGroup.position);
        // rotationGroup.getWorldPosition(this.rubiksCubeGroup.position);
        this.scene.add(rotationGroup);

        rotationGroup.setRotationFromEuler(this.rubiksCubeGroup.rotation.clone());

        const start: RotationTween = { rotation: 0 };
        const prev: RotationTween = { rotation: 0 };
        const end: RotationTween = { rotation: targetAngle };

        return new Promise((resolve) => {
            new Tween.Tween(start)
                .to(end, faceRotation.duration !== undefined ? faceRotation.duration : CubeRenderer.animatioDuration)
                .easing(Tween.Easing.Quadratic.Out)
                .onUpdate((item: RotationTween) => {
                    rotationGroup.rotation[axisName] = item.rotation;
                })
                .onComplete(() => {
                    rotationGroup.rotation[axisName] = targetAngle;
                    rotationGroup.updateMatrixWorld(true)
                    rotationGroup.children
                        .forEach((cubelet: Object3D) => {
                            const matrixWorld = cubelet.matrixWorld.clone()
                            const vector = new Vector3();
                            vector.setFromMatrixPosition(matrixWorld);
                            cubelet.parent = this.rubiksCubeGroup;
                            cubelet.position.copy(vector.clone().sub(this.rubiksCubeGroup.position.clone()));
                            cubelet.rotation.setFromRotationMatrix(matrixWorld);    
                        });
                    this.scene.remove(rotationGroup);
                    resolve();
                })
                .start();
        });
    }
}