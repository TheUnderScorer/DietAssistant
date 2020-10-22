import { JournalEntry } from "@/shared/features/journal/types";
import { toRaw } from "vue";

export const journalEntryToRaw = (entry: JournalEntry) => ({
  ...toRaw(entry),
  foods: entry.foods.map((food) => toRaw(food)),
});
