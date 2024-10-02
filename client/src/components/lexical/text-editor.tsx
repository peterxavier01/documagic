import { useEffect } from "react";
import { Download } from "lucide-react";
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  $getSelection,
  $isRangeSelection,
  EditorState,
  TextNode,
} from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

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

const placeholder = "Start typing...";

type EditorProps = {
  data?: string | null;
  extractedText?: string;
  setExtractedText?: (extractedText: string) => void;
};

function EditorContent({ data, setExtractedText }: EditorProps) {
  const [editor] = useLexicalComposerContext();

  // Function to handle changes in the editor
  function handleEditorChange(editorState: EditorState) {
    editorState.read(() => {
      const root = $getRoot();
      const textContent = root.getTextContent();
      if (setExtractedText) {
        setExtractedText(textContent); // Update editor state
      }
    });
  }

  // Inject text into editor when data is loaded from the API.
  useEffect(() => {
    if (data) {
      editor.update(() => {
        const root = $getRoot();
        const existingContent = root.getTextContent();

        // Only inject text if it isn't already present in the editor
        if (!existingContent.includes(data)) {
          const paragraphNode = $createParagraphNode();
          const textNode = $createTextNode(data);
          paragraphNode.append(textNode);

          const selection = $getSelection();

          if ($isRangeSelection(selection)) {
            selection.insertNodes([paragraphNode]);
          } else {
            root.append(paragraphNode);
          }
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
      <OnChangePlugin onChange={handleEditorChange} />
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

function Editor({ data, setExtractedText, extractedText }: EditorProps) {
  return (
    <section className="font-poppins w-full">
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container">
          <ToolbarPlugin />

          <EditorContent
            data={data}
            setExtractedText={setExtractedText}
            extractedText={extractedText}
          />
        </div>

        <SaveDocxButton />
      </LexicalComposer>
    </section>
  );
}

export default Editor;
