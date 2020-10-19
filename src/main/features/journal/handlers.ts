import { AppContext } from "@/main/context";
import {
  EntryViewedPayload,
  Journal,
  JournalEvents
} from "@/shared/features/journal/types";
import { dialog } from "electron";
import { exportJournal } from "@/main/features/journal/export";

export const createJournalHandlers = ({
  ipcService,
  journalService
}: AppContext) => {
  ipcService.registerAsMap({
    [JournalEvents.SaveJournal]: async (_, journal: Journal) => {
      await journalService.saveJournal(journal);

      return true;
    },
    [JournalEvents.GetJournal]: () => {
      return journalService.getJournal();
    },
    [JournalEvents.ClearJournal]: () => {
      return journalService.deleteJournal();
    },
    [JournalEvents.ExportJournalData]: handleExport,
    [JournalEvents.EntryViewed]: async (_, { index }: EntryViewedPayload) => {
      await journalService.saveLastViewedEntryIndex(index);
    },
    [JournalEvents.GetLastViewedEntryIndex]: () => {
      return journalService.getLastViewedEntryIndex();
    }
  });
};

const handleExport = async (_: unknown, journal: Journal) => {
  const { filePath } = await dialog.showSaveDialog({
    buttonLabel: "Export",
    filters: [
      {
        extensions: ["json"],
        name: "Json"
      }
    ]
  });

  if (!filePath) {
    return;
  }

  try {
    await exportJournal(journal, filePath);
  } catch (e) {
    await dialog.showMessageBox({
      title: "Export error",
      message:
        "Unable to export journal, make sure that selected path is writeable."
    });
  }
};
