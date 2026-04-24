import { About } from "@domain/about";

// ===== Responses =====

export type AboutDetailResponse = {
  id: string;
  data: About;
  updatedAt: string;
};

// ===== Requests =====

export type AboutUpsertRequest = {
  data: About;
};
