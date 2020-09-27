<template>
  <img
    src="../../assets/flower.jpg"
    alt="Flower"
    class="flower-img img-fluid"
    :class="position"
  />
</template>

<script lang="ts">
export default {
  props: {
    position: String
  }
};
</script>

<style scoped lang="scss">
.flower-img {
  width: 400px;
  background: transparent;
  z-index: 1;
  position: fixed;

  &.top-right {
    transform: rotate(-70deg);
    right: -127px;
    top: -170px;
  }

  &.bottom-left {
    transform: rotate(30deg);
    left: -150px;
    bottom: -40px;
  }
}
</style>
