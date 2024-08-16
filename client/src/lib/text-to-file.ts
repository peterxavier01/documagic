import { saveAs } from "file-saver";

export const saveTextToFile = (text: string, fileName: string) => {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  saveAs(blob, fileName);
};
