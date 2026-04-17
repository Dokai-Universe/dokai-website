import type { NewsDetailResponse, NewsListResponse } from "./types";
import { fetchApi } from "../common";

export const fetchMainWorks = ({
  page = 1,
  limit = 16,
}: {
  page?: number;
  limit?: number;
}) => {
  const query = new URLSearchParams();
  if (page) query.set("page", page.toString());
  if (limit) query.set("limit", limit.toString());
  return fetchApi<NewsListResponse>(`/api/public/news?${query.toString()}`, {
    method: "GET",
  });
};

export const fetchNewsDetail = (slug: string) => {
  return fetchApi<NewsDetailResponse>(`/api/public/news/${slug}`, {
    method: "GET",
  });
};
