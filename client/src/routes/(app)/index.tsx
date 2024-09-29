import { createFileRoute } from "@tanstack/react-router";

import Hero from "@/components/hero";
import Features from "@/components/features";
import Procedure from "@/components/procedure";
import Benefits from "@/components/benefits";

export const Route = createFileRoute("/(app)/")({
  component: Home,
});

function Home() {
  return (
    <section className="bg-dark-gray min-h-dvh bg-grid-small-white/[0.2] font-poppins">
      <main>
        <Hero />

        <Features />

        <Procedure />

        <Benefits />
      </main>
    </section>
  );
}
