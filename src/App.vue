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
// import * as fontUrl from '/Coolvetica Rg_Regular.json';//'../public/helvetiker_regular.typeface.json'; //Coolvetica Rg_Regular.json'

//They have to be non reactive
let world: World;
let cubeRenderer: CubeRenderer;
let solverRenderers: SolverRenderer[] = [];
let cube = new PocketCube()
let font: Font;

async function loadFont() {
  const file = await fetch('/helvetiker_regular.typeface.json');
  // console.log(await file.text)
  new FontLoader().load('/helvetiker_regular.typeface.json', (loaded: Font) => {
    font = loaded;
  });
}
loadFont();



export default defineComponent({
  name: "App",
  components: { GithubCorner },
  data() {
    const availableDimensions = Configuration.solvers
      .map(solver => solver.dimension);
    return {
      selectedDimensionIndex: 0,
      availableDimensions: availableDimensions,
      shuffling: false,
      shuffled: false,
      shuffleMoves: "",
      solving: false,
      aiMethods: Configuration.solvers
        .find(solver => solver.dimension === availableDimensions[0])!.methods
    };
  },
  computed: {},
  watch: {
    selectedDimensionIndex() {
      this.aiMethods = Configuration.solvers
        .find(solver => solver.dimension === this.availableDimensions[this.selectedDimensionIndex])!.methods;
    },
    shuffleMoves() {
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
    async reset() {
      this.solving = false;
      await Promise.all(solverRenderers
        .map(solver => solver.remove()));
      solverRenderers = [];
      cube = new PocketCube();
      this.createCubeRenderer();
      this.shuffled = false;
      this.shuffleMoves = "";
    },
    async shuffle() {
      this.solving = false;
      this.shuffling = true;
      await Promise.all(solverRenderers
        .map(solver => solver.remove()));
      solverRenderers = [];
      const scramblingRotations = new CubeScrambler(Configuration.world.scrambleMoves).scramble(cube as PocketCube);
      this.createCubeRenderer();
      const translator = new HumanTranslator();
      let previousValue = this.shuffleMoves;
      const rotations = [];
      for (let rotation of scramblingRotations) {
        await cubeRenderer!.rotateFace({ ...rotation, duration: Configuration.world.scrambleRotationDuration });
        rotations.push(rotation);
        this.shuffleMoves = previousValue + translator.translateRotations(rotations);
        cube = cube.rotateFace(rotation);
      }
      this.shuffled = true;
      this.shuffling = false;
    },
    async solve() {
      this.shuffled = false;
      const solverKeys: string[] = this.aiMethods
        .filter(method => method.checked)
        .map(method => method.key);
      solverRenderers = solverKeys
        .map((key, index) => {
          const angle = index * (2 * Math.PI / solverKeys.length);
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
      await Promise.all(solverRenderers
        .map(solver => solver.start()));
      this.solving = false;
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
            <button type="button" class="btn btn-success w-100"
              :disabled="shuffling || !shuffled || aiMethods.every(method => !method.checked)" @click="solve">
              <span v-if="solving" class="spinner-grow spinner-grow-sm mr-2" style="margin-right: 10px;" role="status"
                aria-hidden="true"></span>
              {{ solving ? 'Solving...' : 'Solve' }}
            </button>
          </div>

        </div>





      </div>
      <div class="m-0 mt-2 mt-md-3 mx-2 col-12 col-md-12" style="text-align: center">
        <textarea rows="2" class="shuffle-moves" readonly v-model="shuffleMoves"></textarea>
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
