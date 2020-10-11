import { AppContext } from "@/main/context";
import { AboutEvents, GetVersionResult } from "@/shared/features/about/types";
import { app } from "electron";

export const createAboutHandlers = ({ ipcService }: AppContext) => {
  ipcService.handle<never, GetVersionResult>(AboutEvents.GetAppVersion, () => {
    return {
      version: app.getVersion()
    };
  });
};
