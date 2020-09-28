import { ref } from "vue";

const isExporting = ref(false);
const container = document.body;

export const useJournalExport = () => {
  return {
    isExporting,
    container
  };
};
