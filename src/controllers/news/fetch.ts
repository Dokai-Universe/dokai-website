import type {
  NewsDetailResponse,
  NewsListInfiniteResponse,
  NewsListResponse,
  NewsUpsertRequest,
} from "./types";
import { fetchApi } from "../common";

export const fetchNewsList = ({
  page = 1,
  limit = 16,
  query,
}: {
  page?: number;
  limit?: number;
  query?: string;
}) => {
  const queryParams = new URLSearchParams();
  if (page) queryParams.set("page", page.toString());
  if (limit) queryParams.set("limit", limit.toString());
  if (query) queryParams.set("query", query);
  return fetchApi<NewsListResponse>(
    `/api/public/news?${queryParams.toString()}`,
    {
      method: "GET",
    },
  );
};

export const fetchNewsSearch = ({
  queries,
  page = 1,
  limit = 16,
}: {
  queries?: string[];
  page?: number;
  limit?: number;
}) => {
  const query = new URLSearchParams();
  if (queries?.length) query.set("searchQueries", JSON.stringify(queries));
  if (page) query.set("page", page.toString());
  if (limit) query.set("limit", limit.toString());
  return fetchApi<NewsListInfiniteResponse>(
    `/api/public/search/news?${query.toString()}`,
    {
      method: "GET",
    },
  );
};

export const fetchNewsDetail = (slug: string) => {
  return fetchApi<NewsDetailResponse>(`/api/public/news/${slug}`, {
    method: "GET",
  });
};

export const fetchNewsCheckSlug = (slug: string) =>
  fetchApi<{ exists: boolean }>(
    `/api/admin/news/check-slug?slug=${encodeURIComponent(slug)}`,
    {
      method: "GET",
    },
  );

export const fetchNewsCreate = (body: NewsUpsertRequest) =>
  fetchApi<{ newsId: string }, NewsUpsertRequest>("/api/admin/news", {
    method: "POST",
    body: body,
  });

export const fetchNewsUpdate = (id: string, body: NewsUpsertRequest) =>
  fetchApi<void, NewsUpsertRequest>(`/api/admin/news/${id}`, {
    method: "PUT",
    body: body,
  });

export const fetchNewsDelete = (id: string) =>
  fetchApi<void>(`/api/admin/news/${id}`, {
    method: "DELETE",
  });
