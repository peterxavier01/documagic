import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PricingCard() {
  return (
    <Card className="pricing-card bg-transparent hover:shadow hover:shadow-sky-blue w-full rounded-lg">
      <p className="text-xl font-bold text-slate-800">Pro</p>
      <h1 className="text-4xl font-bold text-slate-800 my-4">
        $99 <span className="text-base font-normal text-dark-gray">/month</span>
      </h1>

      <p className="mb-6 text-dark-gray">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta, quas.
      </p>

      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="flex items-center gap-3">
            <CheckCircle className="text-royal-blue" size={18} />
            <span className="font-medium">Chat Support</span>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        className="mt-6 w-full border-royal-blue min-h-14 text-royal-blue hover:bg-royal-blue hover:text-off-white"
      >
        Choose Plan
      </Button>
    </Card>
  );
}
