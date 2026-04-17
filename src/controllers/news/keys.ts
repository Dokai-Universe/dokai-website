export const newsQueryKeys = {
  all: () => ["news"] as const,
  newsList: (page: number) => ["news", "list", page] as const,
  newsDetail: (slug: string) => ["news", "detail", slug] as const,
};

export const newsMutationKeys = {
  createNews: () => ["news", "create"] as const,
  updateNews: () => ["news", "update"] as const,
  deleteNews: () => ["news", "delete"] as const,
};
