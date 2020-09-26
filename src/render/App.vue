<template>
  <Journal />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Journal from "@/render/views/Journal.vue";

@Options({
  components: {
    Journal
  }
})
export default class App extends Vue {}
</script>

<style>
.img-fluid {
  max-width: 100%;
  height: auto;
}

body {
  font-family: "Raleway", sans-serif;
}

input,
textarea {
  border: none;
  background: transparent;
  width: 100%;
}
</style>
