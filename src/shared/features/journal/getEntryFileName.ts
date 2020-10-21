import { JournalEntry } from "./types";
import { format } from "date-fns";
import pl from "date-fns/locale/pl";

export const getEntryFileName = (entry: JournalEntry, ext: string) => {
  const date = new Date(entry.date!.toString());
  const weekday = format(date, "eeee", {
    locale: pl,
  });
  const dateText = format(date, "dd.MM");

  return `${weekday}${dateText}.${ext}`;
};
