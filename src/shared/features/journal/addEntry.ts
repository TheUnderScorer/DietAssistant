import { Journal } from "@/shared/features/journal/types";
import { createJournalEntry } from "@/shared/features/journal/createJournalEntry";

export const addEntry = (journal: Journal) => {
  const lastEntry = journal.entries[journal.entries.length - 1];

  const newEntry = createJournalEntry(lastEntry);

  return journal.entries.push(newEntry) - 1;
};
