// src/controllers/works/query.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import type { FetchWorksParams, WorkListResponse } from "./fetch";
import { fetchWorkList } from "./fetch";

export type UseWorksInfiniteParams = Omit<FetchWorksParams, "page"> & {
  enabled?: boolean;
};

export function useWorksInfiniteQuery(params: UseWorksInfiniteParams) {
  const {
    enabled = true,
    mode = "main",
    pageSize = 12,
    category = "EVERYTHING",
    q = [],
  } = params;

  return useInfiniteQuery<WorkListResponse, Error>({
    queryKey: ["works", { mode, pageSize, category, q }],
    enabled,
    initialPageParam: 1, // page는 1-based
    queryFn: ({ pageParam }) =>
      fetchWorkList({
        mode,
        page: pageParam as number,
        pageSize,
        category,
        q,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNext) return undefined;
      return lastPage.page + 1;
    },
    // 네 API는 count: exact라 response.total이 있으므로
    // staleTime 등은 상황에 맞게
    staleTime: 5_000,
    retry: 2,
  });
}
