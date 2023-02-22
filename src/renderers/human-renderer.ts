import { Sides } from "@/constants/sides";
import type { FaceRotation } from "@/engine/face-rotation";
import type { RubiksCube } from "@/engine/rubiks-cube";
import { Mesh, MeshStandardMaterial, Object3D, Vector3 } from "three";
import { CubeRenderer } from "./cube-renderer";
import * as Tween from '@tweenjs/tween.js'
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { Font, FontLoader } from "three/examples/jsm/loaders/FontLoader";

export type HumanRendererConfig = {
    scene: Object3D, rendererSize: number, title: string, position: { from: Vector3, to: Vector3 }, cube: RubiksCube
}

export class HumanRenderer {
    private readonly cubeRenderer: CubeRenderer;
    private static readonly loader = new FontLoader();
    private readonly scene: Object3D;
    private readonly moves: FaceRotation[];
    private title?: Object3D;

    private cube: RubiksCube;
    private moving: boolean = false;
    parent: any;

    public constructor(config: HumanRendererConfig) {
        this.scene = config.scene;
        window.addEventListener('keypress', (event) => this.doCommand(event));
        this.moves = [];
        this.moving = false;
        this.cube = config.cube;

        this.cubeRenderer = new CubeRenderer({
            parent: config.scene,
            cube: this.cube,
            position: config.position.from,
            size: 3
        });

        config.scene.add(this.cubeRenderer.getMesh())
        // this.parent.add(this.cubeRenderer.getMesh());
        this.createTitle(config);

    }
    private createTitle(config: HumanRendererConfig): void {
        HumanRenderer.loader.load('public/helvetiker_regular.typeface.json', (font: Font) => {
            console.log('loaded')
            const geometry = new TextGeometry(config.title, {
                font: font,
                size: .8,
                height: .1
            });
            const material = new MeshStandardMaterial({
                color: 0xBDB0AF
            });
            this.title = new Mesh(geometry, material)

            new Tween.Tween(config.position.from)
                .to(config.position.to, 1500)
                .easing(Tween.Easing.Quadratic.InOut)
                .onUpdate((position: Vector3) => {
                    this.cubeRenderer.getMesh().position.set(position.x, position.y, position.z);
                    this.title!.position.set(position.x, position.y + 5, position.z);
                })
                .onComplete((position: Vector3) => {
                    this.cubeRenderer.getMesh().position.set(position.x, position.y, position.z);
                    this.title!.position.set(position.x, position.y + 5, position.z);
                })
                .start();
            config.scene.add(this.title)
        })
    }

    private async doCommand(event: KeyboardEvent): Promise<void> {
        if (this.cube.isSolved()) {
            return;
        }
        let side: Sides | undefined;
        switch (event.key.toLowerCase()) {
            case 'w':
                side = Sides.UP;
                break;
            case 'a':
                side = Sides.LEFT;
                break;
            case 's':
                side = Sides.FRONT;
                break;
            case 'd':
                side = Sides.RIGHT;
                break;
            case 'f':
                side = Sides.BACK;
                break;
            case 'x':
                side = Sides.DOWN;
                break;
        }
        if (side !== undefined && !this.moving) {
            this.moving = true;
            const faceRotation = { side: side, counterClockwiseDirection: event.shiftKey };
            this.moves.push(faceRotation);
            await this.cubeRenderer.rotateFace({ ...faceRotation, duration: 500 });
            this.cube = this.cube.rotateFace(faceRotation)
            this.moving = false;
        }
    }

}