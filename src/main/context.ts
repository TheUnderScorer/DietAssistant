import { IpcReceiverService } from "@/main/services/IpcReceiverService";
import { BrowserWindow } from "electron";

export interface AppContext {
  ipcService: IpcReceiverService;
  getAppWindow: () => BrowserWindow | null;
}
