export const worksQueryKeys = {
  all: () => ["works"] as const,
  mainWorks: () => ["works", "main"] as const,
  workList: (category?: string) =>
    ["works", "list", category ?? "all"] as const,
  workSearch: (queries: string[]) => ["works", "search", ...queries] as const,
  adminWorkSearch: (query?: string) =>
    ["works", "admin-search", query] as const,
  adminFixedWorks: () => ["works", "admin-fixed-works"] as const,
  workDetail: (slug: string) => ["works", "detail", slug] as const,
  checkSlug: (slug: string) => ["works", "check-slug", slug] as const,
  workCategories: () => ["categories"] as const,
};

export const worksMutationKeys = {
  createWork: () => ["works", "create"] as const,
  updateWork: () => ["works", "update"] as const,
  deleteWork: () => ["works", "delete"] as const,
  categoriesUpdate: () => ["categories", "update-work"] as const,
  adminFixedWorksUpdate: () =>
    ["works", "admin-fixed-works", "update"] as const,
};
