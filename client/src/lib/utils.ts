import { type ClassValue, clsx } from "clsx";
import { ForwardRefRenderFunction, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// forward refs
export function fr<T = HTMLElement, P = React.HTMLAttributes<T>>(
  component: ForwardRefRenderFunction<T, P>
) {
  const wrapped = forwardRef(component);
  wrapped.displayName = component.name;
  return wrapped;
}

export function convertBytes(bytes: number, unit: "KB" | "MB"): number {
  if (unit === "KB") {
    return Math.round(bytes / 1024);
  } else if (unit === "MB") {
    return Math.round(bytes / (1024 * 1024));
  } else {
    throw new Error("Invalid unit");
  }
}
