<script lang="ts">
import { PocketCube } from "@/engine/pocket-cube";
import { defineComponent } from 'vue';
import { CubeScrambler } from "./engine/cube-scrambler";
import { World } from "./renderers/world";
import { Vector3 } from "three";
import { HumanTranslator } from "./engine/human-tranlator";
import { CubeRenderer } from "./renderers/cube-renderer";
import { SolverRenderer } from "./renderers/solver-renderer";
import { Font, FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { Configuration } from "./configuration";
import GithubCorner from "./components/GithubCorner.vue";
import fontUrl from '/Courier New_Regular.json?url' // '/helvetiker_regular.typeface.json?url';
import type { FaceRotation } from "./engine/face-rotation";
import { KeyboardInterpreter } from "./keyboard-interpreter";

//They have to be non reactive
const keyboardInterpreter = new KeyboardInterpreter();
const translator = new HumanTranslator();
let world: World;
let cubeRenderer: CubeRenderer;
let solverRenderers: SolverRenderer[] = [];
let cube = new PocketCube();
let font: Font;

new FontLoader().load(fontUrl, (loaded: Font) => {
  font = loaded;
});

export default defineComponent({
  name: "App",
  components: { GithubCorner },
  data() {
    const availableDimensions = Configuration.solvers
      .map(solver => solver.dimension);
    return {
      selectedDimensionIndex: 0,
      availableDimensions: availableDimensions,
      solved: false,
      shuffling: false,
      shuffled: false,
      shuffleMoves: [] as FaceRotation[],
      shuffleMovesText: '',
      solving: false,
      aiMethods: Configuration.solvers
        .find(solver => solver.dimension === availableDimensions[0])!.methods
    };
  },
  computed: {
    mainActionButtonEnabled() {
      if (this.shuffled) {
        return true;
      }
      if (this.solved) {
        return true;
      }
      return this.shuffling || this.aiMethods.every(method => !method.checked);
    }
  },
  watch: {
    selectedDimensionIndex() {
      this.aiMethods = Configuration.solvers
        .find(solver => solver.dimension === this.availableDimensions[this.selectedDimensionIndex])!.methods;
    },
    shuffleMovesText() {
      document.querySelector("textarea")!.scrollTop = document.querySelector("textarea")!.scrollHeight;
    }
  },
  async mounted() {
    const tooltipTriggerList = document.querySelectorAll("[data-bs-toggle=\"tooltip\"]");
    const tooltipList = [...tooltipTriggerList]
      //@ts-expect-error
      .map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl, { delay: { show: 0, hide: 1500 } }));
    const container = document.getElementById("scene-container")!;
    const navBar = document.getElementById("nav-bar")!;
    const app = document.getElementById("app")!;
    container.style.height = (app.clientHeight - navBar.clientHeight) + "px";
    container.style.width = navBar.clientWidth * 0.95 + "px";
    world = new World(container);
    world.start();
    this.createCubeRenderer();

    window.addEventListener('keypress', async (event: KeyboardEvent) => {
      solverRenderers
        .forEach(solverRenderer => solverRenderer.keyInput(event));
      if (!this.solving && !this.shuffling && solverRenderers.length <= 0) {
        const faceRotation = keyboardInterpreter.readKeys(event);
        if (faceRotation !== undefined) {
          this.shuffleMoves.push(faceRotation);
          this.shuffling = true;
          cube = cube.rotateFace(faceRotation);
          await cubeRenderer.rotateFace(faceRotation);
          this.shuffleMovesText = translator.translateRotations(this.shuffleMoves, { showNumberOfMoves: true });
          this.shuffled = !cube.isSolved();
          this.shuffling = false;
        }
      }
    });

  },
  methods: {
    createCubeRenderer() {
      if (cubeRenderer) {
        world.getScene().remove(cubeRenderer.getMesh());
      }
      cubeRenderer = new CubeRenderer({
        parent: world.getScene(),
        cube: cube as PocketCube,
        position: new Vector3(0, 0, 0),
        size: Configuration.renderers.cubeSize
      });
    },
    async returnCubesToStage() {
      this.solved = false;
      this.solving = false;
      await Promise.all(solverRenderers
        .map(solver => solver.remove()));
      solverRenderers = [];
      this.createCubeRenderer();
      this.shuffled = !cube.isSolved();
    },
    async reset() {
      await this.returnCubesToStage();
      this.shuffleMovesText = "";
      this.shuffleMoves = [];
      cube = new PocketCube();
      this.shuffled = false;
    },
    async shuffle() {
      await this.returnCubesToStage();

      this.shuffling = true;
      const scramblingRotations = new CubeScrambler(Configuration.world.scrambleMoves).scramble(cube as PocketCube);
      for (let rotation of scramblingRotations) {
        await cubeRenderer!.rotateFace({ ...rotation, duration: Configuration.world.scrambleRotationDuration });
        this.shuffleMoves.push(rotation);
        cube = cube.rotateFace(rotation);
        this.shuffleMovesText = translator.translateRotations(this.shuffleMoves, { showNumberOfMoves: true });
      }
      this.shuffled = !cube.isSolved();
      this.shuffling = false;
    },
    async mainActionButtonClick() {
      if (this.solving || this.solved) {
        this.returnCubesToStage();
        this.solving = false;
        return;
      }
      const solverKeys: string[] = this.aiMethods
        .filter(method => method.checked)
        .map(method => method.key);
      solverRenderers = solverKeys
        .map((key, index) => {
          const angle = Math.PI * .25 + index * (2 * Math.PI / solverKeys.length);
          return new SolverRenderer({
            font: font!,
            scene: world!.getScene(),
            rendererSize: Configuration.renderers.cubeSize,
            cube: cube as PocketCube,
            position: {
              from: cubeRenderer.getMesh().position.clone(),
              angle: angle
            },
            dimensionKey: this.availableDimensions[this.selectedDimensionIndex],
            key: key
          });
        });
      world!.getScene().remove(cubeRenderer.getMesh());
      this.solving = true;
      try {
        await Promise.all(solverRenderers
          .map(solver => solver.start()));
        this.shuffled = false;
        this.solving = false;
        this.solved = true;
      } catch (e) {
        console.log(e)
      }
    },
  },
})

</script>

<template>
  <div class="container-fluid" style="width: 100%; height: 100%;">
    <div id="nav-bar" class="row g-4 justify-content-center">
      <div class="col-12 m-0 p-0">
        <div class="mt-5" style="text-align: center;">
          <GithubCorner></GithubCorner>
          <img class="img-fluid py-2" height="64" width="48" style="max-width: 72px; min-width: 72px; max-height: 96px;"
            src="/large-icon.png">
          <h2 class="title">
            Rubiks Cube AI</h2>
        </div>
      </div>
      <div class="w-100 m-0 mt-3">
      </div>
      <div class="m-0 col-12 col-md-6 px-3 px-md-5">
        <div class="btn-group btn-group" role="group" aria-label="Basic checkbox toggle button group"
          style="width: 100%;">
          <div class="btn-group" role="group">

            <button type="button" class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa-solid fa-caret-down"></i>
              <span class="mx-2">
                {{ availableDimensions[selectedDimensionIndex] }}
              </span>
            </button>
            <ul class="dropdown-menu">
              <li v-for="dimension, index in availableDimensions" @click="selectedDimensionIndex = index"><a
                  class="dropdown-item" href="#">{{ dimension }}</a></li>
            </ul>
          </div>
          <template v-for="method, index in aiMethods">
            <input type="checkbox" v-model="method.checked" class="btn-check" :id="'btncheck' + index" autocomplete="off">
            <label class="btn btn-outline-info" :for="'btncheck' + index">{{ method.key }}
              <i v-if="method.info" class="fa-solid fa-circle-info" data-bs-toggle="tooltip" data-bs-placement="bottom"
                data-bs-custom-class="custom-tooltip" :data-bs-title="method.info">
              </i>
            </label>
          </template>
        </div>
      </div>
      <div class="col-12 col-md-6 m-0 mt-3 mt-md-0 px-3 px-md-5">
        <div class="row justify-content-between">
          <div class="col-auto offset-lg-3">
            <button type="button" class="btn btn-outline-danger w-100" @click="reset" :disabled="shuffling">Reset</button>
          </div>
          <div class="col-auto">
            <button type="button" class="btn btn-outline-danger w-100" @click="shuffle"
              :disabled="shuffling">Shuffle</button>
          </div>
          <div class="col-4">
            <button type="button" class="btn btn-success w-100" :disabled="!mainActionButtonEnabled"
              @click="mainActionButtonClick">
              <span v-if="solving" class="spinner-grow spinner-grow-sm mr-2" style="margin-right: 10px;" role="status"
                aria-hidden="true"></span>
              {{ solved ? 'Return' : (solving ? 'Solving' : 'Solve') }}
            </button>
          </div>
        </div>
      </div>
      <div class="m-0 mt-2 mt-md-3 mx-2 col-12 col-md-12" style="text-align: center">
        <textarea rows="2" class="shuffle-moves" readonly v-model="shuffleMovesText"></textarea>
      </div>
    </div>
    <div class="row" style="background-color: transparent;">
      <div id="scene-container">
      </div>
    </div>
  </div>
</template>

<style>
.dropdown-toggle::after {
  display: none !important;
}

.shuffle-moves {
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.1rem;
  font-weight: bold;
  width: 90%;
  border: none;
  background-color: transparent;
  resize: none;
  color: var(--color-background);
  outline: none;
  overflow-y: auto;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

}

.title {
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  color: var(--color-background);
}
</style>
