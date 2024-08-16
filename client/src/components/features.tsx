import { HoverEffect } from "./ui/card-hover-effect";

const features = [
  {
    title: "Precision at Its Best",
    description:
      "Convert complex mathematical equations from JPG to Word with unmatched accuracy. Perfect for academic and research needs.",
  },
  {
    title: "Lightning-Fast Processing",
    description:
      "No more waiting—DocuMagic converts your files in seconds, giving you more time to focus on what truly matters.",
  },
  {
    title: "User-Friendly Interface",
    description:
      "Our intuitive platform ensures that even the most advanced conversions are just a few clicks away.",
  },
  {
    title: " Comprehensive Conversion Suite",
    description:
      "Beyond equations, convert DOCX to PDF, TXT to DOCX, TXT to PDF, and JPG to TXT with ease.",
  },
  {
    title: "Secure and Reliable",
    description:
      "Your data is protected with industry-standard encryption, ensuring that your documents remain confidential.",
  },
];

export default function Features() {
  return (
    <section className="py-12 md:py-24 bg-off-white">
      <div className="section-wrapper">
        <h4 className="header text-slate-800">
          Why Choose Docu<span className="text-coral">Magic?</span>
        </h4>
        <HoverEffect items={features} className="lg:grid-cols-3 font-poppins" />
      </div>
    </section>
  );
}
