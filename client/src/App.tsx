import { createRouter, RouterProvider } from "@tanstack/react-router";
import { useConvexAuth } from "convex/react";

import { routeTree } from "./routeTree.gen.ts";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    auth: {
      isAuthenticated: false,
      isLoading: false,
    },
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const auth = useConvexAuth();

  return <RouterProvider router={router} context={{ auth }} />;
}

export default App;
