import { QueryClient } from "@tanstack/react-query";

let browserQueryClient: QueryClient | undefined;

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        retry: 1,
        refetchOnWindowFocus: false,
      },
      mutations: { retry: 0 },
    },
  });
}

export function getQueryClient() {
  if (typeof window === "undefined") {
    // 서버는 요청마다 새 인스턴스
    return createQueryClient();
  }
  // 브라우저는 싱글턴(또는 Providers useState 권장)
  if (!browserQueryClient) browserQueryClient = createQueryClient();
  return browserQueryClient;
}
