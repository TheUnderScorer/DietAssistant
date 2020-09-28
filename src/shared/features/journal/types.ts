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
