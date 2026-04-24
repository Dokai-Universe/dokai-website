import { InfiniteQueryDef, QueryDef } from "../common";
import { fetchNewsList, fetchNewsDetail, fetchNewsSearch } from "./fetch";
import { newsQueryKeys } from "./keys";
import {
  NewsDetailResponse,
  NewsListInfiniteResponse,
  NewsListResponse,
} from "./types";

export const newsQueriesClient = {
  newsList: ({
    page,
    query,
  }: {
    page: number;
    query?: string;
  }): QueryDef<NewsListResponse> => ({
    queryKey: newsQueryKeys.newsList({ page, query }),
    queryFn: () => fetchNewsList({ page, query }),
  }),
  newsSearch: (
    queries: string[],
  ): InfiniteQueryDef<NewsListInfiniteResponse> => ({
    queryKey: newsQueryKeys.newsSearch(queries),
    queryFn: ({ pageParam }) =>
      fetchNewsSearch({ queries, page: pageParam, limit: 12 }),
  }),
  newsDetail: (slug: string): QueryDef<NewsDetailResponse> => ({
    queryKey: newsQueryKeys.newsDetail(slug),
    queryFn: () => fetchNewsDetail(slug),
  }),
};
