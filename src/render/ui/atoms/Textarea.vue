<template>
  <div
    contenteditable="true"
    v-html="getContentEditableValue"
    @input="$emit('update', $event)"
    class="textarea-component editable"
  ></div>
</template>

<script lang="ts">
import { useJournalExport } from "@/render/app/journal/useJournalExport";
import { computed } from "vue";

interface TextareaProps {
  value: string;
}

export default {
  props: {
    value: String
  },
  emits: ["update"],
  setup(props: TextareaProps) {
    const { isExporting } = useJournalExport();

    const getContentEditableValue = computed(() => {
      return props.value?.replace(/\n/g, "<br>") ?? "";
    });

    return {
      isExporting,
      getContentEditableValue
    };
  }
};
</script>

<style scoped>
.textarea-component.editable {
  height: auto;
  min-height: 40px;
}
</style>
