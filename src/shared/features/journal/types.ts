export interface JournalEntry {
  weekDay?: string;
  date?: string;
  wakeTime?: string;
  sleepTime?: string;
  dayActivity?: string;
}

export interface Journal {
  entries: JournalEntry[];
}
