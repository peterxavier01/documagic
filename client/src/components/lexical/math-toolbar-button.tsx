import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $isRangeSelection } from "lexical";
import { Pi } from "lucide-react";

import { $createMathNode } from "@/components/lexical/math-node";

function MathToolbarButton() {
  const [editor] = useLexicalComposerContext();

  const insertMathNode = () => {
    const formula = prompt("Enter LaTeX formula:") || ""; // Allow users to input their LaTeX string
    if (formula.trim() !== "") {
      editor.update(() => {
        const mathNode = $createMathNode(formula);
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          selection.insertNodes([mathNode]);
        }
      });
    }
  };

  return (
    <button
      onClick={insertMathNode}
      className="toolbar-item spaced"
      aria-label="Insert Math"
    >
      <Pi className="format size-[18px]" />
    </button>
  );
}

export default MathToolbarButton;
