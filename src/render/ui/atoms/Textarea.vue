<template>
  <component
    v-resizable
    :is="isExport ? 'div' : 'textarea'"
    :contenteditable="isExport ? 'true' : ''"
    :value="value"
    v-html="isExport ? value : null"
    @input="$emit('update', $event.target.value)"
    class="textarea-component"
  ></component>
</template>

<script lang="ts">
export default {
  props: {
    value: String,
    isExport: Boolean
  },
  emits: ["update"]
};
</script>

<style scoped></style>
