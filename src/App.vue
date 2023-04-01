<script lang="ts">
import { defineComponent } from 'vue';
import { CubeScrambler } from "./engine/cube-scrambler";
import { World } from "./world";
import { Vector3 } from "three";
import { HumanTranslator } from "./printers/human-translator";
import { CubeRenderer } from "./renderers/cube-renderer";
import { SolverRenderer } from "./renderers/solver-renderer";
import { Font, FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { Configuration } from "./configuration";
import GithubCorner from "./components/GithubCorner.vue";
import fontUrl from '/Courier New_Regular.json?url' // '/helvetiker_regular.typeface.json?url';
import type { FaceRotation } from "./engine/face-rotation";
import { KeyboardInterpreter } from "./keyboard-interpreter";
import { RotationsTuner } from "./printers/rotations-tuner";
import { getAllSides } from "./constants/sides";
import * as Tween from '@tweenjs/tween.js'
import type { RubiksCube } from './engine/rubiks-cube';
import { UrlQueryHandler } from './url-query-handler';

//They have to be non reactive
const urlQueryHandler = new UrlQueryHandler();
const keyboardInterpreter = new KeyboardInterpreter();
const translator = new HumanTranslator();
const tuner = new RotationsTuner();
let world: World;
let cubeRenderer: CubeRenderer;
let solverRenderers: SolverRenderer[] = [];
let cube: RubiksCube;
let font: Font;
new FontLoader().load(fontUrl, (loaded: Font) => {
  font = loaded;
});


let initialMethods: string[] = urlQueryHandler.getParameterByName('methods', '')
  .split(',');
let urlShuffleMoves: FaceRotation[] = translator
  .convertStringToFaceRotations(urlQueryHandler.getParameterByName('moves', ''))
  .flat();
let shuffleMoves: FaceRotation[] = urlShuffleMoves;

export default defineComponent({
  name: "App",
  components: { GithubCorner },
  data() {
    return {
      currentLayer: 1,
      cubeTypes: Configuration.cubeTypes,
      selectedDimensionIndex: parseInt(urlQueryHandler.getParameterByName('cube', Configuration.initiallySelectedCubeTypeIndex)),
      finishedSolving: false,
      shuffling: false,
      shuffled: urlShuffleMoves.length > 0,
      shuffleMovesText: '',
      solving: false,
      timer: 0
    };
  },
  computed: {
    badgeLayerNumberIsEnabled() {
      return (method: any): boolean => {
        return method.checked && method.key.toLowerCase() === 'human' && this.selectedCubeType.dimension > 2;
      };
    },
    selectedCubeType() {
      return this.cubeTypes[this.selectedDimensionIndex];
    },
    mainButtonLabel() {
      const timeLabel = ` ${(this.timer / 1000).toFixed(1)}s`;
      if (this.solving) {
        return `Abort ${timeLabel}`;
      }
      if (!this.finishedSolving) {
        return 'Solve';
      }
      if (this.finishedSolving) {
        return `Return ${timeLabel}`;
      }
    },
    mainActionButtonEnabled() {
      if (this.selectedCubeType.methods
        .every(method => !method.checked)) {
        return false;
      }
      if (this.shuffling) {
        return false;
      }
      if (!this.shuffled && !this.finishedSolving) {
        return false;
      }
      if (this.finishedSolving) {
        return true;
      }
      return true;
    }
  },
  watch: {
    selectedCubeType: {
      handler() {
        //updates the methods being used
        this.updateUrl();
      },
      deep: true
    },
    selectedDimensionIndex() {
      this.refreshTooltips();
      this.reset();
      translator.printCube(cube);
      this.updateUrl();
    },
    shuffleMovesText() {
      document.querySelector("textarea")!.scrollTop = document.querySelector("textarea")!.scrollHeight;
    }
  },
  async unmounted() {
    await this.returnCubesToStage();
  },
  async mounted() {
    this.refreshTooltips();
    const container = document.getElementById("scene-container")!;
    const navBar = document.getElementById("nav-bar")!;
    const app = document.getElementById("app")!;
    container.style.height = (app.clientHeight - navBar.clientHeight) + "px";
    container.style.width = navBar.clientWidth * 0.95 + "px";
    world = new World(container);
    world.start();
    await this.reset();

    shuffleMoves = urlShuffleMoves;
    this.shuffleMovesText = translator.translateRotations(urlShuffleMoves, {
      showNumberOfMoves: true,
      showLayer: this.selectedCubeType.dimension > 3,
      subscript: true
    });
    this.selectedCubeType.methods
      .forEach(method => method.checked = initialMethods.includes(method.key));
    this.shuffling = true;
    for (let faceRotation of shuffleMoves) {
      await cubeRenderer.rotateFace({ ...faceRotation, duration: Configuration.world.scrambleRotationDuration });
      cube = cube.rotateFace(faceRotation);
      this.shuffled = true;
    }
    this.shuffling = false;
    this.updateUrl();
    window.addEventListener('keypress', async (event: KeyboardEvent) => {
      solverRenderers
        .forEach(solverRenderer => solverRenderer.keyInput(event));
        console.log(event.key.toLowerCase())
      switch (event.key.toLowerCase()) {
        case 'enter': this.mainActionButtonEnabled && this.mainActionButtonClick()
          break;
        case '\\': 
        case 'delete': !this.shuffling && this.reset()
        break;
        case ']': !this.shuffling && this.shuffle()
          break;
      }
      const layer = Number(event.key.toLowerCase())
      if (!Number.isNaN(layer) && layer > 0 && layer < this.selectedCubeType.dimension) {
        this.currentLayer = layer;
      }
      if (!this.solving && !this.shuffling && solverRenderers.length <= 0) {
        const faceRotation = keyboardInterpreter.readKeys(event, this.currentLayer - 1);
        if (faceRotation !== undefined) {
          shuffleMoves = tuner.tune(shuffleMoves.concat(faceRotation));
          this.shuffling = true;
          cube = cube!.rotateFace(faceRotation);
          await cubeRenderer.rotateFace(faceRotation);
          this.shuffleMovesText = translator.translateRotations(shuffleMoves, {
            showNumberOfMoves: true,
            showLayer: this.selectedCubeType.dimension > 3,
            subscript: true
          });
          this.shuffled = !cube.isSolved();
          this.shuffling = false;
        }
      }
      this.updateUrl();
    });
  },
  methods: {
    refreshTooltips() {
      const tooltipTriggerList = document.querySelectorAll("[data-bs-toggle=\"tooltip\"]");

      Array.from(tooltipTriggerList)
        .forEach(tooltipTriggerEl => {
          //@ts-expect-error
          return new bootstrap.Tooltip(tooltipTriggerEl, { delay: { show: 500, hide: 500 } })
        });

    },
    async coolEffect() {
      const sides = getAllSides();
      const sideToRotateFourTimes = Math.floor(Math.random() * sides.length);
      this.shuffling = true;
      //cool animation effect
      for (let i = 0; i < 4; ++i) {
        await Promise.all(Array
          .from(new Array(cube!.getDimension()))
          .map((_, layer) => cubeRenderer.rotateFace({
            side: sideToRotateFourTimes,
            duration: Configuration.renderers.rotationDuration,
            layer: layer,
            easing: Tween.Easing.Circular.InOut
          })))
      }
      this.shuffling = false;

    },
    async createCubeRenderer() {
      if (cubeRenderer) {
        world.getScene().remove(cubeRenderer.getMesh());
      }
      cubeRenderer = new CubeRenderer({
        parent: world.getScene(),
        cube: cube!,
        position: new Vector3(0, 0, 0),
        size: Configuration.renderers.cubeSize
      });
      world.bringCameraToTheCenter();
    },
    async returnCubesToStage() {
      this.shuffling = true;
      await Promise.all(solverRenderers
        .map(solver => solver.remove()));
      solverRenderers
        .forEach(sr => {
          world.getScene().remove(sr.getCubeMesh())
        });
      this.shuffling = false;
      solverRenderers = [];
      await this.createCubeRenderer();
      this.shuffled = !cube.isSolved();
      this.timer = 0;
      this.solving = false;
      this.finishedSolving = false;
    },
    async reset() {
      cube = this.selectedCubeType!.instantiator!();
      this.currentLayer = 1;
      await this.returnCubesToStage();
      await this.coolEffect();
      this.shuffleMovesText = "";
      shuffleMoves = [];
      this.shuffled = false;
      this.updateUrl();
    },
    async shuffle() {
      await this.returnCubesToStage();

      this.shuffling = true;
      const newRotations = new CubeScrambler(Configuration.world.scrambleMoves * 2)
        .scramble(cube!)
      const scramblingRotations = tuner.tune(newRotations)
        .filter((_, index) => index < Configuration.world.scrambleMoves);
      for (let rotation of scramblingRotations) {
        await cubeRenderer!.rotateFace({ ...rotation, duration: Configuration.world.scrambleRotationDuration });
        shuffleMoves.push(rotation);
        cube = cube!.rotateFace(rotation);
        this.shuffleMovesText = translator.translateRotations(shuffleMoves, {
          showNumberOfMoves: true,
          showLayer: this.selectedCubeType.dimension > 3,
          subscript: true
        });
        this.updateUrl();
      }
      this.shuffled = !cube!.isSolved();
      this.shuffling = false;
    },
    async mainActionButtonClick() {
      if (this.solving || this.finishedSolving) {
        return this.returnCubesToStage();
      }
      const solverKeys: string[] = this.selectedCubeType.methods
        .filter(method => method.checked)
        .map(method => method.key);
      solverRenderers = solverKeys
        .map((key, index) => {
          const angle = Math.PI * .25 + index * (2 * Math.PI / solverKeys.length);
          return new SolverRenderer({
            font: font!,
            scene: world!.getScene(),
            rendererSize: Configuration.renderers.cubeSize,
            cube: cube!,
            position: {
              from: cubeRenderer.getMesh().position.clone(),
              angle: angle
            },
            dimension: this.selectedCubeType.dimension,
            label: this.selectedCubeType.label,
            key: key
          });
        });
      world!.getScene().remove(cubeRenderer.getMesh());
      world.sendCameraAwayFromTheCenter();
      this.solving = true;
      const startTime = Date.now();
      const interval = setInterval(() => this.timer = Date.now() - startTime, 100);
      try {
        const results = await Promise.allSettled(solverRenderers
          .map(solver => solver.start()));
        results
          .filter(result => result.status === 'rejected')
          .map(result => result as PromiseRejectedResult)
          .forEach(result => console.log(result.reason))
      } catch (e) {
        console.log(e)
      }
      this.finishedSolving = true;
      this.shuffled = false;
      this.solving = false;
      clearInterval(interval);
    },
    updateUrl() {
      let afterMovesNumber = this.shuffleMovesText;
      if (afterMovesNumber.indexOf(':') > -1) {
        afterMovesNumber = afterMovesNumber.split(':')[1]
      }
      if (afterMovesNumber) {
        afterMovesNumber = afterMovesNumber.split(/\s+/).join(',')
        if (afterMovesNumber.startsWith(',')) {
          afterMovesNumber = afterMovesNumber.substring(1);
        }
      } else {
        afterMovesNumber = ''
      }

      const params: any = {
        cube: this.selectedDimensionIndex,
        methods: this.selectedCubeType.methods
          .filter(method => method.checked)
          .map(method => method.key),
        moves: afterMovesNumber,
      }
      history.replaceState(
        {},
        null as unknown as string,
        '?' +
        Object.keys(params)
          .map(key => {
            return (
              key + '=' + params[key]
            )
          })
          .join('&')
      )
    }
  }
})

</script>

<template>
  <GithubCorner></GithubCorner>
  <div class="container-fluid px-0" style="width: 100%; height: 100%;">
    <div id="nav-bar" class="row justify-content-center align-items-center gx-2 mx-lg-5 mx-2">
      <div class="col-12 col-lg-auto mt-2 mt-lg-3" style="text-align: center;">
        <img class="img-fluid mr-2 pr-2" height="64" width="48"
          style="max-width: 72px; min-width: 72px; max-height: 96px;display: inline-block; margin-right: 10px;"
          src="/large-icon.png">
        <h2 class="title" style="display: inline-block;">
          Rubiks Cubes AI</h2>
      </div>
      <div class="w-100"></div>
      <div class="col-12 col-lg m-0 px-3 my-3">
        <div class="btn-group btn-group-sm" role="group" aria-label="Basic checkbox toggle button group"
          style="width: 100%;">
          <div class="btn-group btn-group-sm" role="group">

            <button type="button" class="btn btn-success dropdown-toggle" :disabled="shuffling" data-bs-toggle="dropdown"
              aria-expanded="false">
              <i class="fa-solid fa-caret-down"></i>
              <span class="mx-2">
                {{ selectedCubeType.label }}
              </span>
            </button>
            <ul class="dropdown-menu">
              <li v-for="item, index in cubeTypes"
                @click="selectedDimensionIndex = (shuffling ? selectedDimensionIndex : index)">
                <a class="dropdown-item" href="#">{{ item.label }}</a>
              </li>
            </ul>
          </div>
          <template v-for="method, index in selectedCubeType.methods" :key="selectedCubeType.label + method.key">
            <input type="checkbox" v-model="method.checked" class="btn-check"
              :id="'btncheck' + selectedCubeType.dimension + index" autocomplete="off">
            <label class="btn btn-outline-info fa-solid" :for="'btncheck' + selectedCubeType.dimension + index"
              data-bs-toggle="tooltip" data-bs-placement="bottom" :data-bs-title="method.info">{{ method.key }}
              <span v-if="badgeLayerNumberIsEnabled(method)"
                style="margin-left: 10px; color: var(--bs-btn-active-color); background-color: var(--color-text) !important;"
                class="badge bg-secondary">{{ currentLayer }}</span>
            </label>
          </template>
        </div>
      </div>
      <div class="col-12 col-lg m-0 px-3">
        <div class="row justify-content-between">
          <div class="col">
            <button type="button" class="btn btn-sm btn-outline-danger w-100" @click="reset"
              :disabled="shuffling || solving">Reset</button>
          </div>
          <div class="col">
            <button type="button" class="btn btn-sm btn-outline-danger w-100" @click="shuffle"
              :disabled="shuffling || solving">Shuffle</button>
          </div>
          <div class="col-4">
            <button type="button" :class="[`btn w-100 btn-sm ${solving ? 'btn-danger' : 'btn-success'}`]"
              :disabled="!mainActionButtonEnabled" @click="mainActionButtonClick">
              <span v-if="solving" class="spinner-grow spinner-grow-sm" style="margin-right: 10px; top: 2px" role="status"
                aria-hidden="true"></span>
              {{ mainButtonLabel }}
            </button>
          </div>
        </div>
      </div>
      <div class="m-0 mt-2 mt-md-3 mx-2 col-12 col-md-12" style="text-align: center">
        <textarea rows="2" class="shuffle-moves" readonly v-model="shuffleMovesText"></textarea>
      </div>
    </div>
    <div class="row m-0 p-0 w-100" style="background-color: transparent;">
      <div id="scene-container" style="cursor: move; background-color: transparent;">
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
  color: var(--color-heading);
  resize: none;
  outline: none;
  overflow-y: auto;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

}

.title {
  font-family: 'Courier New', Courier, monospace;
  font-weight: bold;
  color: var(--color-heading);
}
</style>
