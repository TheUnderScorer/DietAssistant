import { Menu, MenuItemConstructorOptions } from "electron";
import isDev from "electron-is-dev";

export const setupMenu = () => {
  const template: MenuItemConstructorOptions[] = [
    {
      label: "Diet Assistant",
      submenu: [
        {
          label: "Quit",
          role: "close"
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
        }
      ]
    });
  }

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
};
