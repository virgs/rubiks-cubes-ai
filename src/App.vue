<script lang="ts">
import { PocketCube } from "@/engine/pocket-cube";
import { CubeScrambler } from "./engine/cube-scrambler";
import { BreadthFirstSearch } from "./engine/solvers/breadth-first-search";
import { defineComponent } from 'vue';
import { World } from "./renderers/world";
import { CubeRenderer } from "./renderers/cube-renderer";

export default defineComponent({
  name: 'App',
  async mounted() {
    // Get a reference to the container element that will hold our scene
    const container = document.getElementById('scene-container')!;
    const world = new World(container)
    let cube = new PocketCube();
    const cubeRenderer = new CubeRenderer({scene: world.getScene(), cube: cube})

    world.start();

    const scrambling = new CubeScrambler(30).scramble(cube);
    for (let rotation of scrambling) {
      await cubeRenderer.rotate({...rotation, duration: 1000})
    }
  },
  methods: {
    procedure() {
      let cube = new PocketCube();
      console.log('Scrambling')
      const scrambling = new CubeScrambler(30).scramble(cube);
      cube = scrambling
        .reduce((cube, rotation) => cube.rotateFace(rotation), cube)

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
