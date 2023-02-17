<script lang="ts">
import { PocketCube } from "@/engine/pocket-cube";
import { CubeScrambler } from "./engine/cube-scrambler";
import { BreadthFirstSearch } from "./engine/solvers/breadth-first-search";
import { defineComponent } from 'vue';
import { World } from "./renderers/world";
import { CubeRenderer } from "./renderers/cube-renderer";

export default defineComponent({
  name: 'App',
  mounted() {
    // Get a reference to the container element that will hold our scene
    const container = document.getElementById('scene-container')!;
    const world = new World(container)
    let cube = new PocketCube();
    const cubeRenderer = new CubeRenderer(cube)

    world.addToScene(cubeRenderer.getMesh())
    world.addAnimationLoop((delta: number) => cubeRenderer.update(delta));
    world.start();

  },
  methods: {
    procedure() {
      let cube = new PocketCube();
      console.log('Scrambling')
      cube = new CubeScrambler(30).scramble(cube);

      console.log('Solving')
      const solution = new BreadthFirstSearch().solve(cube)
      console.log(solution)

      cube = solution.rotations
        .reduce((cube, rotation) => cube.rotateFace(rotation), cube)

      console.log('isSolved: ' + cube.isSolved())
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
