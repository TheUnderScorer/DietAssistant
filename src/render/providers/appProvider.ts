import { provide } from "vue";
import {
  ipcRenderer,
  ipcRendererProviderSymbol
} from "@/render/providers/ipcRendrerProvider";

export const appProvider = () => {
  provide(ipcRendererProviderSymbol, ipcRenderer);
};
