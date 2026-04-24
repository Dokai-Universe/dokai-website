import { fetchAboutDelete, fetchAboutUpdate } from "./fetch";
import { aboutMutationKeys, aboutQueryKeys } from "./keys";
import { AboutUpsertRequest } from "./types";

export const aboutMutations = {
  updateAbout: () => ({
    mutationKey: aboutMutationKeys.updateAbout(),
    mutationFn: (body: AboutUpsertRequest) => fetchAboutUpdate(body),
    invalidateQueryKeys: [aboutQueryKeys.aboutDetail()],
  }),
  deleteAbout: () => ({
    mutationKey: aboutMutationKeys.deleteAbout(),
    mutationFn: () => fetchAboutDelete(),
    invalidateQueryKeys: [aboutQueryKeys.aboutDetail()],
  }),
};
