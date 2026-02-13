import { QueryClient } from "@tanstack/react-query";

export const queryOptions = {
  retry: 5,
  staleTime: 1000,
} as const;

export function getQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: queryOptions,
    },
  });
}
