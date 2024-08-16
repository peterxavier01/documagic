import { useEffect } from "react";
import { $getSelection, $isRangeSelection } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

import { $createMathNode, MathNode } from "@/components/lexical/math-node";
import ToolbarPlugin from "@/components/lexical/plugins/ToolbarPlugin";

import "./editor-module.css";

const editorConfig = {
  namespace: "MyEditor",
  nodes: [MathNode],
  onError(error: Error) {
    throw error;
  },
};

const placeholder = "Equation goes here...";

type EditorProps = {
  data: string | null;
};

function EditorContent({ data }: EditorProps) {
  const [editor] = useLexicalComposerContext();

  // Inject Latex string into editor when data is loaded from the API.
  useEffect(() => {
    if (data) {
      editor.update(() => {
        const mathNode = $createMathNode(data);
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          selection.insertNodes([mathNode]);
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
      <AutoFocusPlugin />
    </div>
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
      </LexicalComposer>
    </section>
  );
}

export default Editor;
