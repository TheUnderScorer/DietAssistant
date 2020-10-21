<template>
  <Journal />
</template>

<script lang="ts">
import { appProvider } from "@/render/providers/appProvider";
import Journal from "@/render/app/journal/Journal.vue";

export default {
  name: "App",
  components: {
    Journal,
  },
  setup() {
    appProvider();
  },
};
</script>

<style>
body {
  font-family: "Raleway", sans-serif;
}

body,
html,
#app {
  overflow: visible;
}

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

.not-selectable {
  user-select: none;
}
</style>
