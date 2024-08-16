import { Book, BookOpenText, Presentation } from "lucide-react";

const benefits = [
  {
    id: 1,
    title: "Students",
    description:
      " Easily convert lecture notes or assignments involving complex equations.",
    icon: Book,
  },
  {
    id: 2,
    title: "Educators",
    description:
      "Prepare teaching materials with accurate document conversions.",
    icon: Presentation,
  },
  {
    id: 3,
    title: "Researchers",
    description:
      "Save time and effort in converting data and research findings into editable formats.",
    icon: BookOpenText,
  },
];

export default function Benefits() {
  return (
    <section className="bg-off-white py-12 md:py-24">
      <div className="section-wrapper">
        <h4 className="header text-slate-800">Who Benefits?</h4>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((procedure) => (
            <div
              key={procedure.id}
              className="flex flex-col gap-2 items-center justify-center text-center"
            >
              <div className="rounded-full border-2 hover:bg-royal-blue transition group border-royal-blue size-20 mb-4 flex items-center justify-center">
                <procedure.icon className="size-8 text-royal-blue group-hover:text-off-white" />
              </div>
              <h5 className="text-slate-800 font-medium text-xl">
                {procedure.title}
              </h5>
              <p className="text-dark-gray font-medium">
                {procedure.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
