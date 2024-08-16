import { SignIn } from "@clerk/clerk-react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: () => (
    <div className="flex items-center justify-center min-h-dvh">
      <SignIn />,
    </div>
  ),
});
