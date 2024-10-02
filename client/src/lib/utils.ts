import { type ClassValue, clsx } from "clsx";
import { Id } from "../../convex/_generated/dataModel";
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

export function getImageURL(storageId: Id<"conversions">) {
  const convexSiteUrl = import.meta.env.VITE_CONVEX_SITE_URL;

  // Retrieve the file URL of the uploaded file
  const getImageUrl = new URL(`${convexSiteUrl}/getFileURL`);
  getImageUrl.searchParams.set("storageId", storageId);
  return getImageUrl.href;
}

export function clipText(text: string, maxLength: number) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }

  return text;
}

export function getServerURL(): string {
  let serverURL;

  if (import.meta.env.DEV) {
    serverURL = import.meta.env.VITE_DEV_SERVER_URL;
  } else if (import.meta.env.PROD) {
    serverURL = import.meta.env.VITE_PROD_SERVER_URL;
  }

  return serverURL;
}
