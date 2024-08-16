import { CloudLightning, Cog, Upload } from "lucide-react";

const procedures = [
  {
    id: 1,
    title: "Upload Your File",
    description: "Start by selecting the file you wish to convert.",
    icon: Upload,
  },
  {
    id: 2,
    title: "Choose Your Conversion",
    description:
      "Select the type of conversion—whether it’s mathematical equations to Word or any of our other tools.",
    icon: Cog,
  },
  {
    id: 3,
    title: "Instant Conversion",
    description:
      " Get your converted document in seconds, ready to download or share.",
    icon: CloudLightning,
  },
];

export default function Procedure() {
  return (
    <section className="bg-dark-gray bg-dot-white/[0.2] py-12 md:py-24">
      <div className="section-wrapper">
        <h4 className="header text-off-white">How it works</h4>

        <div className="grid md:grid-cols-3 gap-8">
          {procedures.map((procedure) => (
            <div
              key={procedure.id}
              className="flex flex-col gap-2 items-center justify-center text-center"
            >
              <div className="rounded-full border-2 hover:bg-off-white transition border-royal-blue size-20 mb-4 flex items-center justify-center">
                <procedure.icon className="size-8 text-royal-blue" />
              </div>
              <h5 className="text-off-white font-medium text-xl">
                {procedure.title}
              </h5>
              <p className="text-gray-300 font-medium">
                {procedure.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
