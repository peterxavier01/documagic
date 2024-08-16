import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import NavItems from "./nav-items";

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger className="block md:hidden">
        <Menu className="text-off-white" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Mobile Navigation Menu
          </SheetDescription>
        </SheetHeader>

        <nav className="mt-8 flex w-full h-full">
          <NavItems className="flex flex-col items-start text-xl md:hidden text-dark-gray font-medium font-poppins w-full" />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
