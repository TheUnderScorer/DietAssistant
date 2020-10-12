import ElectronStore from "electron-store";
import { Journal, JournalEvents } from "@/shared/features/journal/types";
import { AppStore } from "@/shared/types/store";
import { AppWindowProvider } from "@/main/context";
import { BrowserWindow } from "electron";

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

  async getJournal(): Promise<Journal | null> {
    return this.store.get(JournalService.storeKey) ?? null;
  }

  async deleteJournal() {
    await this.store.delete(JournalService.storeKey);
  }
}
