import { inject, ref } from "vue";
import jsPdf from "jspdf";
import html2canvas from "html2canvas";
import download from "downloadjs";
import {
  ExportAllAsImagePayload,
  JournalEvents,
} from "@/shared/features/journal/types";
import { IpcRendererService } from "@/render/services/IpcRendererService";
import { ipcRendererProviderSymbol } from "@/render/providers/ipcRendrerProvider";
import { useJournal } from "@/render/app/journal/useJournal";
import { executeSequentially } from "@/shared/utils/promises";
import { blobToBase64 } from "@/shared/utils/base64";
import { getEntryFileName } from "@/shared/features/journal/getEntryFileName";
import { journalEntryToRaw } from "@/render/app/journal/converters/journalEntryToRaw";

const isExporting = ref(false);
const container = document.body;
const handlersSetup = ref(false);

const { activeEntry, activeIndex, journal } = useJournal();

const ignoreElements = (el: Element) => el.classList.contains("ignore-export");

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

const getName = (ext: string) => getEntryFileName(activeEntry.value, ext);

const exportAsPdf = async () => {
  if (!container) {
    return;
  }

  isExporting.value = true;

  await wait();

  // noinspection JSPotentiallyInvalidConstructorUsage
  const pdf = new jsPdf("l", "px", [window.outerWidth, window.outerHeight]);

  await pdf.html(container, {
    html2canvas: {
      ignoreElements,
    },
    x: 15,
    y: 15,
  });

  isExporting.value = false;

  await pdf.save(getName("pdf"));
};

const createImageFromCurrentEntry = async (
  output: "blob" | "dataUrl"
): Promise<string | Blob> => {
  if (!container) {
    throw new Error("No HTML container found for making the image.");
  }

  await wait();

  const canvas = await html2canvas(container, {
    ignoreElements,
  });

  if (output === "dataUrl") {
    return canvas.toDataURL();
  }

  if (output === "blob") {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("No blob created."));
        }

        resolve(blob!);
      });
    });
  }

  throw new TypeError("Invalid output provided.");
};

const exportAsImg = async () => {
  isExporting.value = true;

  const data = await createImageFromCurrentEntry("dataUrl");

  isExporting.value = false;

  download(data, getName("png"));
};

const exportAllAsImg = (ipcService: IpcRendererService) => async () => {
  isExporting.value = true;

  const lastActiveIndex = activeIndex.value;

  const blobs = await executeSequentially<ExportAllAsImagePayload>(
    journal.entries.map((entry, index) => async () => {
      activeIndex.value = index;

      const blob = (await createImageFromCurrentEntry("blob")) as Blob;

      return {
        entry: journalEntryToRaw(entry),
        image: await blobToBase64(blob),
      };
    })
  );

  activeIndex.value = lastActiveIndex;
  isExporting.value = false;

  await ipcService.invoke(JournalEvents.ExportAllAsImage, blobs);
};

const setupHandlers = (ipcService: IpcRendererService) => {
  ipcService.receive(JournalEvents.ExportRequested, async () => {
    await exportAsImg();
  });

  ipcService.receive(
    JournalEvents.ExportAllRequested,
    exportAllAsImg(ipcService)
  );
};

export const useJournalExport = () => {
  const ipcService = inject<IpcRendererService>(ipcRendererProviderSymbol);

  if (!handlersSetup.value) {
    handlersSetup.value = true;

    setupHandlers(ipcService!);
  }

  return {
    isExporting,
    container,
    exportAsPdf,
    exportAsImg,
  };
};
