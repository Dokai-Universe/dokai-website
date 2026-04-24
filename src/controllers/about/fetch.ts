import { fetchApi } from "../common";
import { AboutDetailResponse, AboutUpsertRequest } from "./types";

export const fetchAboutDetail = () =>
  fetchApi<AboutDetailResponse>(`/api/public/about`, {
    method: "GET",
  });

export const fetchAboutUpdate = (body: AboutUpsertRequest) =>
  fetchApi<void, AboutUpsertRequest>(`/api/admin/about`, {
    method: "PUT",
    body: body,
  });

export const fetchAboutDelete = () =>
  fetchApi<void>(`/api/admin/about`, {
    method: "DELETE",
  });
