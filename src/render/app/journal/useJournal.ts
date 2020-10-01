import { inject, reactive, ref, toRaw, watch } from "vue";
import {
  Journal,
  JournalEntry,
  JournalEvents
} from "@/shared/features/journal/types";
import { add, format } from "date-fns";
import { pl } from "date-fns/locale";
import debounce from "lodash.debounce";
import { ipcRendererProviderSymbol } from "@/render/providers/ipcRendrerProvider";
import { IpcRendererService } from "@/render/services/IpcRendererService";

const createJournalEntry = (prevEntry?: JournalEntry): JournalEntry => {
  const now = prevEntry?.date
    ? add(new Date(prevEntry.date), { days: 1 })
    : new Date();

  return {
    date: format(now, "yyyy-MM-dd"),
    dayActivity: "",
    sleepTime: "21:30",
    wakeTime: "05:30",
    weekDay: format(now, "eeee", {
      locale: pl
    }),
    createdAt: new Date().toISOString(),
    index: prevEntry?.index ? prevEntry.index + 1 : 0,
    foods: [
      {
        hour: "06:30",
        foodOrDrink: "Śniadanie",
        place: "Dom",
        products: "jak w przepisie na",
        units: "jak w przepisie na"
      },
      {
        hour: "10:30",
        foodOrDrink: "II śniadanie",
        place: "Dom",
        products: "jak w przepisie na",
        units: "jak w przepisie na"
      },
      {
        hour: "14:30",
        foodOrDrink: "Obiad",
        place: "Dom",
        products: "jak w przepisie na",
        units: "jak w przepisie na"
      },
      {
        hour: "18:30",
        foodOrDrink: "Kolacja",
        place: "Dom",
        products: "jak w przepisie na",
        units: "jak w przepisie na"
      }
    ]
  };
};

const didInitialFetch = ref(false);
const activeIndex = ref(0);
const loading = ref(true);
const journal = reactive<Journal>({
  entries: [createJournalEntry()]
});

export const useJournal = () => {
  const ipcService = inject<IpcRendererService>(ipcRendererProviderSymbol)!;

  const addEntry = (setAsActive = true) => {
    const lastEntry = journal.entries[journal.entries.length - 1];

    const index = journal.entries.push(createJournalEntry(lastEntry)) - 1;

    if (setAsActive) {
      activeIndex.value = index;
    }

    return index;
  };

  watch(
    journal,
    debounce(async () => {
      const rawJournal: Journal = {
        ...toRaw(journal),
        entries: journal.entries.map(entry => ({
          ...toRaw(entry),
          foods: entry.foods.map(food => toRaw(food))
        }))
      };

      await ipcService.invoke(JournalEvents.JournalUpdated, rawJournal);
    }, 1000)
  );

  setTimeout(() => {
    loading.value = false;
  }, 1500);

  return {
    journal,
    loading,
    activeIndex,
    addEntry,
    didInitialFetch
  };
};
