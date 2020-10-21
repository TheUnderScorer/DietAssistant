<template>
  <div class="full-page-loader ignore-export">
    <span>
      {{ message ?? "Loading..." }}
    </span>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    message: String,
  },
};
</script>

<style scoped lang="scss">
.full-page-loader {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  display: flex;
  align-content: center;
  justify-content: center;
  background: white;
  z-index: 3;

  span {
    margin-top: 35%;
  }
}
</style>
