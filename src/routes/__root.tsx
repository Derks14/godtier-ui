import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { GtierRouterContext } from "@/services/queryClient.ts";
import { Toaster } from "@/components/ui/toast.tsx";

const Core = () => {
  return (
    <div className="h-svh">
      <Toaster />

      <Outlet />
    </div>
  );
};

export const Route = createRootRouteWithContext<GtierRouterContext>()({
  component: Core,
});
