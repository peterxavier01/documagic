import { SignUp } from "@clerk/clerk-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  component: () => (
    <div className="flex items-center justify-center min-h-dvh">
      <SignUp />
    </div>
  ),
});
