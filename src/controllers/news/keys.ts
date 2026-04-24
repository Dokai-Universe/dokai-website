export const newsQueryKeys = {
  all: () => ["news"] as const,
  newsList: ({ query, page }: { query?: string; page: number }) =>
    ["news", "list", page, query] as const,
  newsSearch: (queries: string[]) => ["news", "search", ...queries] as const,
  newsDetail: (slug: string) => ["news", "detail", slug] as const,
};

export const newsMutationKeys = {
  createNews: () => ["news", "create"] as const,
  updateNews: () => ["news", "update"] as const,
  deleteNews: () => ["news", "delete"] as const,
};
