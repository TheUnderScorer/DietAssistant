<template>
  <div>
    <button :disabled="isExporting" class="ignore-export" @click="exportAsImg">
      Export as screenshot
    </button>
  </div>
</template>

<script lang="ts">
import { Journal, JournalEvents } from "@/shared/features/journal/types";
import html2canvas from "html2canvas";
import download from "downloadjs";
import jsPdf from "jspdf";
import { useJournalExport } from "@/render/app/journal/useJournalExport";
import { ipcRendererProviderSymbol } from "@/render/providers/ipcRendrerProvider";
import { inject } from "vue";
import { IpcRendererService } from "@/render/services/IpcRendererService";

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
    const ipcService = inject<IpcRendererService>(ipcRendererProviderSymbol);

    const { isExporting, container } = useJournalExport();

    const ignoreElements = (el: Element) =>
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

    ipcService?.receive(JournalEvents.ExportRequested, async () => {
      await exportAsImg();
    });

    return {
      exportAsImg,
      exportAsPdf,
      isExporting
    };
  }
};
</script>

<style scoped></style>
