<template>
  <div
    class="full-page-loader ignore-export p-d-flex p-flex-column p-align-center p-justify-center"
  >
    <ProgressSpinner class="p-mb-2" />
    {{ message ?? "Loading..." }}
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
  user-select: none;
  width: 100%;
  height: 100vh;
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
