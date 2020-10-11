import { IpcMainService } from "./services/IpcMainService";
import { BrowserWindow } from "electron";
import ElectronStore from "electron-store";
import Store from "electron-store";
import { AppStore } from "@/shared/types/store";
import { JournalService } from "@/main/features/journal/JournalService";

export interface AppContext {
  ipcService: IpcMainService;
  getAppWindow: () => BrowserWindow | null;
  store: ElectronStore<AppStore>;
  journalService: JournalService;
}

export const createContext = (
  mainWindowProvider: () => BrowserWindow | null
): AppContext => {
  const store = new Store<AppStore>();

  const journalService = new JournalService(store);

  return {
    getAppWindow: mainWindowProvider,
    ipcService: new IpcMainService(),
    store,
    journalService
  };
};
