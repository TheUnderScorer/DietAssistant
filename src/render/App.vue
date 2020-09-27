<template>
  <Journal />
</template>

<script lang="ts">
import { appProvider } from "@/render/providers/appProvider";
import Journal from "@/render/views/Journal.vue";

export default {
  name: "App",
  components: {
    Journal
  },
  setup() {
    appProvider();
  }
};
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
