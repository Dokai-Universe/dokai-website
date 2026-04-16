import { fetchWorkCreate, fetchWorkDelete, fetchWorkUpdate } from "./fetch";
import { worksMutationKeys, worksQueryKeys } from "./keys";
import { WorkUpsertRequest } from "./types";

export const worksMutations = {
  createWork: () => ({
    mutationKey: worksMutationKeys.createWork(),
    mutationFn: (body: WorkUpsertRequest) => fetchWorkCreate(body),
    invalidateQueryKeys: [worksQueryKeys.all()],
  }),

  updateWork: (id: string) => ({
    mutationKey: worksMutationKeys.updateWork(),
    mutationFn: (body: WorkUpsertRequest) => fetchWorkUpdate(id, body),
    invalidateQueryKeys: [worksQueryKeys.all()],
  }),

  deleteWork: (id: string) => ({
    mutationKey: worksMutationKeys.deleteWork(),
    mutationFn: () => fetchWorkDelete(id),
    invalidateQueryKeys: [worksQueryKeys.all()],
  }),
};
