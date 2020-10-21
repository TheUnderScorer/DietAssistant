import { IpcMainService } from "./services/IpcMainService";
import { BrowserWindow } from "electron";
import ElectronStore from "electron-store";
import Store from "electron-store";
import { AppStore } from "@/shared/types/store";
import { JournalService } from "@/main/features/journal/JournalService";

export type AppWindowProvider = () => BrowserWindow | null;

export interface AppContext {
  ipcService: IpcMainService;
  getAppWindow: AppWindowProvider;
  store: ElectronStore<AppStore>;
  journalService: JournalService;
}

export const createContext = (
  mainWindowProvider: AppWindowProvider
): AppContext => {
  const store = new Store<AppStore>();
  const ipcService = new IpcMainService();

  const journalService = new JournalService(store, mainWindowProvider);

  return {
    getAppWindow: mainWindowProvider,
    ipcService,
    store,
    journalService,
  };
};
