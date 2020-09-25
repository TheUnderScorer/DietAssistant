import { app, BrowserWindow, ipcMain } from "electron";
import isDev from "electron-is-dev";
import * as path from "path";
import { AppContext } from "@/main/context";
import { IpcReceiverService } from "@/main/services/IpcReceiverService";

let mainWindow: BrowserWindow | null;

const context: AppContext = {
  getAppWindow: () => mainWindow,
  ipcService: new IpcReceiverService()
};

ipcMain.on("test-message", (event, arg: string) => {});

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800
  });

  // Either use vue server when on dev, or production build otherwise.
  const startUrl = isDev
    ? "http://localhost:8080"
    : `file::${path.join(__dirname, "../build/index.html")}`;

  await mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.once("dom-ready", () => {
      mainWindow!.webContents.openDevTools({
        mode: "right"
      });
    });
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

app.on("ready", () => {
  createWindow();

  app.on("activate", () => {
    if (!BrowserWindow.getAllWindows().length) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
