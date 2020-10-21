import { computed, inject, reactive, ref, toRaw, watch } from "vue";
import {
  EntryViewedPayload,
  Journal,
  JournalEvents,
} from "@/shared/features/journal/types";
import debounce from "lodash.debounce";
import { ipcRendererProviderSymbol } from "@/render/providers/ipcRendrerProvider";
import { IpcRendererService } from "@/render/services/IpcRendererService";
import { createJournalEntry } from "@/shared/features/journal/createJournalEntry";
import { addEntry as addJournalEntry } from "@/shared/features/journal/addEntry";
import { journalEntryToRaw } from "@/render/converters/journalEntryToRaw";

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

const activeEntry = computed(() => journal.entries[activeIndex.value]);

const setupServices = (ipcService: IpcRendererService) => {
  ipcService.receive(JournalEvents.ClearJournalRequested, async () => {
    journal.entries = [createJournalEntry()];
    activeIndex.value = 0;
  });

  ipcService.receive(JournalEvents.AddEntryRequested, () => {
    addEntry(true);
  });

  ipcService.receive(
    JournalEvents.JournalDataImported,
    (_: unknown, importedJournal: Journal) => {
      Object.assign(journal, reactive(importedJournal));
    }
  );

  watch(activeIndex, async () => {
    await ipcService.invoke<EntryViewedPayload>(JournalEvents.EntryViewed, {
      index: activeIndex.value,
    });
  });

  watch(
    journal,
    debounce(async () => {
      const rawJournal: Journal = {
        ...toRaw(journal),
        entries: journal.entries.map(journalEntryToRaw),
      };

      await ipcService.invoke(JournalEvents.SaveJournal, rawJournal);
    }, 1000)
  );
};

export const useJournal = () => {
  const ipcService = inject<IpcRendererService>(ipcRendererProviderSymbol)!;

  if (!didInitialFetch.value && ipcService) {
    didInitialFetch.value = true;

    ipcService
      .invoke<never, Journal | null>(JournalEvents.GetJournal)
      .then(async (result) => {
        setupServices(ipcService);

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

  setTimeout(() => {
    loading.value = false;
  }, 1500);

  return {
    journal,
    loading,
    activeIndex,
    activeEntry,
    addEntry,
    didInitialFetch,
    removeEntries: () => removeEntries(ipcService),
  };
};
