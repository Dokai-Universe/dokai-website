import { fetchNewsCreate, fetchNewsDelete, fetchNewsUpdate } from "./fetch";
import { newsMutationKeys, newsQueryKeys } from "./keys";
import { NewsUpsertRequest } from "./types";

export const newsMutations = {
  createNews: () => ({
    mutationKey: newsMutationKeys.createNews(),
    mutationFn: (body: NewsUpsertRequest) => fetchNewsCreate(body),
    invalidateQueryKeys: [newsQueryKeys.all()],
  }),

  updateNews: (id: string) => ({
    mutationKey: newsMutationKeys.updateNews(),
    mutationFn: (body: NewsUpsertRequest) => fetchNewsUpdate(id, body),
    invalidateQueryKeys: [newsQueryKeys.all()],
  }),

  deleteNews: (id: string) => ({
    mutationKey: newsMutationKeys.deleteNews(),
    mutationFn: () => fetchNewsDelete(id),
    invalidateQueryKeys: [newsQueryKeys.all()],
  }),
};
