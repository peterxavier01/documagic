import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <Link to="/">
      <h1 className={cn("font-bold text-xl text-white", className)}>
        Docu<span className="text-coral">Magic</span>
      </h1>
    </Link>
  );
}
