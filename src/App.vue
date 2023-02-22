<script lang="ts">
import { PocketCube } from "@/engine/pocket-cube";
import { defineComponent } from 'vue';
import { CubeScrambler } from "./engine/cube-scrambler";
import { World } from "./renderers/world";
import { Vector3 } from "three";
import { HumanTranslator } from "./engine/human-tranlator";
import { CubeRenderer } from "./renderers/cube-renderer";
import SolversMapWorker from "./solvers/pocket-cube-solvers-map-worker?worker";
import type { Solution } from "./solvers/cube-solver";
import type { SolverWorkerResponse } from "./solvers/pocket-cube-solvers-map-worker";
import { HumanPlayer } from "./players/human-player";
import { Font, FontLoader } from "three/examples/jsm/loaders/FontLoader";

//It has to be non reactive
let world: World;
let cubeRenderer: CubeRenderer;

export default defineComponent({
  name: 'App',
  data() {
    return {
      humanEnabled: true,
      aiMethods: [
        {
          checked: true,
          name: 'BFS'
        },
        {
          checked: true,
          name: 'A*'
        },
        {
          checked: false,
          name: 'IDA'
        }],
      shuffled: false,
      font: undefined as Font | undefined,
      cube: new PocketCube() as PocketCube
    }
  },
  created() {
    new FontLoader().load('/helvetiker_regular.typeface.json', (font: Font) => {
      this.font = font;
    });
  },
  async mounted() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    //@ts-expect-error
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    const container = document.getElementById('scene-container')!;
    world = new World(container);
    world.start();
    this.createCubeRenderer();
  },
  methods: {
    createCubeRenderer() {
      if (cubeRenderer) {
        world.getScene().remove(cubeRenderer.getMesh())
      }
      cubeRenderer = new CubeRenderer({
        parent: world.getScene(),
        cube: this.cube as PocketCube,
        position: new Vector3(0, 0, 0),
        size: 3
      });
    },
    async shuffle() {
      console.log('Scrambling...')
      const scramblingRotations = new CubeScrambler(30).scramble(this.cube as PocketCube);
      console.log(new HumanTranslator().translateRotations(scramblingRotations, 5));
      this.createCubeRenderer();
      for (let rotation of scramblingRotations) {
        await cubeRenderer!.rotateFace({ ...rotation, duration: 150 });
        this.cube = this.cube.rotateFace(rotation);
      }
      console.log(new HumanTranslator().translateCube(this.cube as PocketCube));
      this.shuffled = true;
    },
    async solve() {
      const player = new HumanPlayer({
        font: this.font!,
        scene: world!.getScene(),
        rendererSize: 3,
        cube: this.cube as PocketCube,
        position: {
          from: cubeRenderer.getMesh().position,
          to: new Vector3(3, 0, 0)
        },
        title: "Human"
      });
      world!.getScene().remove(cubeRenderer.getMesh());
      // await player.remove();
      this.cube = new PocketCube();
      // const onMessage = async (event: MessageEvent<SolverWorkerResponse>) => {
      //   const solution = JSON.parse(event.data.solution!) as Solution;
      //   console.log(solution);
      //   console.log(new HumanTranslator().translateRotations(solution.rotations));
      //   for (let rotation of solution.rotations) {
      //     await renderers[event.data.id].rotateFace({ ...rotation, duration: 150 });
      //     cube = cube.rotateFace(rotation);
      //   }
      // }
      // const solversMapWorkers = [new SolversMapWorker(), new SolversMapWorker()];
      // solversMapWorkers[0].postMessage({ cube: cube.getConfiguration(), solverKey: 'a*', id: 0 });
      // solversMapWorkers[1].postMessage({ cube: cube.getConfiguration(), solverKey: 'bfs', id: 1 });
      // solversMapWorkers[0].onmessage = onMessage;
      // solversMapWorkers[1].onmessage = onMessage;
    },
  }
})

</script>

<template>
  <div class="container-fluid" style="width: 100%; height: 100%;">
    <div class="row g-4 justify-content-between">
      <div class="col-12 col-md-6">
        <div class="btn-group btn-group" role="group" aria-label="Basic checkbox toggle button group"
          style="width: 100%;">
          <input type="checkbox" v-model="humanEnabled" class="btn-check" id="btncheck0" autocomplete="off">
          <label class="btn btn-outline-info" for="btncheck0">
            Human
            <i class="fa-solid fa-circle-info" data-bs-toggle="tooltip" data-bs-placement="bottom"
              data-bs-custom-class="custom-tooltip"
              data-bs-title="Use keys WASDFX combined with shift to rotate cube faces" style="margin-left: 10px;">
            </i>
          </label>
          <template v-for="method, index in aiMethods">
            <input type="checkbox" v-model="method.checked" class="btn-check" :id="'btncheck' + (index + 1)"
              autocomplete="off">
            <label class="btn btn-outline-info" :for="'btncheck' + (index + 1)">{{ method.name }}</label>
          </template>
          <button type="button" class="btn btn-outline-info dropdown-toggle" data-bs-toggle="dropdown"
            aria-expanded="false" style="margin-left: 10px;">
            2x2
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">2x2</a></li>
          </ul>
        </div>
      </div>
      <div class="col-12 col-md-6" style="text-align: right;">
        <button type="button" class="btn btn-outline-danger mx-2 mx-md-5" @click="shuffle">Shuffle</button>
        <button type="button" class="btn btn-success"
          :disabled="!shuffled || (!humanEnabled && aiMethods.every(method => !method.checked))"
          @click="solve">Solve</button>
      </div>
    </div>
    <div class="row" style="min-height: 90%; max-height: -webkit-fill-available; background-color: transparent;">
      <div id="scene-container">
      </div>
    </div>
  </div>
</template>

<style scoped></style>
