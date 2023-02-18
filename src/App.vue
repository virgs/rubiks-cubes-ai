<script lang="ts">
import { PocketCube } from "@/engine/pocket-cube";
import { CubeScrambler } from "./engine/cube-scrambler";
import { BreadthFirstSearch } from "./engine/solvers/breadth-first-search";
import { defineComponent } from 'vue';
import { World } from "./renderers/world";
import { CubeRenderer } from "./renderers/cube-renderer";
import type { FaceRotation } from "./engine/face-rotation";
import { Sides } from "./engine/sides";

export default defineComponent({
  name: 'App',
  async mounted() {
    // Get a reference to the container element that will hold our scene
    const container = document.getElementById('scene-container')!;
    const world = new World(container)
    world.start();

    let cube = new PocketCube();
    const cubeRenderer = new CubeRenderer({ scene: world.getScene(), cube: cube })
    console.log('Scrambling')
    // cube = cube.rotateFace({side: Sides.UP})
    // cubeRenderer.rotateFace({side: Sides.UP})
    const scramblingRotations = new CubeScrambler(30).scramble(cube);
    this.printRotations(scramblingRotations)
    for (let rotation of scramblingRotations) {
      await cubeRenderer.rotateFace({ ...rotation, duration: 100 });
      cube = cube.rotateFace(rotation);
    }
    console.log('Solving')
    const solution = new BreadthFirstSearch().solve(cube)

    console.log('Solved', solution)
    this.printRotations(solution.rotations);
    for (let rotation of solution.rotations) {
      await cubeRenderer.rotateFace({ ...rotation, duration: 500 });
      cube = cube.rotateFace(rotation);
    }
    console.log('isSolved: ' + cube.isSolved())
  },
  methods: {
    printRotations(rotations: FaceRotation[]) {
      let text = '';
      rotations
        .forEach((rotation: FaceRotation, index: number) => {
          text += `${Sides[rotation.side].substring(0, 1)}${rotation.counterClockwiseDirection ? '\'' : ''}. `;
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
