import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

interface HeadingProps extends ComponentProps<"h2"> {
  title: string;
}

export default function Heading({ title, className }: Readonly<HeadingProps>) {
  return (
    <h2
      className={cn(
        "text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight",
        className
      )}
    >
      {title}
    </h2>
  );
}
