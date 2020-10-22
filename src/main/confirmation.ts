import { dialog } from "electron";

export const confirmAction = async (title: string, message: string) => {
  const { response } = await dialog.showMessageBox({
    buttons: ["Yes", "No"],
    title,
    message,
  });

  return response === 0;
};
