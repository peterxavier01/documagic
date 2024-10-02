import { useCallback, useEffect } from "react";
import { Download } from "lucide-react";
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  EditorState,
  ParagraphNode,
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
import { useEditorStateStore } from "@/hooks/use-editor-state";

const editorConfig = {
  namespace: "MyEditor",
  nodes: [TextNode, ParagraphNode],
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

  // Function to handle changes in the editor content
  function handleEditorChange(editorState: EditorState) {
    editorState.read(() => {
      const root = $getRoot();
      const textContent = root.getTextContent();

      if (setExtractedText) {
        setExtractedText(textContent); // Update extracted text state
      }
    });

    const isEmpty = editor.getEditorState().isEmpty();
    const setIsEditorEmpty = useEditorStateStore.getState().setIsEditorEmpty;
    setIsEditorEmpty(isEmpty); // Update editor empty state
  }

  // Function to inject text from the API into the editor
  const injectDataIntoEditor = useCallback(
    (data: string) => {
      editor.update(() => {
        const root = $getRoot();

        // Clear all existing content in the editor
        root.clear();

        // Create a new paragraph node and append the text from data
        const paragraphNode = $createParagraphNode();
        const textNode = $createTextNode(data);
        paragraphNode.append(textNode);

        // Append the new paragraph to the root
        root.append(paragraphNode);
      });
    },
    [editor]
  );

  // Effect to handle API data injection into the editor when data changes
  useEffect(() => {
    if (data) {
      injectDataIntoEditor(data);
    }
  }, [data, injectDataIntoEditor]); // Only inject data when it changes

  return (
    <>
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
    </>
  );
}

function SaveDocxButton() {
  const [editor] = useLexicalComposerContext();
  const isEditorEmpty = useEditorStateStore((state) => state.isEditorEmpty);

  return (
    <Button
      onClick={() => saveTextAsDocx(editor)}
      className="mt-4 gap-2"
      disabled={isEditorEmpty}
    >
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
