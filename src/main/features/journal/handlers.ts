import { AppContext } from "@/main/context";
import { Journal, JournalEvents } from "@/shared/features/journal/types";

export const createJournalHandlers = ({ ipcService, store }: AppContext) => {
  const key = "journal";

  ipcService.handle<Journal>(JournalEvents.SaveJournal, (event, journal) => {
    store.set(key, journal);

    return true;
  });

  ipcService.handle(JournalEvents.GetJournal, () => {
    return store.get(key, null);
  });

  ipcService.handle(JournalEvents.ClearJournal, async () => {
    await store.delete(key);
  });
};
