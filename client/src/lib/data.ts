import Discord from "@/components/icons/discord";
import Instagram from "@/components/icons/instagram";
import X from "@/components/icons/x";
import YouTube from "@/components/icons/youtube";

export const socialIcons = [
  { id: 1, icon: X, name: "X.com", href: "" },
  { id: 2, icon: Instagram, name: "Instagram", href: "" },
  { id: 3, icon: YouTube, name: "YouTube", href: "" },
  { id: 4, icon: Discord, name: "Discord", href: "" },
];

export const navLinks = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Tools", href: "/tools" },
  { id: 3, name: "Pricing", href: "/pricing" },
  { id: 4, name: "Contact", href: "/contact" },
];

export const tools = [
  {
    id: 1,
    name: "Text Extractor",
    description: "Extract text from images",
    href: "/text-extractor",
  },
  {
    id: 2,
    name: "Equation Extractor",
    description: "Extract mathematical equations from images",
    href: "/equation-extractor",
  },
  {
    id: 3,
    name: "Convert to JPEG",
    description: "Convert PNG, JPG or GIF to JPEG for free",
    href: "",
  },
  {
    id: 4,
    name: "Convert to PNG",
    description: "Convert JPEG, JPG or GIF to PNG for free",
    href: "",
  },
];
