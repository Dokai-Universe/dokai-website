import { fetchApi } from "../common";
import { SessionStatus } from "./types";

export const fetchSessionStatus = () =>
  fetchApi<SessionStatus>(`/api/public/auth/session`, {
    method: "GET",
  });

export const fetchLogout = () =>
  fetchApi<void>(`/api/public/auth/logout`, {
    method: "POST",
  });
