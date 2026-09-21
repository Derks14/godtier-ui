import { QueryClient } from "@tanstack/react-query";
import type { QueryClient as QueryClientType } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
    queries: {
      retry: false,
      staleTime: 1000 * 60 * 10,
    },
  },
});

export interface GtierRouterContext {
  queryClient: QueryClientType;
}
