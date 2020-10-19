import { Journal } from "@/shared/features/journal/types";
import fs from "fs";

export const exportJournal = async (journal: Journal, path: string) => {
  const json = JSON.stringify(journal, null, " ");

  await fs.promises.writeFile(path, json, {
    encoding: "utf8"
  });
};

export const importJournal = async (path: string) => {
  const contents = await fs.promises.readFile(path);
  const json = JSON.parse(contents.toString());

  if (!json) {
    throw new Error("Selected file is empty.");
  }

  if (!json.entries) {
    throw new Error("Selected file is not an export from Diet Assistant.");
  }

  return json as Journal;
};
