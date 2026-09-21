import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { routeTree } from "@/routeTree.gen.ts";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { queryClient } from "@/services/queryClient.ts";

const router = createRouter({
  routeTree,
  context: { queryClient },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider disableTransitionOnChange={false}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
