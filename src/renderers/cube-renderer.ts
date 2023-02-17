import type { PocketCube } from "@/engine/pocket-cube";
import { BoxGeometry, EdgesGeometry, Group, LineBasicMaterial, LineSegments, MathUtils, Mesh, MeshStandardMaterial, Scene, Vector3 } from "three";
//https://github.com/tweenjs/tween.js/blob/main/docs/user_guide.md
import * as Tween from '@tweenjs/tween.js'

type RotationTween = {
    rotation: number
}


//https://github.com/SuboptimalEng/gamedex/blob/19b0466ad30ef0fb6c760eb78f74e6cf64fa1a73/08-rubiks-cube/src/lib/Cube.js
export class CubeRenderer {
    private static readonly radiansPerSecond: number = MathUtils.degToRad(45);
    private static readonly cubeletSide: number = 1;
    private static readonly cubeletFilling: number = .95;
    private readonly rubiksCubeGroup: Group;
    private readonly scene: Scene;
    // private readonly cube: Mesh;

    private readonly dimension: number;
    private animation?: Tween.Tween;

    public constructor(config: {cube: PocketCube, scene: Scene}) {
        // this.cube = new Mesh();
        this.rubiksCubeGroup = new Group();
        this.scene = config.scene;
        this.dimension = config.cube.getDimension()

        Array.from(new Array(this.dimension))
            .forEach((_, xIndex) => Array.from(new Array(this.dimension))
                .forEach((_, yIndex) => Array.from(new Array(this.dimension))
                    .forEach((_, zIndex) => {
                        const side = CubeRenderer.cubeletFilling * CubeRenderer.cubeletSide;
                        const geometry = new BoxGeometry(side, side, side);
                        const material = new MeshStandardMaterial({
                            color: 'navy',
                            roughness: 1,
                            flatShading: true,
                            transparent: true,
                            opacity: 0.7,
                        });
                        const cubeletMesh = new Mesh(geometry, material)

                        const lineEdges = new EdgesGeometry(geometry);
                        const lineMaterial = new LineBasicMaterial({ color: '#FF00FF', linewidth: 100, fog: true });
                        const lineMesh = new LineSegments(lineEdges, lineMaterial);

                        // const x = CubeRenderer.cubeletSide *(1+xIndex- this.dimension*0.5);
                        const x = xIndex - (this.dimension / 2)*CubeRenderer.cubeletSide + CubeRenderer.cubeletSide/2;
                        const y = yIndex - (this.dimension / 2)*CubeRenderer.cubeletSide + CubeRenderer.cubeletSide/2;
                        const z = zIndex - (this.dimension / 2)*CubeRenderer.cubeletSide + CubeRenderer.cubeletSide/2;

                        //2 => 0: -0.5, 1: 0.5
                        //3 => 0: -1.0, 1: 0.0,  2: 1.0
                        //4 => 0: -1.5, 1: -0.5, 2: 0.5, 3: 1.5
                        //5 => 0: -2.0, 1: -1.0, 2: 0.0, 3: 1.0, 4: 2.0

                        const cubeletGroup = new Group();
                        cubeletGroup.add(cubeletMesh)
                        cubeletMesh.add(lineMesh);
                        cubeletGroup.position.x = x;
                        cubeletGroup.position.y = y;
                        cubeletGroup.position.z = z;
                        this.rubiksCubeGroup.add(cubeletGroup)
                    })));
        this.scene.add(this.rubiksCubeGroup);
        this.rubiksCubeGroup.rotation.x = Math.PI / 1;
        this.rubiksCubeGroup.rotation.y = -Math.PI / 4;                    
        this.rotate();
    }

    public getCube(): Group {
        return this.rubiksCubeGroup;
    }

    public rotate(): void {
        const rotationGroup = new Group();
        Array.from(this.rubiksCubeGroup.children)
            .map(child => child as Mesh)
            .sort((first: Mesh, second: Mesh) => first.position.y - second.position.y)
            .filter((_, index) => index < this.dimension * this.dimension)
            .forEach(cubelet => rotationGroup.add(cubelet));
        console.log(rotationGroup.children.length, this.rubiksCubeGroup.children.length);
        this.scene.add(rotationGroup);
        rotationGroup.setRotationFromEuler(this.rubiksCubeGroup.rotation.clone());

        const start: RotationTween = { rotation: 0 };
        const prev: RotationTween = { rotation: 0 };
        const end: RotationTween = { rotation: Math.PI / 2 };
        const axis = new Vector3(0,1,0).normalize()

        // this.rubiksCubeGroup.parent.add(cubeGroup)
    
        const duration = 3000;
        this.animation = new Tween.Tween(start)
          .to(end, duration)
          .easing(Tween.Easing.Quadratic.InOut)
          .onUpdate((item: RotationTween) => {
            rotationGroup.position.applyAxisAngle(axis, item.rotation - prev.rotation);
            rotationGroup.rotateOnWorldAxis(axis, item.rotation - prev.rotation);   
            // NOTE: Keep track of the previous rotation for tweening.
            prev.rotation = item.rotation;
            rotationGroup.updateMatrixWorld();
          })
          .onComplete(() => {
            console.log('isOver');
            this.rubiksCubeGroup.add(...rotationGroup.children)
            this.scene.remove(rotationGroup);
            this.animation = undefined;
            this.rotate();
          })
          .start();


        // const pivot = new Object3D();
        // pivot.position.set(0, 1, 0);
        // pivot.rotation.set(0, 0, 0);

        // const angle = delta * CubeRenderer.radiansPerSecond;
        // Array.from(this.cube.children)
        //     .map(child => child as Mesh)
        //     .sort((first: Mesh, second: Mesh) => second.position.y - first.position.y)
        //     .filter((_, index) => index < 1)//this.dimension * this.dimension)
        //     .forEach(mesh => {
        //         // pivot.attach(mesh)
        //         // // mesh.getWorldPosition

        //         // mesh.rotateY(angle)

        //         // mesh.position.x = Math.sin(mesh.rotation.y) * 0.5
        //         // mesh.position.z = Math.cos(mesh.rotation.y) * 0.5


        //         mesh.rotateOnWorldAxis(new Vector3(0, 1, 0).normalize(), angle);

        //     });

        // pivot.rotateY(angle)

        // this.cube.position.x = Math.cos(this.cube.rotation.y) * 0.5
        // this.cube.position.z = Math.sin(this.cube.rotation.y) * 0.5

        // this.cube.rotateY(delta * CubeRenderer.radiansPerSecond);
    }

}

//
  //Select the plane of cubes that aligns with clickVector
//   // on the given axis
//   function setActiveGroup(axis) {
//     if(clickVector) {
//       activeGroup = [];

//       allCubes.forEach(function(cube) {
//         if(nearlyEqual(cube.rubikPosition[axis], clickVector[axis])) { 
//           activeGroup.push(cube);
//         }
//       });
//     } else {
//       console.log("Nothing to move!");
//     }
//   }



// //
// var startNextMove = function() {
//     var nextMove = moveQueue.pop();

//     if(nextMove) {
//       clickVector = nextMove.vector;
      
//       var direction = nextMove.direction || 1,
//           axis = nextMove.axis;

//       if(clickVector) {

//         if(!isMoving) {
//           isMoving = true;
//           moveAxis = axis;
//           moveDirection = direction;

//           setActiveGroup(axis);

//           pivot.rotation.set(0,0,0);
//           pivot.updateMatrixWorld();
//           scene.add(pivot);

//           activeGroup.forEach(function(e) {
//             THREE.SceneUtils.attach(e, scene, pivot);
//           });

//           currentMove = nextMove;
//         } else {
//           console.log("Already moving!");
//         }
//       } else {
//         console.log("Nothing to move!");
//       }
//     } else {
//       moveEvents.trigger('deplete');
//     }
//   }

//   function doMove() {
//     //Move a quarter turn then stop
//     if(pivot.rotation[moveAxis] >= Math.PI / 2) {
//       //Compensate for overshoot. TODO: use a tweening library
//       pivot.rotation[moveAxis] = Math.PI / 2;
//       moveComplete();
//     } else if(pivot.rotation[moveAxis] <= Math.PI / -2) {
//       pivot.rotation[moveAxis] = Math.PI / -2;
//       moveComplete()
//     } else {
//       pivot.rotation[moveAxis] += (moveDirection * rotationSpeed);
//     }
//   }
