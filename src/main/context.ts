import { IpcMainService } from "./services/IpcMainService";
import { BrowserWindow } from "electron";

export interface AppContext {
  ipcService: IpcMainService;
  getAppWindow: () => BrowserWindow | null;
}
