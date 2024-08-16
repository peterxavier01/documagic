import { Document, Paragraph, TextRun, Packer } from "docx";
import { saveAs } from "file-saver";

export const convertTxtToDocx = async (txtFile: File) => {
  if (!txtFile) return;

  const reader = new FileReader();
  reader.onload = function (e: ProgressEvent<FileReader>) {
    if (e.target?.result) {
      const doc = new Document({
        sections: [
          {
            children: (e.target.result as string).split("\n").map(
              (line) =>
                new Paragraph({
                  children: [new TextRun(line)],
                })
            ),
          },
        ],
      });

      Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "converted.docx");
      });
    }
  };

  reader.readAsText(txtFile);
};
