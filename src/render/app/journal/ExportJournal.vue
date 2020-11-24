<template>
  <div>
    <Button :disabled="isExporting" class="ignore-export" @click="exportAsImg">
      Export as screenshot
    </Button>
  </div>
</template>

<script lang="ts">
import { Journal } from "@/shared/features/journal/types";
import { useJournalExport } from "@/render/app/journal/useJournalExport";

export interface ExportJournalProps {
  journal: Journal;
  activeIndex: number;
}

export default {
  props: {
    journal: Object,
    activeIndex: Number,
  },
  setup() {
    const { isExporting, exportAsImg, exportAsPdf } = useJournalExport();

    return {
      exportAsImg,
      exportAsPdf,
      isExporting,
    };
  },
};
</script>

<style scoped></style>
