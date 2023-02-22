import { Sides } from "@/constants/sides";
import type { FaceRotation } from "@/engine/face-rotation";
import type { RubiksCube } from "@/engine/rubiks-cube";
import { Mesh, MeshStandardMaterial, Object3D, Vector3 } from "three";
import { CubeRenderer } from "../renderers/cube-renderer";
import * as Tween from '@tweenjs/tween.js'
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import type { Font } from "three/examples/jsm/loaders/FontLoader";

export type HumanRendererConfig = {
    font: Font,
    scene: Object3D,
    rendererSize: number,
    title: string,
    position: {
        from: Vector3,
        to: Vector3
    },
    cube: RubiksCube
}

export class HumanPlayer {
    private static readonly translationDuration: number = 500;
    private readonly cubeRenderer: CubeRenderer;
    private readonly moves: FaceRotation[];
    private readonly config: HumanRendererConfig;
    private title?: Object3D;

    private cube: RubiksCube;
    private moving: boolean = false;

    public constructor(config: HumanRendererConfig) {
        this.moves = [];
        this.moving = false;
        this.cube = config.cube;
        this.config = config;

        this.cubeRenderer = new CubeRenderer({
            parent: config.scene,
            cube: this.cube,
            position: this.config.position.from.clone(),
            size: 3
        });

        config.scene.add(this.cubeRenderer.getMesh());
        this.createTitle();
    }

    private createTitle(): void {
        const geometry = new TextGeometry(this.config.title, {
            font: this.config.font,
            size: .8,
            height: .1
        });
        const material = new MeshStandardMaterial({
            color: 0xBDB0AF
        });
        this.title = new Mesh(geometry, material)

        new Tween.Tween(this.config.position.from.clone())
            .to(this.config.position.to, HumanPlayer.translationDuration)
            .easing(Tween.Easing.Quadratic.InOut)
            .onUpdate((position: Vector3) => {
                this.cubeRenderer.getMesh().position.set(position.x, position.y, position.z);
                this.title!.position.set(position.x - this.title!.scale.x * 2, position.y + 5, position.z);
            })
            .onComplete((position: Vector3) => {
                this.cubeRenderer.getMesh().position.set(position.x, position.y, position.z);
                this.title!.position.set(position.x - this.title!.scale.x * 2, position.y + 5, position.z);
            })
            .start();
        this.config.scene.add(this.title)
    }

    public async remove(): Promise<void> {
        return new Promise(resolve => {
            new Tween.Tween(this.config.position.to)
                .to(this.config.position.from, HumanPlayer.translationDuration)
                .easing(Tween.Easing.Quadratic.InOut)
                .onUpdate((position: Vector3) => {
                    this.cubeRenderer.getMesh().position.set(position.x, position.y, position.z);
                    this.title!.position.set(position.x - this.title!.scale.x * 2, position.y + 5, position.z);
                })
                .onComplete(() => {
                    this.config.scene.remove(this.cubeRenderer.getMesh());
                    this.config.scene.remove(this.title!);
                    resolve()
                })
                .start();
        });
    }

   

}