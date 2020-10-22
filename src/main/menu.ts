import { dialog, Menu, MenuItemConstructorOptions } from "electron";
import isDev from "electron-is-dev";
import { AppContext } from "@/main/context";
import { JournalEvents } from "@/shared/features/journal/types";
import { confirmAction } from "@/main/confirmation";

export const setupMenuFactory = (
  context: Omit<AppContext, "renderMenu">
) => async () => {
  const journal = await context.journalService.getJournal();

  const entriesCount = journal?.entries.length ?? 0;
  const hasMoreThanOneEntry = Boolean(journal) && journal!.entries.length > 1;

  const template: MenuItemConstructorOptions[] = [
    {
      label: "Diet Assistant",
      submenu: [
        {
          label: "About",
          role: "about",
        },
        {
          label: "Quit",
          role: "close",
        },
      ],
    },
    {
      label: "Journal",
      submenu: [
        {
          label: "Add entry",
          click: (_, focusedWindow) => {
            context.journalService.addEntry(focusedWindow);
          },
          accelerator: "CommandOrControl+N",
        },
        {
          label: "Export as image",
          click: (_, focusedWindow) => {
            context.journalService.export(focusedWindow);
          },
        },
        {
          label: `Export all as image (${entriesCount})`,
          click: (_, focusedWindow) => {
            context.journalService.exportAll(focusedWindow);
          },
        },
        {
          label: "Export as json",
          click: () => context.journalService.exportData(),
        },
        {
          label: "Import from json",
          click: (_, focusedWindow) =>
            context.journalService.importData(focusedWindow),
        },
        {
          label: "Remove current entry",
          accelerator: "CommandOrControl+D",
          enabled: hasMoreThanOneEntry,
          click: async (_, focusedWindow) => {
            const confirmResult = await confirmAction(
              "Remove current entry.",
              "Are you sure you want to remove current entry? It cannot be undone!"
            );

            if (!confirmResult) {
              return;
            }

            return context.journalService.removeCurrentEntry(focusedWindow);
          },
        },
        {
          label: `Remove all entries (${entriesCount})`,
          enabled: hasMoreThanOneEntry,
          click: async (_, focusedWindow) => {
            const { response } = await dialog.showMessageBox({
              buttons: ["Yes", "No"],
              title: "Clear journal",
              message:
                "Are you sure you want to clear your journal? It cannot be undone!",
            });

            if (response !== 0) {
              return;
            }

            await context.journalService.deleteJournal();

            const window = focusedWindow ?? context.getAppWindow();
            window?.webContents.send(JournalEvents.ClearJournalRequested);
          },
        },
      ],
    },
  ];

  if (isDev) {
    template.push({
      label: "Dev",
      submenu: [
        {
          label: "Open dev tools",
          role: "toggleDevTools",
        },
        {
          label: "Reload",
          role: "reload",
        },
      ],
    });
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};
