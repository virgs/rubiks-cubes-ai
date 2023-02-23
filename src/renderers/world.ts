import { AmbientLight, AxesHelper, Clock, Color, DirectionalLight, HemisphereLight, Object3D, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three";
import * as Tween from '@tweenjs/tween.js'
import { Configuration } from "@/configuration";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export type AnimationFunction = (delta: number) => void

export class World {
    private readonly scene: Scene;
    private readonly camera: PerspectiveCamera;
    private readonly renderer: WebGLRenderer;
    private readonly animations: AnimationFunction[];
    private readonly clock: Clock;
    private readonly controls: OrbitControls;

    public constructor(container: HTMLElement) {
        this.clock = new Clock();

        this.animations = [];
        // create a Scene
        this.scene = new Scene();
        this.scene.background = new Color(0x111111);

        const light = new DirectionalLight(0xAAAAAA, 3);
        light.position.set(10, 10, 10);
        light.castShadow = true;
        this.scene.add(light);
        this.scene.add(new HemisphereLight(
            0xAAAAAA, // bright sky color
            0x2f4f4f, // dim ground color
            4.5, // intensity
        ));

        this.camera = this.createCamera(container);

        // create the renderer
        this.renderer = new WebGLRenderer({ antialias: true });
        this.renderer.physicallyCorrectLights = true;

        if (Configuration.world.debug) {
            this.scene.add(new AxesHelper(50));
        }

        this.controls = this.createControls();

        this.adjustSize(container);
        container.append(this.renderer.domElement);
        window.addEventListener('resize', () => this.adjustSize(container));
    }

    private createControls(): OrbitControls {
        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.target.set(0, 0, 0);
        controls.enableDamping = true;
        controls.minDistance = 25;
        controls.maxDistance = 120;
        controls.minAzimuthAngle = -Math.PI / 2; // radians
        controls.maxAzimuthAngle = Math.PI / 2; // radians
        controls.keys = {
            LEFT: 'ArrowLeft', //left arrow
            UP: 'ArrowUp', // up arrow
            RIGHT: 'ArrowRight', // right arrow
            BOTTOM: 'ArrowDown' // down arrow
        };
        return controls;
    }

    private adjustSize(container: HTMLElement): void {
        this.camera.aspect = container.clientWidth / container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
    }

    private createCamera(container: HTMLElement): PerspectiveCamera {
        const fov = 35; // AKA Field of View
        const aspect = container.clientWidth / container.clientHeight;
        const near = 0.1; // the near clipping plane
        const far = 120; // the far clipping plane
        const camera = new PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(0, 10, 50);
        camera.lookAt(new Vector3(0, 0, 0));
        return camera;
    }

    public start(): void {
        this.renderer.setAnimationLoop(() => {
            Tween.update();
            this.controls.update();
            const delta = this.clock.getDelta();
            this.animations
                .forEach(animation => animation(delta));
            this.render();
        });
    }

    public stop(): void {
        this.renderer.setAnimationLoop(null);
    }

    public getScene(): Scene {
        return this.scene;
    }

    public addAnimationLoop(animationLoop: AnimationFunction): void {
        this.animations.push(animationLoop)
    }

    private render(): void {
        this.renderer.render(this.scene, this.camera);
    }
}