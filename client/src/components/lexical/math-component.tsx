import { ReactElement, useEffect, useRef } from "react";
import katex from "katex";

import "katex/dist/katex.min.css";

type MathComponentProps = {
  formula: string;
};

export function MathComponent({ formula }: MathComponentProps): ReactElement {
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      katex.render(formula, ref.current, {
        throwOnError: false,
      });
    }
  }, [formula]);

  return <span ref={ref} />;
}
