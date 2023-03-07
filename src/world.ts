import { AxesHelper, Clock, Color, DirectionalLight, HemisphereLight, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three";
import * as Tween from '@tweenjs/tween.js'
import { Configuration } from "@/configuration";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";



export type AnimationFunction = (delta: number) => void

export class World {
    private readonly scene: Scene;
    private readonly camera: PerspectiveCamera;
    private readonly renderer: WebGLRenderer;
    private readonly animations: AnimationFunction[];
    private readonly clock: Clock;
    private readonly controls: OrbitControls;
    private readonly stats?: Stats;

    public constructor(container: HTMLElement) {
        this.clock = new Clock();

        this.animations = [];
        // create a Scene
        this.scene = new Scene();
        this.scene.background = new Color(0x111111);

        const light = new DirectionalLight(0xAAAAAA, 7.5);
        light.position.set(10, 10, 10);
        light.castShadow = true;
        this.scene.add(light);
        this.scene.add(new HemisphereLight(
            0xAAAAAA, // bright sky color
            0x4f5f6f, // dim ground color
            4.5, // intensity
        ));

        this.camera = this.createCamera(container);

        // create the renderer
        this.renderer = new WebGLRenderer({ antialias: true });
        this.renderer.physicallyCorrectLights = true;

        if (Configuration.world.debug) {
            this.scene.add(new AxesHelper(50));
            this.stats = Stats();
            document.body.appendChild(this.stats.dom);
        }

        this.controls = this.createControls(container);

        this.adjustSize(container);
        container.append(this.renderer.domElement);
        window.addEventListener('resize', () => this.adjustSize(container));
    }


    public start(): void {
        this.renderer.setAnimationLoop(() => {
            Tween.update();
            this.controls.update();
            const delta = this.clock.getDelta();
            this.stats?.update()
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

    public async sendCameraAwayFromTheCenter(): Promise<void> {
        return new Promise(resolve => {
            const from = { length: Math.round(this.camera.position.length()), x: this.camera.position.x, y: this.camera.position.y, target: this.camera.lookAt }
            const to = { length: Configuration.world.camera.farDistance, x: 0.0, y: 0, target: new Vector3(0, 0, 0) }
            new Tween.Tween(from)
                .to(to, 500)
                .easing(Tween.Easing.Quadratic.InOut)
                .onUpdate((update: any) => {
                    this.camera.position.setLength(update.length);
                    this.camera.position.x = update.x;
                    this.camera.position.y = update.y;
                    this.camera.lookAt(update.target)
                })
                .onComplete((update: any) => {
                    this.camera.position.setLength(update.length);
                    this.camera.position.x = update.x;
                    this.camera.position.y = update.y;
                    this.camera.lookAt(update.target)
                    resolve();
                })
                .start();
        });
    }

    public async bringCameraToTheCenter(): Promise<void> {
        return new Promise(resolve => {
            const from = { length: Math.round(this.camera.position.length()), x: this.camera.position.x, y: this.camera.position.y, target: this.camera.lookAt }
            const to = { length: Configuration.world.camera.closeDistance, x: 5.0, y: 5, target: new Vector3(0, 0, 0) }
            new Tween.Tween(from)
                .to(to, 500)
                .easing(Tween.Easing.Quadratic.InOut)
                .onUpdate((update: any) => {
                    this.camera.position.setLength(update.length);
                    this.camera.position.x = update.x;
                    this.camera.position.y = update.y;
                    this.camera.lookAt(update.target)
                })
                .onComplete((update: any) => {
                    this.camera.position.setLength(update.length);
                    this.camera.position.x = update.x;
                    this.camera.position.y = update.y;
                    this.camera.lookAt(update.target)
                    resolve();
                })
                .start();
        });
    }

    private adjustSize(container: HTMLElement): void {
        this.camera.aspect = container.clientWidth / container.clientHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
    }

    private createControls(container: HTMLElement): OrbitControls {
        const controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.enableDamping = true;
        controls.minDistance = 10;
        controls.maxDistance = 120;
        controls.minAzimuthAngle = -3 * Math.PI / 4; // radians
        controls.maxAzimuthAngle = 3 * Math.PI / 4; // radians
        controls.keys = {
            LEFT: 'ArrowLeft', //left arrow
            UP: 'ArrowUp', // up arrow
            RIGHT: 'ArrowRight', // right arrow
            BOTTOM: 'ArrowDown' // down arrow
        };
        controls.enabled = true;
        controls.enablePan = true;
        controls.keyPanSpeed = 7
        return controls;
    }

    private createCamera(container: HTMLElement): PerspectiveCamera {
        const fov = 35; // AKA Field of View
        const aspect = container.clientWidth / container.clientHeight;
        const near = 0.1; // the near clipping plane
        const far = 150; // the far clipping plane
        const camera = new PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(5, 5, Configuration.world.camera.closeDistance);
        return camera;
    }

    private render(): void {
        this.renderer.render(this.scene, this.camera);
    }
}