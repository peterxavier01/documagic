import Logo from "@/components/logo";

import { navLinks, socialIcons } from "@/lib/data";
import { Link } from "@tanstack/react-router";

export default function Footer() {
  const date = new Date();

  return (
    <footer className="bg-slate-950 text-off-white px-4 py-12 md:py-4 font-poppins">
      <section className="section-wrapper grid gap-12 md:grid-cols-2 content-center lg:grid-cols-3 min-h-28">
        <div className="space-y-4">
          <Logo className="text-off-white" />
          <p className="text-[15px]">Copyright © {date.getFullYear()}</p>
        </div>

        <div className="list-none flex flex-wrap items-center justify-start gap-6 md:gap-8">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link to={link.href} className="hover:text-coral text-[15px]">
                {link.name}
              </Link>
            </li>
          ))}
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-6">
            {socialIcons.map((icon) => (
              <Link key={icon.id} to={icon.href}>
                <icon.icon
                  fill="var(--off-white)"
                  className="size-6 social-icon transition"
                />
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-6 text-[15px]">
            <p>Terms and conditions</p>
            <p>Privacy policy</p>
          </div>
        </div>
      </section>
    </footer>
  );
}
