import Heading from "@/components/heading";
import PricingCard from "@/components/pricing-card";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(app)/pricing")({
  component: Pricing,
});

function Pricing() {
  return (
    <main className="font-poppins bg-white min-h-[calc(100dvh-60px)] py-12">
      <div className="section-wrapper">
        <section>
          <Heading
            title="Simple, transparent pricing"
            className="text-bg pb-4"
          />
          <p className="text-lg text-dark-gray">
            No contracts, no surprise fees
          </p>
        </section>

        <section className="my-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8 pricing-section">
          <PricingCard />
          <PricingCard />
          <PricingCard />
        </section>
      </div>
    </main>
  );
}
