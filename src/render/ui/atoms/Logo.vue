<template>
  <img
    crossorigin="anonymous"
    src="../../assets/logo.png"
    alt="Logo"
    class="logo img-fluid"
  />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Logo extends Vue {}
</script>

<style scoped>
.logo {
  height: 100px;
  position: absolute;
  top: -26px;
  z-index: 1;
  left: 0;
}
</style>
