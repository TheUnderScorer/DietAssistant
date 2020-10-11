import { JournalEntry } from "@/shared/features/journal/types";
import { add, format } from "date-fns";
import { pl } from "date-fns/locale";

export const createJournalEntry = (prevEntry?: JournalEntry): JournalEntry => {
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
