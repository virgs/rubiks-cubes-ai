import type { FaceRotation } from "@/engine/face-rotation";
import { Mesh, MeshStandardMaterial, Object3D, Vector3 } from "three";
import { CubeRenderer } from "./cube-renderer"
import * as Tween from '@tweenjs/tween.js'
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import type { Font } from "three/examples/jsm/loaders/FontLoader";
import SolversMapWorker from "../solvers/solver-web-worker?worker";
import type { Solution } from "../solvers/cube-solver";
import type { SolverWorkerRequest, SolverWorkerResponse } from "../solvers/solver-web-worker";
import { Configuration } from "@/configuration";
import { HumanTranslator } from "@/printers/human-tranlator";
import type { RubiksCube } from "@/engine/rubiks-cube";

export type SolverRendererConfig = {
    font: Font,
    scene: Object3D,
    rendererSize: number,
    key: string,
    label: string,
    dimension: number,
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
    private findSolutionResolve?: (value: void) => void;
    private findSolutionReject?: (reason?: any) => void;
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
                this.performRotations();
                if (this.terminated) {
                    this.findSolutionResolve!();
                }
            }
        }, 100);

        this.solversMapWorker = new SolversMapWorker();
    }

    public keyInput(event: KeyboardEvent): void {
        this.solversMapWorker.postMessage({
            keyboardEvent: {
                key: event.key,
                shiftKey: event.shiftKey
            },
            label: this.config.label,
            solverTag: this.config.key
        } as SolverWorkerRequest);
    }

    public async start(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            this.findSolutionResolve = resolve;
            this.findSolutionReject = reject;
            this.config.scene.add(this.title!);
            await this.translate(0, 1);
            const onMessage = async (event: MessageEvent<SolverWorkerResponse>) => {
                if (!this.terminated) {
                    if (event.data.solution) {
                        const solution = JSON.parse(event.data.solution!) as Solution;
                        console.log(this.config.label, this.config.key, solution)
                        if (!solution.data.human) {
                            this.movesAnimationsQueue.push(...solution.rotations);
                        }
                        let text = '     Total time: ' + (solution.totalTime / 1000) + 's\n';
                        text += new HumanTranslator().translateRotations(solution.rotations, { lineBreak: 7, showNumberOfMoves: true });
                        this.solutionsText = this.createText(text, .6);
                        this.solutionsText.position.set(this.titleCenter.x - Configuration.renderers.cubeSize,
                            this.titleCenter.y,
                            this.titleCenter.z + Configuration.renderers.cubeSize);
                        this.config.scene.add(this.solutionsText);
                        this.terminated = true;
                        this.solversMapWorker.terminate();
                    } else if (event.data.faceRotation) {
                        this.movesAnimationsQueue.push(event.data.faceRotation)
                    }
                }
            }

            this.solversMapWorker.postMessage({
                cube: this.config.cube.getConfiguration(),
                solverTag: this.config.key,
                label: this.config.label,
            } as SolverWorkerRequest);
            this.solversMapWorker.onmessage = onMessage;
        });
    }

    private async performRotations(durationFactor: number = 1): Promise<void> {
        this.rotatingFace = true;
        const faceRotation = this.movesAnimationsQueue.shift()!;
        this.movesList.push(faceRotation);
        let duration = Configuration.renderers.rotationDuration / durationFactor;
        if (this.movesAnimationsQueue.length > 25) {
            duration /= 2;
            if (this.movesAnimationsQueue.length > 50) {
                duration /= 5;
            }
        }
        await this.cubeRenderer.rotateFace({ ...faceRotation, duration: duration })
        this.rotatingFace = false;
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
                    this.title!.position.set(titlePosition.x - Configuration.renderers.cubeSize,
                        titlePosition.y + 2,
                        titlePosition.z + Configuration.renderers.cubeSize);
                })
                .onComplete((update: { value: number }) => {
                    const cubePosition = cubeDirection.clone().multiplyScalar(update.value);
                    const titlePosition = titleDirection.clone().multiplyScalar(update.value);

                    this.cubeRenderer.getMesh().position.set(cubePosition.x, cubePosition.y, cubePosition.z);
                    this.title!.position.set(titlePosition.x - Configuration.renderers.cubeSize,
                        titlePosition.y + 2,
                        titlePosition.z + Configuration.renderers.cubeSize);
                    resolve();
                })
                .start();
        })
    }

    public getCubeMesh(): Object3D {
        return this.cubeRenderer.getMesh();
    }

    public async remove(): Promise<void> {
        this.movesAnimationsQueue.push(...this.movesList.reverse()
            .map(move => ({ ...move, counterClockwiseDirection: !move.counterClockwiseDirection })));
        while (this.movesAnimationsQueue.length > 0) {
            await this.performRotations(4);
        }
        if (this.solutionsText) {
            this.config.scene.remove(this.solutionsText);
        }
        this.terminated = true;
        this.solversMapWorker.postMessage({
            abort: true
        } as SolverWorkerRequest);

        this.solversMapWorker.terminate();
        clearInterval(this.interval);
        await this.translate(1, 0);
        this.config.scene.remove(this.title);
        this.findSolutionReject!(Error(`Abort solver '${this.config.key}' rendering`));
    }

}