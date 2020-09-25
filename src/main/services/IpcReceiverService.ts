import { ipcMain, IpcMain, IpcMainEvent } from "electron";

/**
 * Definition of callback that will be triggered on message from renderer process
 * */
export type IpcServiceCallback<
  Args extends object = object,
  ReturnValue = any
> = (event: IpcMainEvent, args: Args) => ReturnValue | Promise<ReturnValue>;

export class IpcReceiverService {
  constructor(private readonly ipc: IpcMain = ipcMain) {}

  send<Args extends object = object, ReturnValue = any>(
    name: string,
    callback: IpcServiceCallback<Args, ReturnValue>
  ) {
    const handler = async (event: IpcMainEvent, args: Args) => {
      event.returnValue = await callback(event, args);
    };

    this.ipc.on(name, handler);

    return () => {
      this.ipc.off(name, handler);
    };
  }
}
