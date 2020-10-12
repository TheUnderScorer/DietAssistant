import { dialog, Menu, MenuItemConstructorOptions } from "electron";
import isDev from "electron-is-dev";
import { AppContext } from "@/main/context";
import { JournalEvents } from "@/shared/features/journal/types";

export const setupMenu = (context: AppContext) => {
  const template: MenuItemConstructorOptions[] = [
    {
      label: "Diet Assistant",
      submenu: [
        {
          label: "About",
          role: "about"
        },
        {
          label: "Quit",
          role: "close"
        }
      ]
    },
    {
      label: "Journal",
      submenu: [
        {
          label: "Add entry",
          click: (_, focusedWindow) => {
            context.journalService.addEntry(focusedWindow);
          },
          accelerator: "CommandOrControl+N"
        },
        {
          label: "Export as image",
          click: (_, focusedWindow) => {
            context.journalService.export(focusedWindow);
          }
        },
        {
          label: "Remove all entries",
          accelerator: "CommandOrControl+D",
          click: async () => {
            const { response } = await dialog.showMessageBox({
              buttons: ["Yes", "No"],
              title: "Clear journal",
              message:
                "Are you sure you want to clear your journal? It cannot be undone!"
            });

            if (response !== 0) {
              return;
            }

            await context.journalService.deleteJournal();

            const appWindow = context.getAppWindow();
            appWindow?.webContents.send(JournalEvents.ClearJournalRequested);
          }
        }
      ]
    }
  ];

  if (isDev) {
    template.push({
      label: "Dev",
      submenu: [
        {
          label: "Open dev tools",
          role: "toggleDevTools"
        },
        {
          label: "Reload",
          role: "reload"
        }
      ]
    });
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};
