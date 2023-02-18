import { AmbientLight, AxesHelper, Clock, Color, DirectionalLight, Object3D, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from "three";
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

        // Set the background color
        this.scene.background = new Color(0x111111);

        // const light = new DirectionalLight('white', 1);
        // light.position.set(-10, 10, 10);
        // light.castShadow = true;

        // this.scene.add(light);
        this.scene.add(new AmbientLight(0xAAAAAA, 8));

        this.camera = this.createCamera(container);
        // every object is initially created at ( 0, 0, 0 )
        // move the camera back so we can view the scene
        this.camera.position.set(-10, 5, 15);
        this.camera.lookAt(new Vector3(0, 0, 0))

        // create the renderer
        this.renderer = new WebGLRenderer({ antialias: true });

        if (Configuration.world.debug) {
            this.scene.add(new AxesHelper(50));
        }

        this.controls = new OrbitControls( this.camera, this.renderer.domElement );
        this.controls.target.set( 0, 2, 0 );
        this.controls.enableDamping = true;
        this.controls.minDistance = 10;
        this.controls.maxDistance = 20;
        

        // turn on the physically correct lighting model
        this.renderer.physicallyCorrectLights = true;

        this.adjustSize(container);

        // add the automatically created <canvas> element to the page
        container.append(this.renderer.domElement);

        window.addEventListener('resize', () => this.adjustSize(container));
    }

    private adjustSize(container: HTMLElement): void {
        this.camera.aspect = container.clientWidth / container.clientHeight;
        this.camera.updateProjectionMatrix();
        // next, set the renderer to the same size as our container element
        this.renderer.setSize(container.clientWidth, container.clientHeight);

        // finally, set the pixel ratio so that our scene will look good on HiDPI displays
        this.renderer.setPixelRatio(window.devicePixelRatio);
    }

    private createCamera(container: HTMLElement): PerspectiveCamera {
        // Create a camera
        const fov = 35; // AKA Field of View
        const aspect = container.clientWidth / container.clientHeight;
        const near = 0.1; // the near clipping plane
        const far = 50; // the far clipping plane
        return new PerspectiveCamera(fov, aspect, near, far);
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
        // render, or 'create a still image', of the scene
        this.renderer.render(this.scene, this.camera);
    }
}