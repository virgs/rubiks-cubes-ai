<script setup lang="ts">
import { PocketCube } from "@/engine/pocket-cube";
import { Sides } from "@/engine/sides";
import { CubeScrambler } from "./engine/cube-scrambler";
import { BreadthFirstSearch } from "./engine/solvers/breadth-first-search";

let cube = new PocketCube();
cube = new CubeScrambler(10).scramble(cube);
console.log(cube.isSolved())
cube.print();
// cube.rotateFace(Sides.RIGHT);

console.log('solving')
const solution = new BreadthFirstSearch().solve(cube)
console.log(solution)
solution.rotations.map(r => console.log(Sides[r.side]))

cube = solution.rotations
  .reduce((cube, rotation) => cube.rotateFace(rotation.side), cube)

  cube.print();
  console.log(cube.isSolved())

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
