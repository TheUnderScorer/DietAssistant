import { reactive, ref } from "vue";
import { Journal } from "@/shared/features/journal/types";

export const useJournal = () => {
  const journal = reactive<Journal>({
    entries: [
      {
        date: "",
        dayActivity: "",
        sleepTime: "",
        wakeTime: "",
        weekDay: "Poniedziałek"
      }
    ]
  });

  const loading = ref(true);

  setTimeout(() => {
    loading.value = false;
  }, 1500);

  return {
    journal,
    loading
  };
};
