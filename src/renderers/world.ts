import { Color, DirectionalLight, Mesh, PerspectiveCamera, Scene, WebGLRenderer, type Camera } from "three";

export type AnimationFunction = (delta: number) => void

export class World {
    private readonly scene: Scene;
    private readonly camera: PerspectiveCamera;
    private readonly renderer: WebGLRenderer;
    private readonly animations: AnimationFunction[];


    public constructor(container: HTMLElement) {
        this.animations = [];
        // create a Scene
        this.scene = new Scene();

        // Set the background color
        this.scene.background = new Color('darkblue');

        const light = new DirectionalLight('white', 8);
        light.position.set(10, 10, 10);
        this.scene.add(light);

        this.camera = this.createCamera(container);
        // every object is initially created at ( 0, 0, 0 )
        // move the camera back so we can view the scene
        this.camera.position.set(0, 0, 10);

        // create the renderer
        this.renderer = new WebGLRenderer({ antialias: true });

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
        let lastCallTIme: number | undefined;
        this.renderer.setAnimationLoop((callTime: number) => {
            if (lastCallTIme) {
                const delta = callTime - lastCallTIme;
                this.animations
                    .forEach(animation => animation(delta));
            }
            lastCallTIme = callTime;

            this.render();
        });
    }

    public stop(): void {
        this.renderer.setAnimationLoop(null);
    }

    public addToScene(mesh: Mesh): Scene {
        return this.scene.add(mesh);
    }

    public addAnimationLoop(animationLoop: AnimationFunction): void {
        this.animations.push(animationLoop)
    }

    private render(): void {
        // render, or 'create a still image', of the scene
        this.renderer.render(this.scene, this.camera);
    }
}