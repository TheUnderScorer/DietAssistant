// source: https://github.com/electron/electron/issues/9920#issuecomment-336757899

const electron = require("electron");

window.ipcRenderer = electron.ipcRenderer;
window.appVersion = process.env.APP_VERSION ? process.env.APP_VERSION : "local";
