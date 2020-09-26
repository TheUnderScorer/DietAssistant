<template>
  <div class="box" :class="{ secondary }">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";

@Options({
  props: {
    secondary: Boolean
  }
})
export default class Box extends Vue {
  secondary?: boolean = false;
}
</script>

<style scoped lang="scss">
.box {
  padding: 10px 10px 40px;
  background: #dadada;

  &.secondary {
    padding-bottom: 20px;
    background: #cce470;
  }
}
</style>
