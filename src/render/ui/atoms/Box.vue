<template>
  <div class="box" :class="{ secondary }">
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    secondary: Boolean,
  },
};
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
