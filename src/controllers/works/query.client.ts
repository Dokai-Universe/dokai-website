import { InfiniteQueryDef, QueryDef } from "../common";
import {
  fetchMainWorks,
  fetchWorkCheckSlug,
  fetchWorkDetail,
  fetchWorkList,
  fetchWorkSearch,
} from "./fetch";
import { worksQueryKeys } from "./keys";
import {
  WorkDetailResponse,
  WorkListInfiniteResponse,
  WorkListResponse,
} from "./types";

export const worksQueriesClient = {
  mainWorks: (): QueryDef<WorkListResponse> => ({
    queryKey: worksQueryKeys.mainWorks(),
    queryFn: () => fetchMainWorks(),
  }),
  workList: (
    category?: string,
  ): InfiniteQueryDef<WorkListInfiniteResponse> => ({
    queryKey: worksQueryKeys.workList(category),
    queryFn: ({ pageParam }) =>
      fetchWorkList({ category, page: pageParam, limit: 16 }),
  }),
  workSearch: (
    queries: string[],
  ): InfiniteQueryDef<WorkListInfiniteResponse> => ({
    queryKey: worksQueryKeys.workSearch(queries),
    queryFn: ({ pageParam }) =>
      fetchWorkSearch({ queries, page: pageParam, limit: 12 }),
  }),
  workDetail: (slug: string): QueryDef<WorkDetailResponse> => ({
    queryKey: worksQueryKeys.workDetail(slug),
    queryFn: () => fetchWorkDetail(slug),
  }),
  checkSlug: (slug: string): QueryDef<{ exists: boolean }> => ({
    queryKey: worksQueryKeys.checkSlug(slug),
    queryFn: () => fetchWorkCheckSlug(slug),
  }),
};
