import { Work, WorkListItem } from "@domain/work";

// ===== Responses =====

export type WorkListResponse = {
  items: {
    id: string;
    slug: string;
    isPublished: boolean;
    data: WorkListItem;
  }[];
};

export type WorkListInfiniteResponse = {
  items: {
    id: string;
    slug: string;
    isPublished: boolean;
    data: WorkListItem;
  }[];
  page: number;
  limit: number;
  totalCount: number;
  hasNext: boolean;
  nextPage: number | null;
};

export type WorkDetailResponse = {
  id: string;
  slug: string;
  isPublished: boolean;
  data: Work;
  updatedAt: string;
};

export type WorkCategoriesResponse = {
  type: string;
  list: string[];
};

// ===== Requests =====

export type WorkUpsertRequest = {
  slug: string;
  isPublished: boolean;
  data: Work;
};
