import { useEffect, useRef } from "react";
import { MathfieldElement } from "mathlive";

import "mathlive/fonts.css";
import "mathlive/static.css";
import "./editor.module.css";

interface MathFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MathField({ value, onChange }: MathFieldProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mathFieldRef = useRef<MathfieldElement | null>(null);

  useEffect(() => {
    if (!mathFieldRef.current && containerRef.current) {
      const mathField = new MathfieldElement();
      mathField.value = value;

      // Listen for changes and propagate them
      mathField.addEventListener("input", (event: Event) => {
        onChange(mathField.value);

        if (
          event instanceof InputEvent &&
          event.inputType === "insertLineBreak"
        ) {
          (event.target as MathfieldElement).executeCommand(["insert", "\\\\"]);
        }
      });
      mathField.defaultMode = "math";
      mathField.smartMode = true;

      // Show math virtual keyboard on focus and hide on blur
      //   mathField.mathVirtualKeyboardPolicy = "manual";
      //   mathField.addEventListener("focusin", () => window.mathVirtualKeyboard.show());
      //   mathField.addEventListener("focusout", () => window.mathVirtualKeyboard.hide());

      containerRef.current.appendChild(mathField); // Append mathField to the container or parent div
      mathFieldRef.current = mathField;
    } else if (mathFieldRef.current) {
      mathFieldRef.current.value = value;
    }
  }, [value, onChange]);

  return <div ref={containerRef}></div>;
}
