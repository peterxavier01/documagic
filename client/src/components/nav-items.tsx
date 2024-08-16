import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/data";

interface NavItemsProps {
  className?: string;
}

export default function NavItems({ className }: Readonly<NavItemsProps>) {
  return (
    <ul
      className={cn("hidden md:flex items-center gap-8 text-white", className)}
    >
      {navLinks.map((link) => (
        <li key={link.id}>
          <Link
            to={link.href}
            className="hover:text-coral"
            activeOptions={{ exact: true }}
          >
            {({ isActive }) => {
              return (
                <span className={isActive ? "text-coral" : ""}>
                  {link.name}
                </span>
              );
            }}
          </Link>
        </li>
      ))}
    </ul>
  );
}
