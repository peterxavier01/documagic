import { useEffect } from "react";
import { Download } from "lucide-react";
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  $getSelection,
  $isRangeSelection,
  TextNode,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

import ToolbarPlugin from "@/components/lexical/plugins/ToolbarPlugin";
import { Button } from "@/components/ui/button";

import { saveTextAsDocx } from "@/lib/text-to-docx";

import "./editor-module.css";

const editorConfig = {
  namespace: "MyEditor",
  nodes: [TextNode],
  onError(error: Error) {
    throw error;
  },
};

const placeholder = "Text goes here...";

type EditorProps = {
  data: string | null;
};

function EditorContent({ data }: EditorProps) {
  const [editor] = useLexicalComposerContext();

  // Inject text into editor when data is loaded from the API.
  useEffect(() => {
    if (data) {
      editor.update(() => {
        // Create a paragraph node to hold the text node
        const paragraphNode = $createParagraphNode();
        const textNode = $createTextNode(data);

        // Append the text node to the paragraph
        paragraphNode.append(textNode);

        // Get the current selection
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          // Insert the paragraph at the selection
          selection.insertNodes([paragraphNode]);
        } else {
          // Fallback: append the paragraph to the root if there's no selection
          const root = $getRoot();
          root.append(paragraphNode);
        }
      });
    }
  }, [data, editor]);

  return (
    <div className="editor-inner">
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            className="editor-input"
            aria-placeholder={placeholder}
            placeholder={
              <div className="editor-placeholder">{placeholder}</div>
            }
          />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
    </div>
  );
}

function SaveDocxButton() {
  const [editor] = useLexicalComposerContext();

  return (
    <Button onClick={() => saveTextAsDocx(editor)} className="mt-4 gap-2">
      <Download />
      <span>Save as DOCX</span>
    </Button>
  );
}

function Editor({ data }: EditorProps) {
  return (
    <section className="font-poppins w-full">
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container">
          <ToolbarPlugin />

          <EditorContent data={data} />
        </div>
        <SaveDocxButton />
      </LexicalComposer>
    </section>
  );
}

export default Editor;
