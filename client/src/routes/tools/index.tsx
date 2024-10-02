import Heading from "@/components/heading";
import ToolCard from "@/components/tool-card";
import { tools } from "@/lib/data";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tools/")({
  component: Tools,
});

function Tools() {
  return (
    <main className="font-poppins bg-white min-h-[calc(100dvh-60px)] py-12">
      <div className="section-wrapper">
        <div>
          <Heading title="Explore Our Tools" className="text-bg pb-2" />
          <p className="font-medium text-dark-gray text-lg">
            Files shared are end-to-end encrypted and are deleted after 7 days.
          </p>
        </div>

        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </main>
  );
}
