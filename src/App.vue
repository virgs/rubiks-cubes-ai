<script lang="ts">
import { PocketCube } from "@/engine/pocket-cube";
import { CubeScrambler } from "./engine/cube-scrambler";
import { defineComponent } from 'vue';
import { World } from "./renderers/world";
// import { CubeRenderer } from "./renderers/cube-renderer";
import type { CubeSolver } from "./solvers/cube-solver";
import { PocketCubeBreadthFirstSearch } from "./solvers/pocket-cube-breadth-first-search";
import type { Solution } from "./solvers/solution";
import { PocketCubeAStar } from "./solvers/pocket-cube-a-star";
import { Vector3 } from "three";
import { HumanTranslator } from "./engine/human-tranlator";
import { CubeRenderer } from "./renderers/cube-renderer";

export default defineComponent({
  name: 'App',
  async mounted() {
    // Get a reference to the container element that will hold our scene
    const container = document.getElementById('scene-container')!;
    const world = new World(container);
    world.start();

    let cube = new PocketCube();
    const cubeRenderers = [];
    cubeRenderers.push(new CubeRenderer({
      scene: world.getScene(),
      cube: cube,
      position: new Vector3(3.5, 2, 0),
      size: 3
    }))
    // cubeRenderers.push(new CubeRenderer({
    //   scene: world.getScene(),
    //   cube: cube,
    //   position: new Vector3(-3.5, 2, 0),
    //   size: 3
    // }));
    console.log('Scrambling...')
    const scramblingRotations = new CubeScrambler(30).scramble(cube);
    console.log(new HumanTranslator().translateRotations(scramblingRotations));
    for (let rotation of scramblingRotations) {
      await Promise.all(cubeRenderers.map(cubeRenderer => cubeRenderer.rotateFace({ ...rotation, duration: 150 })));
      cube = cube.rotateFace(rotation);
    }
    console.log(new HumanTranslator().translateCube(cube))
    this.solve(cube, cubeRenderers, world);
  },
  methods: {
    async solve(cube: PocketCube, renderers: CubeRenderer[], world: World) {
      let solvers: Map<string, CubeSolver> = new Map();
      // solvers.set('bfs', new PocketCubeBreadthFirstSearch(cube))
      solvers.set('a*', new PocketCubeAStar(cube))

      console.log('Solving...')
      world.addAnimationLoop(() => {
        for (const [key, solver] of solvers.entries()) {
          const solution = solver.iterate();
          if (solution) {
            console.log(key, solution)
            console.log(new HumanTranslator().translateRotations(solution.rotations));
            this.renderSolution(renderers[0], solution)
            solvers.delete(key);
          }
        }
      });
    },
    async renderSolution(cubeRenderer: CubeRenderer, solution: Solution) {
      for (let rotation of solution.rotations) {
        await cubeRenderer.rotateFace({ ...rotation, duration: 500 });
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
