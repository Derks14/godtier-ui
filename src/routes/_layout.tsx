import { createFileRoute, Outlet } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/services/queryClient.ts";
import Nav from "@/components/sections/nav.tsx";

const layout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-full w-full flex flex-col md:p-6 p-4">
        <div>
          <Nav />
        </div>
        <Outlet />
      </div>
    </QueryClientProvider>
  );
};

export const Route = createFileRoute("/_layout")({
  component: layout,
});
