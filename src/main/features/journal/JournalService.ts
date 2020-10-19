import ElectronStore from "electron-store";
import { Journal, JournalEvents } from "@/shared/features/journal/types";
import { AppStore } from "@/shared/types/store";
import { AppWindowProvider } from "@/main/context";
import { BrowserWindow, dialog } from "electron";
import { exportJournal, importJournal } from "@/main/features/journal/export";

export class JournalService {
  private static readonly storeKey = "journal";

  constructor(
    private readonly store: ElectronStore<AppStore>,
    private readonly getAppWindow: AppWindowProvider
  ) {}

  saveJournal(data: Journal) {
    this.store.set(JournalService.storeKey, data);
  }

  addEntry(focusedWindow?: BrowserWindow) {
    const window = focusedWindow ?? this.getAppWindow();

    window?.webContents.send(JournalEvents.AddEntryRequested);
  }

  export(focusedWindow?: BrowserWindow) {
    const window = focusedWindow ?? this.getAppWindow();

    window?.webContents.send(JournalEvents.ExportRequested);
  }

  async importData(focusedWindow?: BrowserWindow) {
    const window = focusedWindow ?? this.getAppWindow();

    const { filePaths } = await dialog.showOpenDialog({
      filters: [
        {
          extensions: ["json"],
          name: "Json"
        }
      ],
      message: "Select .json file with exported data",
      properties: ["openFile"]
    });

    if (!filePaths.length) {
      return;
    }

    const [filePath] = filePaths;

    try {
      const journal = await importJournal(filePath);

      window?.webContents.send(JournalEvents.JournalDataImported, journal);
    } catch (e) {
      await dialog.showMessageBox({
        title: "Import error",
        message: e.message
      });
    }
  }

  async exportData() {
    const journal = await this.getJournal();

    if (!journal) {
      return false;
    }

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
      return false;
    }

    try {
      await exportJournal(journal, filePath);
    } catch (e) {
      await dialog.showMessageBox({
        title: "Export error",
        message:
          "Unable to export journal, make sure that selected path is writeable."
      });

      return false;
    }

    return true;
  }

  async getJournal(): Promise<Journal | null> {
    return this.store.get(JournalService.storeKey) ?? null;
  }

  async deleteJournal() {
    await this.store.delete(JournalService.storeKey);
  }
}
