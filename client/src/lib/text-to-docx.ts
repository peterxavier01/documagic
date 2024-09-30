import { Document, Paragraph, TextRun, Packer } from "docx";
import { saveAs } from "file-saver";
import { LexicalEditor } from "lexical";
import { $generateHtmlFromNodes } from "@lexical/html";

export const saveTextAsDocx = async (editor: LexicalEditor) => {
  const htmlContent = getEditorHTML(editor);

  // Check if the editor is empty
  if (!htmlContent.trim()) {
    console.log("Editor is empty. No file will be downloaded.");
    return;
  }

  const plainTextContent = stripHtml(htmlContent); // Strip HTML to get plain text

  // Create new TextRun element from editor generated HMTL
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [new TextRun(plainTextContent)], // Insert the content from the editor
          }),
        ],
      },
    ],
  });

  // Generate the docx file and trigger download
  const blob = await Packer.toBlob(doc);
  if (blob) saveAs(blob, "converted.docx");
};

export function getEditorHTML(editor: LexicalEditor) {
  let htmlContent = "";

  editor.update(() => {
    htmlContent = $generateHtmlFromNodes(editor); // Gets the HTML of the editor content
  });

  return htmlContent;
}

function stripHtml(html: string): string {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
}
