import type { FaceRotation } from "@/engine/face-rotation";
import type { RubiksCube } from "@/engine/rubiks-cube";
import { Mesh, MeshStandardMaterial, Object3D, Vector3 } from "three";
import { CubeRenderer } from "./cube-renderer"
import * as Tween from '@tweenjs/tween.js'
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import type { Font } from "three/examples/jsm/loaders/FontLoader";
import SolversMapWorker from "../solvers/pocket-cube-solvers-map-worker?worker";
import type { Solution } from "../solvers/cube-solver";
import type { SolverWorkerRequest, SolverWorkerResponse } from "../solvers/pocket-cube-solvers-map-worker";
import { Configuration } from "@/configuration";
import { HumanTranslator } from "@/engine/human-tranlator";

export type SolverRendererConfig = {
    font: Font,
    scene: Object3D,
    rendererSize: number,
    key: string,
    position: {
        from: Vector3,
        angle: number
    },
    cube: RubiksCube
}

export class SolverRenderer {
    private static readonly translationDuration: number = Configuration.renderers.translationDuration;
    private readonly movesAnimationsQueue: FaceRotation[];
    private readonly cubeRenderer: CubeRenderer;
    private readonly config: SolverRendererConfig;
    private readonly cubeCenter: Vector3;
    private readonly titleCenter: Vector3;
    private readonly title: Object3D;
    private readonly movesList: FaceRotation[];
    private readonly interval: number;
    private readonly solversMapWorker: Worker;
    private solutionsText?: Mesh;
    private rotatingFace: boolean;
    private terminated: boolean;

    public constructor(config: SolverRendererConfig) {
        this.config = config;
        this.movesAnimationsQueue = [];
        this.movesList = [];
        this.terminated = false;
        this.rotatingFace = false;

        this.cubeCenter = new Vector3(Configuration.world.cubesCircleRay * Math.cos(config.position.angle),
            Configuration.world.cubesCircleRay * Math.sin(config.position.angle));
        this.titleCenter = new Vector3((Configuration.world.cubesCircleRay + Configuration.renderers.titleDistance) * Math.cos(config.position.angle),
            (Configuration.world.cubesCircleRay + Configuration.renderers.titleDistance) * Math.sin(config.position.angle));

        this.cubeRenderer = new CubeRenderer({
            parent: config.scene,
            cube: config.cube,
            position: this.config.position.from.clone(),
            size: Configuration.renderers.cubeSize
        });

        this.title = this.createText(config.key, .8);

        config.scene.add(this.cubeRenderer.getMesh());

        this.interval = setInterval(async () => {
            if (this.movesAnimationsQueue.length > 0 && !this.rotatingFace) {
                this.rotatingFace = true;
                const faceRotation = this.movesAnimationsQueue.shift()!;
                this.movesList.push(faceRotation);
                await this.cubeRenderer.rotateFace({ ...faceRotation, duration: Configuration.renderers.rotationDuration })
                this.rotatingFace = false;
            }
        }, 100);

        this.solversMapWorker = new SolversMapWorker();
    }

    public async start(): Promise<void> {
        this.config.scene.add(this.title!);
        await this.translate(0, 1);
        const onMessage = async (event: MessageEvent<SolverWorkerResponse>) => {
            if (!this.terminated) {
                if (event.data.solution) {
                    const solution = JSON.parse(event.data.solution!) as Solution;
                    this.movesAnimationsQueue.push(...solution.rotations);
                    let text = '  Total time: ' + (Math.trunc(solution.totalTime / 100.0) / 10) + 's\n\n';
                    text += new HumanTranslator().translateRotations(solution.rotations, { lineBreak: 5 });
                    this.solutionsText = this.createText(text, .6);
                    this.solutionsText.position.set(this.titleCenter.x + 1.5, this.titleCenter.y - 3, this.titleCenter.z)
                    this.config.scene.add(this.solutionsText);
                    this.terminated = true;
                    this.solversMapWorker.terminate();
                } else if (event.data.faceRotation) {
                    this.movesAnimationsQueue.push(event.data.faceRotation)
                }
            }
        }

        window.addEventListener('keypress', async (event: KeyboardEvent) => {
            this.solversMapWorker.postMessage({
                keyboardEvent: {
                    key: event.key,
                    shiftKey: event.shiftKey
                },
                solverTag: this.config.key
            } as SolverWorkerRequest);
        });
        this.solversMapWorker.postMessage({ cube: this.config.cube.getConfiguration(), solverTag: this.config.key } as SolverWorkerRequest);
        this.solversMapWorker.onmessage = onMessage;
    }

    private createText(text: string, size: number): Mesh {
        const geometry = new TextGeometry(text, {
            font: this.config.font,
            size: size,
            height: .15
        });
        const material = new MeshStandardMaterial({
            color: 0xBDB0AF
        });
        return new Mesh(geometry, material)
    }

    private async translate(from: number, to: number): Promise<void> {
        return new Promise(resolve => {
            const cubeDirection = this.cubeCenter.clone().sub(this.config.position.from);
            const titleDirection = this.titleCenter.clone().sub(this.config.position.from);

            new Tween.Tween({ value: from })
                .to({ value: to }, SolverRenderer.translationDuration)
                .easing(Tween.Easing.Quadratic.InOut)
                .onUpdate((update: { value: number }) => {
                    const cubePosition = cubeDirection.clone().multiplyScalar(update.value);
                    const titlePosition = titleDirection.clone().multiplyScalar(update.value);

                    this.cubeRenderer.getMesh().position.set(cubePosition.x, cubePosition.y, cubePosition.z);
                    this.title!.position.set(titlePosition.x, titlePosition.y, titlePosition.z);
                })
                .onComplete((update: { value: number }) => {
                    const cubePosition = cubeDirection.clone().multiplyScalar(update.value);
                    const titlePosition = titleDirection.clone().multiplyScalar(update.value);

                    this.cubeRenderer.getMesh().position.set(cubePosition.x, cubePosition.y, cubePosition.z);
                    this.title!.position.set(titlePosition.x, titlePosition.y, titlePosition.z);
                    resolve();
                })
                .start();
        })
    }

    public async remove(): Promise<void> {
        console.log('removing')
        console.log(this.solutionsText)
        if (this.solutionsText) {
            this.config.scene.remove(this.solutionsText);
            console.log('removed')
        }
        this.terminated = true;
        this.solversMapWorker.terminate();
        clearInterval(this.interval);
        await this.translate(1, 0);
        this.config.scene.remove(this.cubeRenderer.getMesh());
        this.config.scene.remove(this.title);
    }

}