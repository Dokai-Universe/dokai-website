export const worksQueryKeys = {
  all: () => ["works"] as const,
  mainWorks: () => ["works", "main"] as const,
  workList: (category?: string) =>
    ["works", "list", category ?? "all"] as const,
  workSearch: (queries: string[]) => ["works", "search", ...queries] as const,
  workDetail: (slug: string) => ["works", "detail", slug] as const,
  checkSlug: (slug: string) => ["works", "check-slug", slug] as const,
};

export const worksMutationKeys = {
  createWork: () => ["works", "create"] as const,
  updateWork: () => ["works", "update"] as const,
  deleteWork: () => ["works", "delete"] as const,
};
