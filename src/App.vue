<script lang="ts">
import type { Cube } from "@/engine/cube";
import { defineComponent } from 'vue';
import { CubeScrambler } from "./engine/cube-scrambler";
import { World } from "./world";
import { Vector3 } from "three";
import { HumanTranslator } from "./printers/human-tranlator";
import { CubeRenderer } from "./renderers/cube-renderer";
import { SolverRenderer } from "./renderers/solver-renderer";
import { Font, FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { Configuration } from "./configuration";
import GithubCorner from "./components/GithubCorner.vue";
import fontUrl from '/Courier New_Regular.json?url' // '/helvetiker_regular.typeface.json?url';
import type { FaceRotation } from "./engine/face-rotation";
import { KeyboardInterpreter } from "./keyboard-interpreter";
import { RotationsTuner } from "./printers/rotations-tuner";
import { getAllSides, getOppositeSide, Sides } from "./constants/sides";

//They have to be non reactive
const keyboardInterpreter = new KeyboardInterpreter();
const translator = new HumanTranslator();
const tuner = new RotationsTuner();
let world: World;
let cubeRenderer: CubeRenderer;
let solverRenderers: SolverRenderer[] = [];
let cube: Cube | undefined;
let font: Font;
let shuffleMoves: FaceRotation[] = [];

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
      shuffleMovesText: '',
      solving: false,
      aiMethods: Configuration.solvers
        .find(solver => solver.dimension === availableDimensions[0])!.methods
    };
  },
  computed: {
    solver() {
      return Configuration.solvers
        .find(solver => solver.dimension === this.availableDimensions[this.selectedDimensionIndex])
    },
    mainActionButtonEnabled() {
      if (this.shuffling) {
        return false;
      }
      if (this.shuffled) {
        return this.aiMethods
          .some(method => method.checked);;
      }
      if (this.solved) {
        return true;
      }
      return false;
    }
  },
  watch: {
    selectedDimensionIndex() {
      this.reset();
      this.aiMethods = this.solver!.methods;
    },
    shuffleMovesText() {
      document.querySelector("textarea")!.scrollTop = document.querySelector("textarea")!.scrollHeight;
    }
  },
  async unmounted() {
    await this.returnCubesToStage();
  },
  async mounted() {
    const tooltipTriggerList = document.querySelectorAll("[data-bs-toggle=\"tooltip\"]");
    const tooltipList = [...tooltipTriggerList]
      //@ts-expect-error
      .map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl, { delay: { show: 500, hide: 500 } }));
    const container = document.getElementById("scene-container")!;
    const navBar = document.getElementById("nav-bar")!;
    const app = document.getElementById("app")!;
    container.style.height = (app.clientHeight - navBar.clientHeight) + "px";
    container.style.width = navBar.clientWidth * 0.95 + "px";
    world = new World(container);
    world.start();
    await this.reset();

    window.addEventListener('keypress', async (event: KeyboardEvent) => {
      solverRenderers
        .forEach(solverRenderer => solverRenderer.keyInput(event));
      switch (event.key.toLowerCase()) {
        case 'enter': this.mainActionButtonEnabled && this.mainActionButtonClick()
          break;
        case 'delete': !this.shuffling && this.reset()
          break;
        case 'r': !this.shuffling && this.shuffle()
          break;
      }
      if (!this.solving && !this.shuffling && solverRenderers.length <= 0) {
        const faceRotation = keyboardInterpreter.readKeys(event);
        if (faceRotation !== undefined) {
          shuffleMoves = tuner.tune(shuffleMoves.concat(faceRotation));
          this.shuffling = true;
          cube = cube!.rotateFace(faceRotation);
          await cubeRenderer.rotateFace(faceRotation);
          this.shuffleMovesText = translator.translateRotations(shuffleMoves, { showNumberOfMoves: true });
          this.shuffled = !cube.isSolved();
          this.shuffling = false;

          console.log(translator.translateCube(cube));
          console.log(translator.translateCubeBits(cube));
          console.log('solved', cube.isSolved())
        }
      }
    });
  },
  methods: {
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
      const sides = getAllSides();
      const sideToRotateFourTimes = Math.floor(Math.random() * sides.length);
      const oppositeSideToRotateFourTimes = getOppositeSide(sideToRotateFourTimes)
      this.shuffling = true;
      //cool animation effect
      for (let i = 0; i < 4; ++i) {
        await Promise.all([
          cubeRenderer.rotateFace({ side: sideToRotateFourTimes, duration: Configuration.renderers.rotationDuration / 2 }),
          cubeRenderer.rotateFace({ side: oppositeSideToRotateFourTimes, duration: Configuration.renderers.rotationDuration / 2, counterClockwiseDirection: true })
        ])
      }
      this.shuffling = false;
    },
    async returnCubesToStage() {
      this.solved = false;
      this.solving = false;
      await Promise.all(solverRenderers
        .map(solver => solver.remove()));
      solverRenderers = [];
      await this.createCubeRenderer();
      this.shuffled = !cube!.isSolved();
    },
    async reset() {
      cube = this.solver!.instantiator!();
      await this.returnCubesToStage();
      this.shuffleMovesText = "";
      shuffleMoves = [];
      this.shuffled = false;
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
        this.shuffleMovesText = translator.translateRotations(shuffleMoves, { showNumberOfMoves: true });
      }
      this.shuffled = !cube!.isSolved();
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
            cube: cube!,
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
            Rubiks Cubes AI</h2>
        </div>
      </div>
      <div class="w-100 m-0 mt-3">
      </div>
      <div class="m-0 col-12 col-md-6 px-3 px-md-5">
        <div class="btn-group btn-group-sm" role="group" aria-label="Basic checkbox toggle button group"
          style="width: 100%;">
          <div class="btn-group btn-group-sm" role="group">

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
            <label class="btn btn-outline-info fa-solid" :for="'btncheck' + index" data-bs-toggle="tooltip"
              data-bs-placement="bottom" :data-bs-title="method.info">{{ method.key }}
            </label>
          </template>
        </div>
      </div>
      <div class="col-12 col-md-6 m-0 mt-3 mt-md-0 px-3 px-md-5">
        <div class="row justify-content-between">
          <div class="col offset-xl-4">
            <button type="button" class="btn btn-sm btn-outline-danger w-100" @click="reset"
              :disabled="shuffling">Reset</button>
          </div>
          <div class="col">
            <button type="button" class="btn btn-sm btn-outline-danger w-100" @click="shuffle"
              :disabled="shuffling">Shuffle</button>
          </div>
          <div class="col-4">
            <button type="button" class="btn btn-sm btn-success w-100" :disabled="!mainActionButtonEnabled"
              @click="mainActionButtonClick">
              <span v-if="solving" class="spinner-grow spinner-grow-sm" style="margin-right: 10px; top: 2px" role="status"
                aria-hidden="true"></span>
              {{ solved ? 'Return' : (solving ? 'Abort' : 'Solve') }}
            </button>
          </div>
        </div>
      </div>
      <div class="m-0 mt-2 mt-md-3 mx-2 col-12 col-md-12" style="text-align: center">
        <textarea rows="2" class="shuffle-moves" readonly v-model="shuffleMovesText"></textarea>
      </div>
    </div>
    <div class="row" style="background-color: transparent;">
      <div id="scene-container" style="cursor: move;">
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
