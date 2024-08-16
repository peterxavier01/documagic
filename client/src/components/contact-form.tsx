import { Locate, Mail, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

export default function ContactForm() {
  const inputStyles =
    "w-full bg-transparent border-b-2 border-gray-400 outline-none focus-within:border-b-2 focus-within:border-royal-blue py-2 text-dark-gray";

  return (
    <form className="bg-off-white w-full rounded-lg shadow-md p-2 mt-12">
      <div className="grid md:grid-cols-12 gap-4 md:gap-0">
        <section className="relative overflow-hidden md:col-span-6 lg:col-span-5 bg-royal-blue z-20 rounded-lg text-off-white p-8">
          <div className="absolute -bottom-12 -right-12 size-48 bg-coral/65 rounded-full z-[-1]" />
          <div>
            <h4 className="text-2xl font-medium mb-4">Contact Information</h4>
            <p className="leading-relaxed mb-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
              dolor?
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Phone />
              <span className="font-medium">+234 949 494 4494</span>
            </div>

            <div className="flex items-center gap-4">
              <Locate />
              <span className="font-medium">
                3, Ajuro Manki Street, Nigeria
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Mail />
              <span className="font-medium">faker@yahoo.com</span>
            </div>
          </div>
        </section>

        <section className="md:col-span-6 lg:col-span-7 space-y-8 py-12 max-w-xl md:px-[calc(32px-8px)] mx-auto">
          <div className="flex items-center gap-4 max-sm:flex-wrap">
            <input
              type="text"
              placeholder="Your Name"
              className={cn("", inputStyles)}
            />
            <input
              type="email"
              placeholder="Your Email"
              className={cn("", inputStyles)}
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            className={cn("", inputStyles)}
          />
          <textarea
            placeholder="Your Message"
            className={cn("min-h-40 resize-none", inputStyles)}
          ></textarea>
          <Button className="capitalize min-h-12 max-w-40 w-full">
            send message
          </Button>
        </section>
      </div>
    </form>
  );
}
