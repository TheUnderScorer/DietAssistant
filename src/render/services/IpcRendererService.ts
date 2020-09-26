import { IpcRenderer } from "electron";

export class IpcRendererService {
  constructor(private readonly ipc: IpcRenderer = window.ipcRenderer) {}

  async send<Arg extends object = object, ReturnValue = any>(
    name: string,
    arg?: Arg
  ): Promise<ReturnValue> {
    const result = this.ipc.sendSync(name, arg);

    if (result.error) {
      throw new Error(result.error.message);
    }

    return result;
  }
}
