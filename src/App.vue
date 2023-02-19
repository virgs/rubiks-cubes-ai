<script lang="ts">
import { PocketCube } from "@/engine/pocket-cube";
import { CubeScrambler } from "./engine/cube-scrambler";
import { BreadthFirstSearch } from "./engine/solvers/breadth-first-search";
import { defineComponent } from 'vue';
import { World } from "./renderers/world";
import { CubeRenderer } from "./renderers/cube-renderer";
import type { Solution } from "./engine/solvers/solution";
import type { CubeSolver } from "./engine/solvers/cube-solver";
import { Side, Vector3 } from "three";
import { CubePrinter } from "./engine/cube-printer";
import { Sides } from "./engine/sides";
import type { FaceRotation } from "./engine/face-rotation";

export default defineComponent({
  name: 'App',
  async mounted() {
    // Get a reference to the container element that will hold our scene
    const container = document.getElementById('scene-container')!;
    const world = new World(container);
    world.start();

    let cube = new PocketCube();
    const cubePrinter = new CubePrinter();
    const cubeRenderers = [new CubeRenderer({ scene: world.getScene(), cube: cube, position: new Vector3(3.5, 2, 0) }),
    new CubeRenderer({ scene: world.getScene(), cube: cube, position: new Vector3(-3.5, 2, 0) })]
    console.log('Scrambling')
    const scramblingRotations = new CubeScrambler(30).scramble(cube);
    for (let rotation of scramblingRotations) {
      await Promise.all(cubeRenderers.map(cubeRenderer => cubeRenderer.rotateFace({ ...rotation, duration: 150 })));
      cube = cube.rotateFace(rotation);
    }
    console.log(cubePrinter.translateCube(cube));
    this.solve(cube, cubeRenderers, world);
  },
  methods: {
    async solve(cube: PocketCube, cubeRenderers: CubeRenderer[], world: World) {
      const cubePrinter = new CubePrinter();
      console.log('Solving')
      let solver: CubeSolver | undefined = new BreadthFirstSearch(cube);
      let solution: Solution | undefined;
      world.addAnimationLoop(() => {
        if (solver) {
          solution = solver.iterate();
          if (solution) {
            console.log(cubePrinter.translateRotations(solution.rotations));
            console.log(solution)
            this.renderSolution(cubeRenderers, solution)
            solver = undefined;
          }
        }
      });
    },
    async renderSolution(cubeRenderers: CubeRenderer[], solution: Solution) {
      for (let rotation of solution.rotations) {
        await Promise.all(cubeRenderers
          .map(cubeRenderer => cubeRenderer.rotateFace({ ...rotation, duration: 1000 })));
      }
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
