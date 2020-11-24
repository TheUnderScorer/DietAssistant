import { IpcRendererService } from "@/render/services/IpcRendererService";
import {
  EntryViewedPayload,
  Journal,
  JournalEvents,
} from "@/shared/features/journal/types";
import { createJournalEntry } from "@/shared/features/journal/createJournalEntry";
import { reactive, toRaw, watch } from "vue";
import debounce from "lodash.debounce";
import { journalEntryToRaw } from "@/render/app/journal/converters/journalEntryToRaw";
import { useJournal } from "@/render/app/journal/useJournal/useJournal";
import { makeUpdateSentence } from "@/render/app/journal/useJournal/modifiers";

export const setupJournal = (
  ipcService: IpcRendererService,
  {
    addEntry,
    removeCurrentEntry,
    activeIndex,
    journal,
    activeEntry,
  }: ReturnType<typeof useJournal>
) => {
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

  ipcService.receive(
    JournalEvents.RemoveCurrentEntryRequested,
    removeCurrentEntry
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

  watch(
    [() => activeEntry.value.weekDay, () => activeIndex.value],
    ([weekDay, activeIndex], [prevWeekDay, prevActiveIndex]) => {
      if (activeIndex === prevActiveIndex && weekDay !== prevWeekDay) {
        const updateSentence = makeUpdateSentence(
          weekDay!.toString(),
          prevWeekDay!.toString()
        );

        // We cannot use `activeEntry` here :/
        const { foods } = journal.entries[activeIndex as number];

        const newFoods = foods.map((food) => ({
          ...food,
          foodOrDrink: updateSentence(food.foodOrDrink ?? ""),
          products: updateSentence(food.products ?? ""),
          units: updateSentence(food.units ?? ""),
        }));

        journal.entries[activeIndex as number].foods = reactive(newFoods);
      }
    }
  );
};
