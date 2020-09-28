<template>
  <div>
    <button :disabled="isExporting" class="ignore-export" @click="exportAsImg">
      Export as screenshot
    </button>
    <button :disabled="isExporting" class="ignore-export" @click="exportAsPdf">
      Export as pdf
    </button>
  </div>
</template>

<script lang="ts">
import { Journal } from "@/shared/features/journal/types";
import html2canvas from "html2canvas";
import download from "downloadjs";
import jsPdf from "jspdf";
import { useJournalExport } from "@/render/app/journal/useJournalExport";

interface ExportJournalProps {
  journal: Journal;
  activeIndex: number;
}

export default {
  props: {
    journal: Object,
    activeIndex: Number
  },
  setup() {
    const { isExporting, container } = useJournalExport();

    const ignoreElements = (el: HTMLElement) =>
      el.classList.contains("ignore-export");

    const wait = () => new Promise(resolve => setTimeout(resolve, 1000));

    const exportAsPdf = async () => {
      if (!container) {
        return;
      }

      isExporting.value = true;

      await wait();

      const pdf = new jsPdf("l", "px", [window.outerWidth, window.outerHeight]);

      await pdf.html(container, {
        html2canvas: {
          ignoreElements
        },
        x: 15,
        y: 15
      });

      isExporting.value = false;

      await pdf.save("dzienniczek.pdf");
    };

    const exportAsImg = async () => {
      if (!container) {
        return;
      }

      isExporting.value = true;

      await wait();

      const canvas = await html2canvas(container, {
        ignoreElements
      });

      const data = canvas.toDataURL();

      isExporting.value = false;

      download(data, "dzienniczek.png");
    };

    return {
      exportAsImg,
      exportAsPdf,
      isExporting
    };
  }
};
</script>

<style scoped></style>
