import { app, BrowserWindow, Menu } from "electron";
import isDev from "electron-is-dev";
import path from "path";
import url from "url";
import { AppContext } from "@/main/context";
import { IpcMainService } from "./services/IpcMainService";
import { createJournalHandlers } from "@/main/features/journal/handlers";
import Store from "electron-store";

let mainWindow: BrowserWindow | null;

const context: AppContext = {
  getAppWindow: () => mainWindow,
  ipcService: new IpcMainService(),
  store: new Store()
};

createJournalHandlers(context);

const createWindow = async () => {
  if (!isDev) {
    const menu = Menu.buildFromTemplate([]);

    Menu.setApplicationMenu(menu);
  }

  const preload = path.join(__dirname, "preload.js");

  console.log(`Using ${preload} as preload script.`);

  mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    title: "Diet assistant",
    titleBarStyle: "default",
    webPreferences: {
      preload,
      nodeIntegration: false
    }
  });

  // Either use vue server when on dev, or production build otherwise.
  const startUrl = isDev
    ? "http://localhost:8080"
    : url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true
      });

  console.log(`Using ${startUrl} as renderer url.`);

  await mainWindow.loadURL(startUrl);

  if (isDev) {
    mainWindow.webContents.once("dom-ready", () => {
      if (mainWindow) {
        mainWindow.webContents.openDevTools({
          mode: "right"
        });
      }
    });
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
};

app.on("ready", async () => {
  await createWindow();

  app.on("activate", async () => {
    if (!BrowserWindow.getAllWindows().length) {
      await createWindow();
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
