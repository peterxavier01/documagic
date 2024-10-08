import { useConvexAuth } from "convex/react";

import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";

export default function Hero() {
  const { isAuthenticated } = useConvexAuth();

  return (
    <div className="flex flex-col w-full items-center justify-center min-h-[95dvh] md:min-h-dvh">
      <div className="text-center space-y-4 text-white font-poppins wrapper">
        <h1 className="text-3xl md:text-4xl lg:text-5xl leading-snug md:leading-normal font-bold text-white">
          Unlock the <span className="text-coral">Magic</span> of Document
          Conversion
        </h1>
        <p className="leading-relaxed text-sm md:text-base">
          Experience seamless conversion of mathematical equations from JPG to
          Word, along with a suite of document transformation tools designed for
          precision and efficiency.
        </p>

        <div className="pt-6">
          <Link to={isAuthenticated ? "/tools" : "/register"}>
            <Button className="max-w-52 w-full h-12">Sign Up for Free</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
