import { QueryDef } from "../common";
import { fetchMainWorks, fetchNewsDetail } from "./fetch";
import { newsQueryKeys } from "./keys";
import { NewsDetailResponse, NewsListResponse } from "./types";

export const newsQueriesClient = {
  newsList: (page: number): QueryDef<NewsListResponse> => ({
    queryKey: newsQueryKeys.newsList(page),
    queryFn: () => fetchMainWorks({ page }),
  }),
  newsDetail: (slug: string): QueryDef<NewsDetailResponse> => ({
    queryKey: newsQueryKeys.newsDetail(slug),
    queryFn: () => fetchNewsDetail(slug),
  }),
};
