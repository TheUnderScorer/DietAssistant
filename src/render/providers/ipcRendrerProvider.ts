import { IpcRendererService } from "@/render/services/IpcRendererService";

export const ipcRendererProviderSymbol = Symbol();
export const ipcRenderer = new IpcRendererService();
