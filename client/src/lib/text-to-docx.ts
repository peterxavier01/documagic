import { Document, Paragraph, TextRun, Packer } from "docx";
import { saveAs } from "file-saver";

export const saveTextAsDocx = async (textContent: string) => {
  // Convert text content to a docx document
  const doc = new Document({
    sections: [
      {
        children: textContent.split("\n").map(
          (line) =>
            new Paragraph({
              children: [new TextRun(line)],
            })
        ),
      },
    ],
  });

  // Generate the docx file and trigger download
  const blob = await Packer.toBlob(doc);
  saveAs(blob, "converted.docx");
};
