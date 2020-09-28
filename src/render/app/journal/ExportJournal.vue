<template>
  <div>
    <button class="ignore-export" @click="exportAsPdf">
      Export as screenshot
    </button>
  </div>
</template>

<script lang="ts">
import { Journal } from "@/shared/features/journal/types";
import html2canvas from "html2canvas";
import download from "downloadjs";

interface ExportJournalProps {
  journal: Journal;
  activeIndex: number;
  containerRef?: HTMLElement;
}

export default {
  props: {
    journal: Object,
    activeIndex: Number,
    containerRef: HTMLElement
  },
  setup(props: ExportJournalProps) {
    const exportAsPdf = async () => {
      if (!props.containerRef) {
        return;
      }

      const canvas = await html2canvas(document.body, {
        ignoreElements: el => el.classList.contains("ignore-export"),
        allowTaint: true,
        useCORS: true
      });

      const data = canvas.toDataURL();

      download(data, "dzienniczek.png");
    };

    return {
      exportAsPdf
    };
  }
};
</script>

<style scoped></style>
