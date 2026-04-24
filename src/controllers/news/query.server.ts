import { QueryDef } from "../common";
import { NewsDetailResponse } from "./types";
import { loadNewsDetail } from "./load";
import { newsQueryKeys } from "./keys";

export const newsQueriesServer = {
  newsDetail: (slug: string): QueryDef<NewsDetailResponse | null> => ({
    queryKey: newsQueryKeys.newsDetail(slug),
    queryFn: () => loadNewsDetail(slug),
  }),
};
