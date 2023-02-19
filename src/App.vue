<script lang="ts">
import { PocketCube } from "@/engine/pocket-cube";
import { CubeScrambler } from "./engine/cube-scrambler";
import { BreadthFirstSearch } from "./engine/solvers/breadth-first-search";
import { defineComponent } from 'vue';
import { World } from "./renderers/world";
import { CubeRenderer } from "./renderers/cube-renderer";
import type { FaceRotation } from "./engine/face-rotation";
import { Sides } from "./engine/sides";
import type { Solution } from "./engine/solvers/solution";
import type { CubeSolver } from "./engine/solvers/cube-solver";
import { Vector3 } from "three";

export default defineComponent({
  name: 'App',
  async mounted() {
    // Get a reference to the container element that will hold our scene
    const container = document.getElementById('scene-container')!;
    const world = new World(container);
    world.start();

    let cube = new PocketCube();
    const cubeRenderer = new CubeRenderer({ scene: world.getScene(), cube: cube, position: new Vector3(2.5, 3, 0) })
    console.log('Scrambling')
    const scramblingRotations = new CubeScrambler(30).scramble(cube);
    this.printRotations(scramblingRotations)
    for (let rotation of scramblingRotations) {
      await cubeRenderer.rotateFace({ ...rotation, duration: 100 });
      cube = cube.rotateFace(rotation);
    }
    // this.solve(cube, cubeRenderer, world);
  },
  methods: {
    async solve(cube: PocketCube, cubeRenderer: CubeRenderer, world: World) {
      console.log('Solving')
      let solver: CubeSolver | undefined = new BreadthFirstSearch(cube);
      let solution: Solution | undefined;
      world.addAnimationLoop(() => {
        if (solver) {
          solution = solver.iterate();
          if (solution) {
            this.printRotations(solution.rotations);
            console.log(solution)
            this.renderSolution(cubeRenderer, solution)
            solver = undefined;
          }
        }
      });
    },
    async renderSolution(cubeRenderer: CubeRenderer, solution: Solution) {
      for (let rotation of solution.rotations) {
        await cubeRenderer.rotateFace({ ...rotation, duration: 500 });
      }
    },
    printRotations(rotations: FaceRotation[]) {
      let text = '';
      rotations
        .forEach((rotation: FaceRotation, index: number) => {
          text += `| ${Sides[rotation.side].substring(0, 1)}${rotation.layer! > 0 ? rotation.layer! + 1 : ' '}${rotation.counterClockwiseDirection ? '\'' : ' '}  `;
          if (index % 5 === 4) {
            text += '\n'
          }
        });
      console.log(text);
    }
  }
})

</script>

<template>
  <div id="scene-container" class="wrapper">
  </div>
</template>

<style scoped>
.wrapper {
  /* height: 100vh; */
  min-height: 100%;
}
</style>
