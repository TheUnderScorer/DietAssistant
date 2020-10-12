<template>
  <span
    :ref="
      el => {
        container = el;
      }
    "
  >
    <textarea
      v-resizable
      v-if="type === 'textarea'"
      :value="value"
      @input="$emit('update', $event)"
      class="textarea-component"
      @blur="handleBlur"
    ></textarea>
    <div
      v-if="type === 'div'"
      contenteditable="true"
      v-html="getContentEditableValue"
      @input="$emit('update', $event)"
      class="textarea-component editable"
      @focus="handleFocus"
    ></div>
  </span>
</template>

<script lang="ts">
import { useJournalExport } from "@/render/app/journal/useJournalExport";
import { computed, ref } from "vue";

interface TextareaProps {
  value: string;
}

export default {
  props: {
    value: String
  },
  emits: ["update"],
  setup(props: TextareaProps) {
    const container = ref<HTMLSpanElement>();

    const type = ref<"textarea" | "div">("div");

    const { isExporting } = useJournalExport();

    const getContentEditableValue = computed(() => {
      return props.value?.replace(/\n/g, "<br>") ?? "";
    });

    const handleFocus = () => {
      type.value = "textarea";

      setTimeout(() => {
        container.value?.querySelector("textarea")?.focus();
      }, 10);
    };

    const handleBlur = () => {
      type.value = "div";
    };

    return {
      isExporting,
      getContentEditableValue,
      type,
      handleFocus,
      handleBlur,
      container
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
