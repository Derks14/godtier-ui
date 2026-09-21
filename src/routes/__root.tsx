import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { GtierRouterContext } from "@/services/queryClient.ts";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "@/components/ui/toast.tsx";

const Core = () => {
  return (
    <div className="h-svh p-6">
      <Toaster />

      <Outlet />
      <TanStackRouterDevtools />
    </div>
  );
};

export const Route = createRootRouteWithContext<GtierRouterContext>()({
  component: Core,
});
