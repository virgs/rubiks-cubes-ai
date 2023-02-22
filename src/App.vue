<script lang="ts">
import { PocketCube } from "@/engine/pocket-cube";
import { defineComponent } from 'vue';
import { CubeScrambler } from "./engine/cube-scrambler";
import { World } from "./renderers/world";
import { Object3D, Vector3 } from "three";
import { HumanTranslator } from "./engine/human-tranlator";
import { CubeRenderer } from "./renderers/cube-renderer";
import SolversMapWorker from "./solvers/pocket-cube-solvers-map-worker?worker";
import type { Solution } from "./solvers/cube-solver";
import type { SolverWorkerResponse } from "./solvers/pocket-cube-solvers-map-worker";
import { Group } from "@tweenjs/tween.js";
import { HumanRenderer } from "./renderers/human-renderer";

export default defineComponent({
  name: 'App',
  async mounted() {
    const container = document.getElementById('scene-container')!;
    const world = new World(container);
    world.start();

    let cube = new PocketCube();
    const cubeRenderer = new CubeRenderer({
      parent: world.getScene(),
      cube: cube,
      position: new Vector3(0, 0, 0),
      size: 3
    });

    console.log('Scrambling...')
    const scramblingRotations = new CubeScrambler(3).scramble(cube);
    console.log(new HumanTranslator().translateRotations(scramblingRotations));
    for (let rotation of scramblingRotations) {
      await cubeRenderer.rotateFace({ ...rotation, duration: 150 });
      cube = cube.rotateFace(rotation);
    }

    new HumanRenderer({
      scene: world.getScene(),
      rendererSize: 3,
      cube: cube,
      position: {
        from: cubeRenderer.getMesh().position,
        to: new Vector3(3, 0, 0)
      },
      title: "Human"
    });
    world.getScene().remove(cubeRenderer.getMesh());
    // cubeRenderers.push()
    // cubeRenderers.push(new CubeRenderer({
    //   parent: group,
    //   cube: cube,
    //   position: new Vector3(3.5, 2, 0),
    //   size: 3
    // }));
    // console.log(new HumanTranslator().translateCube(cube))
    // this.solve(cube, cubeRenderers);
  },
  methods: {
    async solve(cube: PocketCube, renderers: CubeRenderer[]) {
      const onMessage = async (event: MessageEvent<SolverWorkerResponse>) => {
        const solution = JSON.parse(event.data.solution!) as Solution;
        console.log(solution);
        console.log(new HumanTranslator().translateRotations(solution.rotations));
        for (let rotation of solution.rotations) {
          await renderers[event.data.id].rotateFace({ ...rotation, duration: 150 });
          cube = cube.rotateFace(rotation);
        }
      }
      const solversMapWorkers = [new SolversMapWorker(), new SolversMapWorker()];
      solversMapWorkers[0].postMessage({ cube: cube.getConfiguration(), solverKey: 'a*', id: 0 });
      solversMapWorkers[1].postMessage({ cube: cube.getConfiguration(), solverKey: 'bfs', id: 1 });
      solversMapWorkers[0].onmessage = onMessage;
      solversMapWorkers[1].onmessage = onMessage;
    },
  }
})

</script>

<template>
  <div id="scene-container">
  </div>
</template>

<style scoped>
#scene-container {
  min-height: 100%;
  min-width: 100%;
}
</style>
