import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import MobileNav from "@/components/mobile-nav";
import NavItems from "@/components/nav-items";

export default function Navbar() {
  return (
    <header className="font-poppins py-4 bg-dark-gray bg-grid-small-white/[0.2]">
      <nav className="flex items-center justify-between section-wrapper">
        <Logo />

        <div>
          <NavItems />
        </div>

        <div className="flex items-center gap-4 sm:gap-8">
          <SignedOut>
            <Link to="/tools">
              <Button className="h-12">Get Started</Button>
            </Link>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>

          <MobileNav />
        </div>
      </nav>
    </header>
  );
}
