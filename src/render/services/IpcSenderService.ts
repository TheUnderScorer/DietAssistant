import { IpcRenderer } from "electron";

export class IpcSenderService {
  constructor(private readonly ipc: IpcRenderer = window.ipcRenderer) {}

  async send<Arg extends object = object, ReturnValue = any>(
    name: string,
    arg?: Arg
  ): Promise<ReturnValue> {
    return this.ipc.sendSync(name, arg);
  }
}
