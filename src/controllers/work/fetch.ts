import { Work, WorkCard, WorkCategory } from "@domain/work";
import { notFound } from "next/navigation";

// export const fetchAbout = async (): Promise<AboutPageResponse> => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/public/about`,
//     {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     },
//   );

//   if (res.status === 404) {
//     return { data: { intro: "", contents: [] }, updatedAt: null };
//   }

//   if (!res.ok) {
//     throw new Error(`Failed to fetch about: ${res.status}`);
//   }

//   return res.json();
// };

export type WorkListResponse = {
  items: WorkCard[];
  hasNext: boolean;
  page: number;
  pageSize: number;
  total: number;
};

export type WorkMode = "main" | "category" | "search";

export type FetchWorksParams = {
  mode?: WorkMode;
  page?: number; // 1-based
  pageSize?: number;
  category?: WorkCategory | "EVERYTHING";
  q?: string[]; // repeatable
};

export async function fetchWorkList({
  mode = "main",
  page = 1,
  pageSize = 12,
  category = "EVERYTHING",
  q = [],
}: FetchWorksParams = {}) {
  const sp = new URLSearchParams();
  sp.set("mode", mode);
  sp.set("page", String(page));
  sp.set("pageSize", String(pageSize));
  sp.set("category", category);

  // repeatable q
  q.filter(Boolean).forEach((v) => sp.append("q", v));

  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_SITE_URL ?? ""
    }/api/public/works?${sp.toString()}`,
    {
      method: "GET",
      // 캐시 정책은 취향/요구사항에 맞게
      cache: "no-store",
      headers: { Accept: "application/json" },
    },
  );

  if (res.status === 404) {
    return { items: [], hasNext: false, page: 0, pageSize: 0, total: 0 };
  }

  if (!res.ok) {
    // API가 {message}로 내려주니 최대한 활용
    let msg = `Request failed (${res.status})`;
    try {
      const j = await res.json();
      if (j?.message) msg = j.message;
    } catch {}
    throw new Error(msg);
  }

  return (await res.json()) as WorkListResponse;
}

export type WorkDetailResponse = {
  id: string;
  slug: string;
  data: Work;
  isPublished: boolean;
  updatedAt: string;
};

export const fetchWorkDetail = async (
  slug: string,
  opts?: { cookie?: string },
): Promise<WorkDetailResponse> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/public/works/${slug}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(opts?.cookie ? { cookie: opts.cookie } : {}),
      },
    },
  );

  if (res.status === 404) {
    notFound();
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch work: ${res.status}`);
  }

  const data = await res.json();
  data.data.publishedAt = new Date(data.data.publishedAt)
    .getFullYear()
    .toString();
  return data;
};

export const fetchWorkCreate = async (
  slug: string,
  isPublished: boolean,
  data: Work,
): Promise<void> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/admin/works`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug,
        isPublished,
        data: {
          ...data,
          publishedAt: new Date(data.publishedAt).toISOString(),
        },
      }),
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to create work: ${res.status}`);
  }
};

export const fetchWorkDelete = async (id: string): Promise<void> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/admin/works/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to delete work: ${res.status}`);
  }
};

export const fetchWorkUpdate = async (
  id: string,
  slug: string,
  isPublished: boolean,
  data: Work,
): Promise<void> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/api/admin/works/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug,
        isPublished,
        data: {
          ...data,
          publishedAt: new Date(data.publishedAt).toISOString(),
        },
      }),
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to update work: ${res.status}`);
  }
};
