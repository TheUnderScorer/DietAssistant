import { IpcMainService } from "./services/IpcMainService";
import { BrowserWindow } from "electron";
import ElectronStore from "electron-store";

export interface AppContext {
  ipcService: IpcMainService;
  getAppWindow: () => BrowserWindow | null;
  store: ElectronStore;
}
