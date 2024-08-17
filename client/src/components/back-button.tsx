import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  title: string;
  href: string;
}

export default function BackButton({ title, href }: Readonly<BackButtonProps>) {
  return (
    <Link
      to={href}
      className="flex items-center gap-2 text-coral font-medium w-max"
    >
      <ArrowLeft size={24} />
      {title}
    </Link>
  );
}
