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

export default defineComponent({
  name: 'App',
  data() {
    return {
      humanEnabled: true,
      aiMethods: [
        {
          checked: true,
          name: PocketCubeBreadthFirstSearch.getSolverTag()
        },
        {
          checked: true,
          name: PocketCubeAStar.getSolverTag()
        },
      ],
      shuffled: false,
      shuffleMoves: '',
      font: undefined as Font | undefined,
      cube: new PocketCube() as PocketCube
    }
  },
  watch: {
    shuffleMoves() {
      document.querySelector("textarea")!.scrollTop = document.querySelector("textarea")!.scrollHeight
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
        cube: this.cube as PocketCube,
        position: new Vector3(0, 0, 0),
        size: Configuration.renderers.cubeSize
      });
    },
    async shuffle() {
      await Promise.all(solverRenderers
        .map(solver => solver.remove()));
      solverRenderers = [];

      const scramblingRotations = new CubeScrambler(Configuration.world.scrambleMoves).scramble(this.cube as PocketCube);
      this.createCubeRenderer();
      const translator = new HumanTranslator();
      for (let rotation of scramblingRotations) {
        await cubeRenderer!.rotateFace({ ...rotation, duration: Configuration.world.scrambleRotationDuration });
        this.shuffleMoves += translator.translateRotations([rotation])
        this.cube = this.cube.rotateFace(rotation);
      }
      this.shuffled = true;
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
            font: this.font!,
            scene: world!.getScene(),
            rendererSize: Configuration.renderers.cubeSize,
            cube: this.cube as PocketCube,
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
      this.shuffleMoves = '';
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
          <img class="img-fluid py-2" height="64" width="48" style="max-width: 48px; min-width: 48px; max-height: 64px;" src="large-icon.png">
          <h2 style="font-family: 'Courier New', Courier, monospace; font-weight: bold; color: var(--color-background);">
            Rubiks Cube AI</h2>
        </div>
      </div>
      <div class="w-100 m-0">
      </div>
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
            <i class="fa-solid fa-caret-down" style="float: right; margin-top: 3px;"></i>
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
      <div class="col-12 col-md-12">
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
  width: 100%;
  border: none;
  background-color: transparent;
  resize: none;
  color: var(--color-background);
  outline: none;


  /* white-space: nowrap;
  overflow-x: auto;
  overflow-y: hidden; */

  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

}
</style>
