import { computed, inject, reactive, ref } from "vue";
import { Journal, JournalEvents } from "@/shared/features/journal/types";
import { ipcRendererProviderSymbol } from "@/render/providers/ipcRendrerProvider";
import { IpcRendererService } from "@/render/services/IpcRendererService";
import { createJournalEntry } from "@/shared/features/journal/createJournalEntry";
import { addEntry as addJournalEntry } from "@/shared/features/journal/addEntry";
import { setupJournal } from "@/render/app/journal/useJournal/setupJournal";

const didInitialFetch = ref(false);
const activeIndex = ref(0);
const loading = ref(true);

const journal = reactive<Journal>({
  entries: [createJournalEntry()],
});

const addEntry = (setAsActive = true) => {
  const index = addJournalEntry(journal);

  if (setAsActive) {
    activeIndex.value = index;
  }

  return index;
};

const removeEntries = async (ipcService: IpcRendererService) => {
  if (!window.confirm("Are you sure you want to remove all entries?")) {
    return;
  }

  await ipcService.invoke(JournalEvents.ClearJournal);

  journal.entries = [createJournalEntry()];
  activeIndex.value = 0;
};

const removeCurrentEntry = () => {
  if (journal.entries.length <= 1) {
    return;
  }

  const index = activeIndex.value;

  journal.entries.splice(index, 1);

  activeIndex.value = journal.entries.length - 1;
};

const activeEntry = computed(() => journal.entries[activeIndex.value]);

export const useJournal = () => {
  const ipcService = inject<IpcRendererService>(ipcRendererProviderSymbol)!;

  setTimeout(() => {
    loading.value = false;
  }, 1500);

  const hookResult = {
    journal,
    loading,
    activeIndex,
    activeEntry,
    addEntry,
    didInitialFetch,
    removeCurrentEntry,
    removeEntries: () => removeEntries(ipcService),
  };

  if (!didInitialFetch.value && ipcService) {
    didInitialFetch.value = true;

    ipcService
      .invoke<never, Journal | null>(JournalEvents.GetJournal)
      .then(async (result) => {
        setupJournal(ipcService, hookResult);

        if (!result?.entries?.length) {
          return;
        }

        Object.assign(journal, reactive(result));

        const lastActiveIndex = await ipcService.invoke<never, number | null>(
          JournalEvents.GetLastViewedEntryIndex
        );

        if (typeof lastActiveIndex === "number") {
          activeIndex.value = lastActiveIndex;
        }
      })
      .catch(console.error);
  }

  return hookResult;
};
