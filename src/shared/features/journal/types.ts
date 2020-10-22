export interface JournalEntry {
  weekDay?: string;
  date?: string;
  wakeTime?: string;
  sleepTime?: string;
  dayActivity?: string;
  createdAt: string;
  index: number;
  foods: FoodEntry[];
}

export interface FoodEntry {
  hour?: string;
  foodOrDrink?: string;
  products?: string;
  units?: string;
  place?: string;
}

export interface Journal {
  entries: JournalEntry[];
}

export interface EntryViewedPayload {
  index: number;
}

export enum JournalEvents {
  SaveJournal = "SaveJournal",
  GetJournal = "GetJournal",
  AddEntryRequested = "AddEntryRequested",
  ExportRequested = "ExportRequested",
  ExportAllRequested = "ExportAllRequested",
  ExportAllAsImage = "ExportAllAsImage",
  ClearJournal = "ClearJournal",
  ClearJournalRequested = "ClearJournalRequested",
  ExportJournalData = "ExportJournalData",
  JournalDataImported = "JournalDataImported",
  EntryViewed = "EntryViewed",
  GetLastViewedEntryIndex = "GetLastViewedEntryIndex",
  RemoveCurrentEntryRequested = "RemoveCurrentEntryRequested",
}

export interface ExportAllAsImagePayloadItem {
  entry: JournalEntry;
  image: string;
}

export type ExportAllAsImagePayload = ExportAllAsImagePayloadItem[];
