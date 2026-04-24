import { MediaSource } from "@domain/media";
import { News, NewsListItem } from "@domain/news";

// ===== Responses =====

export type NewsListResponse = {
  items: {
    id: string;
    slug: string;
    viewCount: number;
    data: NewsListItem;
  }[];
  totalPages: number;
};

export type NewsDetailResponse = {
  id: string;
  slug: string;
  isPublished: boolean;
  data: News;
  updatedAt: string;
  viewCount: number;
};

export type NewsListInfiniteResponse = {
  items: {
    id: string;
    slug: string;
    isPublished: boolean;
    data: {
      title: string;
      thumbnail: MediaSource;
      summary: string;
    };
  }[];
  page: number;
  limit: number;
  totalCount: number;
  hasNext: boolean;
  nextPage: number | null;
};

// export type WorkListInfiniteResponse = {
//   items: {
//     id: string;
//     slug: string;
//     isPublished: boolean;
//     data: WorkListItem;
//   }[];
//   page: number;
//   limit: number;
//   hasNext: boolean;
//   nextPage: number | null;
// };

// export type WorkDetailResponse = {
//   id: string;
//   slug: string;
//   isPublished: boolean;
//   data: Work;
//   updatedAt: string;
// };

// ===== Requests =====

export type NewsUpsertRequest = {
  slug: string;
  isPublished: boolean;
  data: News;
};
