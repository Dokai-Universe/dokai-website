import type {
  WorkCategoriesResponse,
  WorkDetailResponse,
  WorkListInfiniteResponse,
  WorkListResponse,
  WorkUpsertRequest,
} from "./types";
import { fetchApi } from "../common";

export const fetchMainWorks = () =>
  fetchApi<WorkListResponse>(`/api/public/main`, {
    method: "GET",
  });

export const fetchWorkList = ({
  category,
  page = 1,
  limit = 16,
}: {
  category?: string;
  page?: number;
  limit?: number;
}) => {
  const query = new URLSearchParams();
  if (category) query.set("category", category);
  if (page) query.set("page", page.toString());
  if (limit) query.set("limit", limit.toString());

  return fetchApi<WorkListInfiniteResponse>(
    `/api/public/works?${query.toString()}`,
    {
      method: "GET",
    },
  );
};

export const fetchWorkSearch = ({
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

  return fetchApi<WorkListInfiniteResponse>(
    `/api/public/search/works?${query.toString()}`,
    {
      method: "GET",
    },
  );
};

export const fetchWorkDetail = (slug: string) =>
  fetchApi<WorkDetailResponse>(
    `/api/public/works/${encodeURIComponent(slug)}`,
    {
      method: "GET",
    },
  );

export const fetchWorkCheckSlug = (slug: string) =>
  fetchApi<{ exists: boolean }>(
    `/api/admin/works/check-slug?slug=${encodeURIComponent(slug)}`,
    {
      method: "GET",
    },
  );

export const fetchWorkCreate = (body: WorkUpsertRequest) =>
  fetchApi<{ workId: string }, WorkUpsertRequest>("/api/admin/works", {
    method: "POST",
    body: body,
  });

export const fetchWorkUpdate = (id: string, body: WorkUpsertRequest) =>
  fetchApi<void, WorkUpsertRequest>(`/api/admin/works/${id}`, {
    method: "PUT",
    body: body,
  });

export const fetchWorkDelete = (id: string) =>
  fetchApi<void>(`/api/admin/works/${id}`, {
    method: "DELETE",
  });

//

export const fetchWorkCategories = () =>
  fetchApi<WorkCategoriesResponse>(`/api/public/categories?type=works`, {
    method: "GET",
  });

export const fetchWorkCategoriesUpdate = (list: string[]) =>
  fetchApi<void, { type: "works"; list: string[] }>(`/api/admin/categories`, {
    method: "PATCH",
    body: { type: "works", list },
  });
