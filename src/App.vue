<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import {Cube} from "@/cube/cube";
import {Sides} from "@/cube/sides";

let cube = new Cube();
// cube.rotateFace(Sides.UP)
// cube.rotateFace(Sides.LEFT)
// cube.rotateFace(Sides.LEFT)
// cube.rotateFace(Sides.LEFT)
cube.rotateFace(Sides.LEFT)
cube.rotateFace(Sides.BACK)
cube.rotateFace(Sides.BACK)
cube.rotateFace(Sides.UP)
cube.rotateFace(Sides.FRONT)


cube.printFace(Sides.UP)
cube.printFace(Sides.LEFT)
cube.printFace(Sides.FRONT)
cube.printFace(Sides.RIGHT)
cube.printFace(Sides.BACK)
cube.printFace(Sides.DOWN)
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
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
