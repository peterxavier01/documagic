import React, { ReactElement } from "react";
import { DecoratorNode, LexicalNode, NodeKey } from "lexical";

import { MathComponent } from "@/components/lexical/math-component";

export class MathNode extends DecoratorNode<React.ReactElement> {
  __formula: string;

  constructor(formula: string, key?: NodeKey) {
    super(key);
    this.__formula = formula;
  }

  static getType(): string {
    return "math";
  }

  static clone(node: MathNode): MathNode {
    return new MathNode(node.__formula, node.__key);
  }

  createDOM(): HTMLElement {
    const span = document.createElement("span");
    span.className = "math-node";
    return span;
  }

  updateDOM(): boolean {
    return false; // Returning false tells Lexical that this node does not need its DOM element replacing with a new copy from createDOM.
  }

  decorate(): ReactElement {
    return <MathComponent formula={this.__formula} />;
  }
}

export function $createMathNode(formula: string): MathNode {
  return new MathNode(formula);
}

export function $isMathNode(
  node: LexicalNode | null | undefined
): node is MathNode {
  return node instanceof MathNode;
}
