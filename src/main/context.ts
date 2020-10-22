import { IpcMainService } from "./services/IpcMainService";
import { BrowserWindow } from "electron";
import ElectronStore from "electron-store";
import Store from "electron-store";
import { AppStore } from "@/shared/types/store";
import { JournalService } from "@/main/features/journal/JournalService";
import { setupMenuFactory } from "@/main/menu";

export type AppWindowProvider = () => BrowserWindow | null;

export interface AppContext {
  ipcService: IpcMainService;
  getAppWindow: AppWindowProvider;
  store: ElectronStore<AppStore>;
  journalService: JournalService;
  renderMenu: () => Promise<void>;
}

export const createContext = (
  mainWindowProvider: AppWindowProvider
): AppContext => {
  const store = new Store<AppStore>();
  const ipcService = new IpcMainService();

  const journalService = new JournalService(store, mainWindowProvider);

  const setupMenu = setupMenuFactory({
    getAppWindow: mainWindowProvider,
    journalService,
    ipcService,
    store,
  });

  journalService.menuRenderer = setupMenu;

  return {
    getAppWindow: mainWindowProvider,
    ipcService,
    store,
    journalService,
    renderMenu: setupMenu,
  };
};
