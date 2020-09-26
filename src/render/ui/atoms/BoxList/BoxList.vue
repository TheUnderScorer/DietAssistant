<template>
  <ul class="box-list">
    <slot></slot>
  </ul>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class BoxList extends Vue {}
</script>

<style scoped>
.box-list {
  padding: 0;
  line-height: 25px;
  margin: 0;
}
</style>
