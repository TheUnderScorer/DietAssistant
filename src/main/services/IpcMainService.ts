import { ipcMain, IpcMain, IpcMainEvent } from "electron";

/**
 * Definition of callback that will be triggered on message from renderer process
 * */
export type IpcServiceCallback<
  Args extends object = object,
  ReturnValue = any
> = (event: IpcMainEvent, args: Args) => ReturnValue | Promise<ReturnValue>;

export class IpcMainService {
  constructor(private readonly ipc: IpcMain = ipcMain) {}

  receive<Args extends object = object, ReturnValue = any>(
    name: string,
    callback: IpcServiceCallback<Args, ReturnValue>
  ) {
    const handler = async (event: IpcMainEvent, args: Args) => {
      try {
        event.returnValue = await callback(event, args);
      } catch (e) {
        event.returnValue = {
          error: e
        };
      }
    };

    this.ipc.on(name, handler);

    return () => {
      this.ipc.off(name, handler);
    };
  }
}
