<script setup lang="ts">
import { PocketCube } from "@/engine/pocket-cube";
import { CubeScrambler } from "./engine/cube-scrambler";
import { BreadthFirstSearch } from "./engine/solvers/breadth-first-search";

let cube = new PocketCube();
console.log('scrambling')
cube = new CubeScrambler(30).scramble(cube);
console.log('isSolved: ' + cube.isSolved())

console.log('solving')
const solution = new BreadthFirstSearch().solve(cube)
console.log(JSON.stringify(solution))

// cube = solution.rotations
//   .reduce((cube, rotation) => cube.rotateFace(rotation.side), cube)

console.log('isSolved: ' + cube.isSolved())

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">

    </div>
  </header>

  <main>
</main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
