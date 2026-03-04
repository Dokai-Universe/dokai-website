import type {
  ProfileDetailResponse,
  ProfileListResponse,
  ProjectDetailResponse,
  ProfileUpsertRequest,
  ProjectUpsertRequest,
  CareerPageDetailResponse,
  CareerPageUpsertRequest,
} from "./types";
import { fetchApi } from "../common";
import { encodeEmailParam } from "@utils/Email";

export const fetchCareerPageDetail = () =>
  fetchApi<CareerPageDetailResponse>(`/api/public/careers`);

export const fetchCareerPageUpdate = (req: CareerPageUpsertRequest) =>
  fetchApi<void, CareerPageUpsertRequest>(`/api/admin/careers`, {
    method: "PUT",
    body: req,
  });

// Profile

export const fetchProfileCreate = (req: ProfileUpsertRequest) =>
  fetchApi<{ profileId: string }, ProfileUpsertRequest>(`/api/admin/profiles`, {
    method: "POST",
    body: req,
  });

export const fetchProfileList = () =>
  fetchApi<ProfileListResponse>(`/api/public/profiles`);

export const fetchProfileDetail = (email: string) =>
  fetchApi<ProfileDetailResponse>(
    `/api/public/profiles/${encodeEmailParam(email)}`,
    {
      method: "GET",
    },
  );

export const fetchProfileUpdate = (id: string, req: ProfileUpsertRequest) =>
  fetchApi<void, ProfileUpsertRequest>(`/api/admin/profiles/${id}`, {
    method: "PATCH",
    body: req,
  });

export const fetchProfileDelete = (id: string) =>
  fetchApi<void>(`/api/admin/profiles/${id}`, {
    method: "DELETE",
  });

export const fetchProfileCheckEmail = (email: string) =>
  fetchApi<{ exists: boolean }>(
    `/api/admin/profiles/check-email?email=${encodeEmailParam(email)}`,
  );

// Project

export const fetchProjectCreate = (req: ProjectUpsertRequest) =>
  fetchApi<{ projectId: string }, ProjectUpsertRequest>(`/api/admin/projects`, {
    method: "POST",
    body: req,
  });

export const fetchProjectDetail = (id: string) =>
  fetchApi<ProjectDetailResponse>(
    `/api/public/projects/${encodeURIComponent(id)}`,
    {
      method: "GET",
    },
  );

export const fetchProjectUpdate = (id: string, req: ProjectUpsertRequest) =>
  fetchApi<void, ProjectUpsertRequest>(
    `/api/admin/projects/${encodeURIComponent(id)}`,
    { method: "PATCH", body: req },
  );

export const fetchProjectDelete = (id: string) =>
  fetchApi<void>(`/api/admin/projects/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
