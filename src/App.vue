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

import { PocketCubeAStar } from "@/solvers/pocket-cube-a-star";
import { PocketCubeBreadthFirstSearch } from "@/solvers/pocket-cube-breadth-first-search";
import { HumanSolver } from "./solvers/human-solver";

//They have to be non reactive
let world: World;
let cubeRenderer: CubeRenderer;
let solverRenderers: SolverRenderer[] = [];
let cube = new PocketCube()
let font: Font;

new FontLoader().load('/helvetiker_regular.typeface.json', (loaded: Font) => {
  // new FontLoader().load('/Coolvetica Rg_Regular.json', (loaded: Font) => {
  font = loaded;
});


export default defineComponent({
  name: 'App',
  data() {
    return {
      humanEnabled: false,
      aiMethods: [
        {
          checked: false,
          name: PocketCubeBreadthFirstSearch.getSolverTag()
        },
        {
          checked: true,
          name: PocketCubeAStar.getSolverTag()
        },
      ],
      shuffling: false,
      shuffled: false,
      shuffleMoves: ''
    }
  },
  watch: {
    shuffleMoves() {
      document.querySelector("textarea")!.scrollTop = document.querySelector("textarea")!.scrollHeight
    }
  },
  async mounted() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    //@ts-expect-error
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    const container = document.getElementById('scene-container')!;
    const navBar = document.getElementById('nav-bar')!;
    const app = document.getElementById('app')!;

    container.style.height = (app.clientHeight - navBar.clientHeight) + 'px';
    container.style.width = navBar.clientWidth * .95 + 'px';

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
        cube: cube as PocketCube,
        position: new Vector3(0, 0, 0),
        size: Configuration.renderers.cubeSize
      });
    },
    async reset() {
      await Promise.all(solverRenderers
        .map(solver => solver.remove()));
      solverRenderers = [];
      cube = new PocketCube();
      this.createCubeRenderer();
      this.shuffled = false;
      this.shuffleMoves = '';
    },
    async shuffle() {
      this.shuffling = true;
      await Promise.all(solverRenderers
        .map(solver => solver.remove()));
      solverRenderers = [];

      const scramblingRotations = new CubeScrambler(Configuration.world.scrambleMoves).scramble(cube as PocketCube);
      this.createCubeRenderer();
      const translator = new HumanTranslator();
      let previousValue = this.shuffleMoves;
      const rotations = []
      for (let rotation of scramblingRotations) {
        await cubeRenderer!.rotateFace({ ...rotation, duration: Configuration.world.scrambleRotationDuration });
        rotations.push(rotation)
        this.shuffleMoves = previousValue + translator.translateRotations(rotations)
        cube = cube.rotateFace(rotation);
      }
      this.shuffled = true;
      this.shuffling = false;
    },
    async solve() {
      this.shuffled = false;
      const solverKeys: string[] = this.aiMethods
        .filter(method => method.checked)
        .map(method => method.name);
      if (this.humanEnabled) {
        solverKeys.push(HumanSolver.getSolverTag());
      }

      solverRenderers = solverKeys
        .map((key, index) => {
          const angle = index * (2 * Math.PI / solverKeys.length)
          return new SolverRenderer({
            font: font!,
            scene: world!.getScene(),
            rendererSize: Configuration.renderers.cubeSize,
            cube: cube as PocketCube,
            position: {
              from: cubeRenderer.getMesh().position.clone(),
              angle: angle
            },
            key: key
          });
        })
        .map(renderer => {
          renderer.start();
          return renderer;
        });

      world!.getScene().remove(cubeRenderer.getMesh());
    },
  }
})

</script>

<template>
  <div class="container-fluid" style="width: 100%; height: 100%;">
    <div id="nav-bar" class="row g-4 justify-content-center">
      <div class="col-12 m-0">
        <div class="mt-5" style="text-align: center;">
          <img class="img-fluid py-2" height="64" width="48" style="max-width: 72px; min-width: 72px; max-height: 96px;"
            src="large-icon.png">
          <h2 class="title">
            Rubiks Cube AI</h2>
        </div>
      </div>
      <div class="w-100 m-0 mt-3">
      </div>
      <div class="m-0 col-12 col-md-6 px-3 px-md-5">
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
          <button type="button" class="btn btn-success dropdown-toggle" data-bs-toggle="dropdown"
            aria-expanded="false" style="margin-left: 10px;">
            2x2
            <i class="fa-solid fa-caret-down" style="float: right; margin-top: 3px;"></i>
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">2x2</a></li>
          </ul>
        </div>
      </div>
      <div class="m-0 mt-3 mt-md-0 col-12 col-md-6 px-3 px-md-5" style="text-align: right;">
        <button type="button" class="btn btn-outline-danger" @click="reset" :disabled="shuffling">Reset</button>
        <button type="button" class="btn btn-outline-danger mx-3 mx-lg-5" @click="shuffle"
          :disabled="shuffling">Shuffle</button>
        <button type="button" class="btn btn-success" style="width: 40%"
          :disabled="shuffling || !shuffled || (!humanEnabled && aiMethods.every(method => !method.checked))"
          @click="solve">Solve</button>
      </div>
      <div class="m-0 mt-2 mx-2 col-12 col-md-12" style="text-align: center">
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
