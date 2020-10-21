import { AppContext } from "@/main/context";
import {
  EntryViewedPayload,
  ExportAllAsImagePayload,
  Journal,
  JournalEvents,
} from "@/shared/features/journal/types";
import { dialog } from "electron";
import { exportJournal } from "@/main/features/journal/export";
import fs from "fs";
import { getEntryFileName } from "@/shared/features/journal/getEntryFileName";
import { getEntriesMinMaxDates } from "@/shared/features/journal/getEntriesMinMaxDates";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

const handleExport = async (_: unknown, journal: Journal) => {
  const { filePath } = await dialog.showSaveDialog({
    buttonLabel: "Export",
    filters: [
      {
        extensions: ["json"],
        name: "Json",
      },
    ],
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
        "Unable to export journal, make sure that selected path is writeable.",
    });
  }
};

const handleExportAllAsImage = async (
  _: unknown,
  payload: ExportAllAsImagePayload
) => {
  const { filePaths } = await dialog.showOpenDialog({
    properties: ["createDirectory", "openDirectory"],
  });

  if (!filePaths.length) {
    return;
  }

  const entries = payload.map((item) => item.entry);
  const [minDateEntry, maxDateEntry] = getEntriesMinMaxDates(entries);
  const minDate = format(new Date(minDateEntry.date!), "dd.MM", { locale: pl });
  const maxDate = format(new Date(maxDateEntry.date!), "dd.MM", { locale: pl });
  const dirName = `${minDate} - ${maxDate}`;

  const [selectedDirectory] = filePaths;
  const path = `${selectedDirectory}/${dirName}`;

  try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }

    await Promise.all(
      payload.map(async (item) => {
        return fs.promises.writeFile(
          `${path}/${getEntryFileName(item.entry, "png")}`,
          item.image.replace(/^data:image\/png;base64,/, ""),
          "base64"
        );
      })
    );

    await dialog.showMessageBox({
      title: "Success",
      message: `All entries have been exported to: \n ${path}`,
    });
  } catch (e) {
    await dialog.showMessageBox({
      title: "Export error",
      message: e.message,
    });
  }
};

export const createJournalHandlers = ({
  ipcService,
  journalService,
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
    },
    [JournalEvents.ExportAllAsImage]: handleExportAllAsImage,
  });
};
