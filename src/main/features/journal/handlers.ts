import { AppContext } from "@/main/context";
import { Journal, JournalEvents } from "@/shared/features/journal/types";

export const createJournalHandlers = ({
  ipcService,
  journalService
}: AppContext) => {
  ipcService.handle<Journal>(
    JournalEvents.SaveJournal,
    async (event, journal) => {
      await journalService.saveJournal(journal);

      return true;
    }
  );

  ipcService.handle(JournalEvents.GetJournal, () => {
    return journalService.getJournal();
  });

  ipcService.handle(JournalEvents.ClearJournal, async () => {
    await journalService.deleteJournal();
  });
};
