import { Authenticated, Unauthenticated } from "convex/react";

import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";

export default function Hero() {
  return (
    <div className="flex flex-col w-full items-center justify-center min-h-dvh">
      <div className="text-center space-y-4 text-white font-poppins wrapper">
        <h1 className="text-4xl md:text-5xl leading-snug md:leading-normal font-bold text-white">
          Unlock the <span className="text-coral">Magic</span> of Document
          Conversion
        </h1>
        <p className="leading-relaxed">
          Experience seamless conversion of mathematical equations from JPG to
          Word, along with a suite of document transformation tools designed for
          precision and efficiency.
        </p>

        <div className="pt-6">
          <Unauthenticated>
            <Link to="/register">
              <Button className="max-w-52 w-full h-12">Sign Up for Free</Button>
            </Link>
          </Unauthenticated>

          <Authenticated>
            <Link to="/tools">
              <Button className="max-w-52 w-full h-12">Explore Tools</Button>
            </Link>
          </Authenticated>
        </div>
      </div>
    </div>
  );
}
