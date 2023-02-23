import { Sides } from "@/constants/sides";
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
    private rotatingFace: boolean;

    public constructor(config: SolverRendererConfig) {
        this.config = config;
        this.movesAnimationsQueue = [];
        this.movesList = [];
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

        const geometry = new TextGeometry(this.config.key, {
            font: this.config.font,
            size: .8,
            height: .1
        });
        const material = new MeshStandardMaterial({
            color: 0xBDB0AF
        });
        this.title = new Mesh(geometry, material)

        config.scene.add(this.cubeRenderer.getMesh());
    }

    public async start(): Promise<void> {
        this.config.scene.add(this.title!);
        await this.translate();
        const onMessage = async (event: MessageEvent<SolverWorkerResponse>) => {
            if (event.data.solution) {
                const solution = JSON.parse(event.data.solution!) as Solution;
                this.movesAnimationsQueue.push(...solution.rotations)
                // console.log(new HumanTranslator().translateRotations(solution.rotations));
            } else if (event.data.faceRotation) {
                this.movesAnimationsQueue.push(event.data.faceRotation)
            }
        }
        setInterval(async () => {
            if (this.movesAnimationsQueue.length > 0 && !this.rotatingFace) {
                this.rotatingFace = true;
                const faceRotation = this.movesAnimationsQueue.shift()!;
                this.movesList.push(faceRotation);
                await this.cubeRenderer.rotateFace({ ...faceRotation, duration: Configuration.renderers.rotationDuration })
                this.rotatingFace = false;
            }
        }, Configuration.renderers.rotationDuration * .5);
        const solversMapWorker = new SolversMapWorker();
        window.addEventListener('keypress', async (event: KeyboardEvent) => {
            solversMapWorker.postMessage({ keyboardEvent: { key: event.key, shiftKey: event.shiftKey }, solverTag: this.config.key } as SolverWorkerRequest);
        });
        solversMapWorker.postMessage({ cube: this.config.cube.getConfiguration(), solverTag: this.config.key } as SolverWorkerRequest);
        solversMapWorker.onmessage = onMessage;
    }

    private async translate(): Promise<void> {
        return new Promise(resolve => {
            const cubeDirection = this.cubeCenter.clone().sub(this.config.position.from);
            const titleDirection = this.titleCenter.clone().sub(this.config.position.from);

            new Tween.Tween({ value: 0 })
                .to({ value: 1 }, SolverRenderer.translationDuration)
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
        return new Promise(resolve => {
            new Tween.Tween(this.cubeCenter)
                .to(this.config.position.from, SolverRenderer.translationDuration)
                .easing(Tween.Easing.Quadratic.InOut)
                .onUpdate((position: Vector3) => {
                    this.cubeRenderer.getMesh().position.set(position.x, position.y, position.z);
                })
                .onComplete(() => {
                    this.config.scene.remove(this.cubeRenderer.getMesh());
                    resolve()
                })
                .start();
            this.config.scene.remove(this.title!);
        });
    }



}