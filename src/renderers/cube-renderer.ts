import {
    Group, Object3D, Scene, Vector3
} from "three";
//https://github.com/tweenjs/tween.js/blob/main/docs/user_guide.md
import * as Tween from '@tweenjs/tween.js'
import { Sides } from "@/constants/sides";
import { CubeletRenderer } from "./cubelet-renderer";
import { Axis, getAxisFromSide } from "@/constants/axis";
import type { RubiksCube } from "@/engine/rubiks-cube";
import type { FaceRotation } from "@/engine/face-rotation";

type RotationTween = {
    rotation: number
}

type FaceRotationAnimation = FaceRotation & { duration?: number };

//https://github.com/SuboptimalEng/gamedex/blob/19b0466ad30ef0fb6c760eb78f74e6cf64fa1a73/08-rubiks-cube/src/lib/Cube.js
export class CubeRenderer {
    private static readonly animatioDuration: number = 250;
    private readonly scene: Scene;
    private readonly dimension: number;
    private rubiksCubeGroup: Group;

    public constructor(config: { cube: RubiksCube, scene: Scene, position: Vector3, size: number }) {
        this.rubiksCubeGroup = new Group();
        this.scene = config.scene;
        this.dimension = config.cube.getDimension();

        config.cube.getAllCubelets()
            .filter((_, index: number) => index < 7)
            .forEach(cubelet => {
                const side = config.size / this.dimension;
                const renderer = new CubeletRenderer({
                    sideSize: side,
                    cubelet: cubelet,
                    cubeDimension: this.dimension
                });
                renderer.getMesh().parent = this.rubiksCubeGroup;
                this.rubiksCubeGroup.add(renderer.getMesh())
            });

        this.rubiksCubeGroup.position.set(config.position.x, config.position.y, config.position.z);
        this.scene.add(this.rubiksCubeGroup);
    }

    public getMesh(): Object3D {
        return this.rubiksCubeGroup;
    }

    public async rotateFace(faceRotation: FaceRotationAnimation): Promise<void> {
        const axis: Axis = getAxisFromSide(faceRotation.side);
        const axisName = Axis[axis];
        let targetAngle = (Math.PI / 2) * (faceRotation.counterClockwiseDirection ? 1 : -1)
        if (faceRotation.side === Sides.BACK || faceRotation.side === Sides.DOWN || faceRotation.side === Sides.LEFT) {
            targetAngle *= -1;
        }

        const rotationGroup = this.createRotationGroup(axisName, faceRotation);
        this.scene.add(rotationGroup);

        const start: RotationTween = { rotation: 0 };
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
                    rotationGroup.updateMatrixWorld(true);
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

    private createRotationGroup(axisName: Axis, faceRotation: FaceRotationAnimation): Group {
        let sortFunction = (a: number, b: number) => b - a;
        if (faceRotation.side === Sides.BACK || faceRotation.side === Sides.DOWN || faceRotation.side === Sides.LEFT) {
            sortFunction = (a, b) => a - b;
        }

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
        return rotationGroup;
    }
}