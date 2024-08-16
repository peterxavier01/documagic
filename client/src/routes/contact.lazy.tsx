import { createLazyFileRoute } from "@tanstack/react-router";

import ContactForm from "@/components/contact-form";
import Heading from "@/components/heading";

export const Route = createLazyFileRoute("/contact")({
  component: Contact,
});

function Contact() {
  return (
    <main className="py-12 min-h-[calc(100dvh-60px)] font-poppins">
      <section className="section-wrapper">
        <div className="text-center">
          <Heading title="Get in Touch" className="text-center pb-2 text-bg" />
          <p className="text-lg text-dark-gray">
            Have any questions? Feel free to reach out to us
          </p>
        </div>

        <ContactForm />
      </section>
    </main>
  );
}
