import { fetchApi } from "@controllers/common";
import { OgData } from "./types";

export const fetchOgData = (url: string) =>
  fetchApi<OgData>(`/api/public/common/og?url=${encodeURIComponent(url)}`, {
    method: "GET",
  });
