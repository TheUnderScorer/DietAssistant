import ElectronStore from "electron-store";
import { Journal } from "@/shared/features/journal/types";
import { AppStore } from "@/shared/types/store";

export class JournalService {
  private static readonly storeKey = "journal";

  constructor(private readonly store: ElectronStore<AppStore>) {}

  saveJournal(data: Journal) {
    this.store.set(JournalService.storeKey, data);
  }

  async getJournal(): Promise<Journal | null> {
    return this.store.get(JournalService.storeKey) ?? null;
  }

  async deleteJournal() {
    await this.store.delete(JournalService.storeKey);
  }
}
