import { AppContext } from "@/main/context";
import { Journal, JournalEvents } from "@/shared/features/journal/types";

export const createJournalHandlers = ({ ipcService, store }: AppContext) => {
  ipcService.handle<Journal>(JournalEvents.SaveJournal, (event, journal) => {
    store.set("journal", journal);

    return true;
  });

  ipcService.handle(JournalEvents.GetJournal, () => {
    return store.get("journal", null);
  });
};
