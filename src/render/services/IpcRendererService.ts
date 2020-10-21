import { IpcRenderer } from "electron";
import { Obj } from "@/shared/types/common";

export class IpcRendererService {
  constructor(private readonly ipc: IpcRenderer = window.ipcRenderer) {
    this.ipc.setMaxListeners(20);
  }

  async invoke<Arg extends Obj = Obj, ReturnValue = any>(
    name: string,
    arg?: Arg
  ): Promise<ReturnValue> {
    const result = await this.ipc.invoke(name, arg);

    if (result?.error) {
      throw new Error(result.error.message);
    }

    return result;
  }

  receive(name: string, listener: (...args: any[]) => void) {
    this.ipc.on(name, listener);

    return () => {
      this.ipc.off(name, listener);
    };
  }
}
