<script lang="ts">
import { PocketCube } from "@/engine/pocket-cube";
import { CubeScrambler } from "./engine/cube-scrambler";
import { defineComponent } from 'vue';
import { World } from "./renderers/world";
import { CubeRenderer } from "./renderers/cube-renderer";
import { Vector3 } from "three";
import { Printer } from "./engine/printer";
import { Sides } from "./constants/sides";
import type { CubeSolver } from "./solvers/cube-solver";
import { BreadthFirstSearch } from "./solvers/pocket-cube-breadth-first-search";
import type { Solution } from "./solvers/solution";

export default defineComponent({
  name: 'App',
  async mounted() {
    // Get a reference to the container element that will hold our scene
    const container = document.getElementById('scene-container')!;
    const world = new World(container);
    world.start();

    let cube = new PocketCube().rotateFace({side: Sides.UP});
    const cubeRenderers = [new CubeRenderer({
      scene: world.getScene(),
      cube: cube,
      position: new Vector3(0.5, 2, 0),
      size: 3
    })]
    console.log('Scrambling')
    const scramblingRotations = new CubeScrambler(30).scramble(cube);
    new Printer().printRotations(scramblingRotations);
    for (let rotation of scramblingRotations) {
      await Promise.all(cubeRenderers.map(cubeRenderer => cubeRenderer.rotateFace({ ...rotation, duration: 150 })));
      cube = cube.rotateFace(rotation);
    }
    this.solve(cube, cubeRenderers, world);
  },
  methods: {
    async solve(cube: PocketCube, cubeRenderers: CubeRenderer[], world: World) {
      const cubePrinter = new Printer();
      console.log('Solving')
      let solver: CubeSolver | undefined = new BreadthFirstSearch(cube);
      let solution: Solution | undefined;
      world.addAnimationLoop(() => {
        if (solver) {
          solution = solver.iterate();
          if (solution) {
            cubePrinter.printRotations(solution.rotations);
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
          .map(cubeRenderer => cubeRenderer.rotateFace({ ...rotation, duration: 750 })));
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
