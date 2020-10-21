import { JournalEntry } from "@/shared/features/journal/types";
import { curry } from "ramda";

const getMinMaxDatesEntry = curry(
  (type: "max" | "min", entries: JournalEntry[]) => {
    return entries.reduce<JournalEntry>((currentEntry, entryFromArr) => {
      const entryFromArrDate = new Date(entryFromArr.date!);
      const currentEntryDate = new Date(currentEntry.date!);

      if (
        (type === "max" && entryFromArrDate > currentEntryDate) ||
        (type === "min" && entryFromArrDate < currentEntryDate)
      ) {
        return entryFromArr;
      }

      return currentEntry;
    }, entries[0]);
  }
);

export type GetEntriesMinMaxDatesResult = [
  min: JournalEntry,
  max: JournalEntry
];

export const getEntriesMinMaxDates = (
  entries: JournalEntry[]
): GetEntriesMinMaxDatesResult => {
  const maxDateEntry = getMinMaxDatesEntry("max")(entries);
  const minDateEntry = getMinMaxDatesEntry("min")(entries);

  return [minDateEntry, maxDateEntry];
};
