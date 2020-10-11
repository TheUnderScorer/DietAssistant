import { inject, ref } from "vue";
import { ipcRendererProviderSymbol } from "@/render/providers/ipcRendrerProvider";
import { IpcRendererService } from "@/render/services/IpcRendererService";
import { AboutEvents, GetVersionResult } from "@/shared/features/about/types";

const version = ref<string | null>(null);

export const useAppVersion = () => {
  if (!version.value) {
    const ipcClient = inject<IpcRendererService>(ipcRendererProviderSymbol);

    ipcClient!
      .invoke<never, GetVersionResult>(AboutEvents.GetAppVersion)
      .then(result => {
        version.value = result.version;
      });
  }

  return {
    version
  };
};
