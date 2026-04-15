export const worksQueryKeys = {
  mainWorks: () => ["works", "main-works"] as const,
  workList: (category?: string) => ["works", "list", category] as const,
  workDetail: (slug: string) => ["works", "work-detail", slug] as const,
  checkSlug: (slug: string) => ["works", "check-slug", slug] as const,
};

export const worksMutationKeys = {
  createWork: () => ["works"] as const,
  updateWork: () => ["works"] as const,
  deleteWork: () => ["works"] as const,
};
