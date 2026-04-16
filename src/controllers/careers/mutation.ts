import { authQueryKeys } from "@controllers/auth/queryKeys";
import {
  fetchCareerPageUpdate,
  fetchProfileCreate,
  fetchProfileDelete,
  fetchProfileUpdate,
  fetchProjectCreate,
  fetchProjectDelete,
  fetchProjectUpdate,
} from "./fetch";
import { careersMutationKeys, careersQueryKeys } from "./keys";
import {
  CareerPageUpsertRequest,
  ProfileUpsertRequest,
  ProjectUpsertRequest,
} from "./types";

export const careersMutations = {
  updateCareersPage: () => ({
    mutationKey: careersMutationKeys.careerPageUpdate(),
    mutationFn: (body: CareerPageUpsertRequest) => fetchCareerPageUpdate(body),
    invalidateQueryKeys: [
      careersQueryKeys.careerPageDetail(),
      careersQueryKeys.all(),
    ],
  }),
  createProfile: () => ({
    mutationKey: careersMutationKeys.createProfile(),
    mutationFn: (body: ProfileUpsertRequest) => fetchProfileCreate(body),
    invalidateQueryKeys: [careersQueryKeys.all(), authQueryKeys.session()],
  }),
  updateProfile: (id: string) => ({
    mutationKey: careersMutationKeys.updateProfile(),
    mutationFn: (body: ProfileUpsertRequest) => fetchProfileUpdate(id, body),
    invalidateQueryKeys: [careersQueryKeys.all()],
  }),
  deleteProfile: (id: string) => ({
    mutationKey: careersMutationKeys.deleteProfile(),
    mutationFn: () => fetchProfileDelete(id),
    invalidateQueryKeys: [careersQueryKeys.all(), authQueryKeys.session()],
  }),
  createProject: (email: string) => ({
    mutationKey: careersMutationKeys.createProject(),
    mutationFn: (body: ProjectUpsertRequest) => fetchProjectCreate(body),
    invalidateQueryKeys: [careersQueryKeys.allByEmail(email)],
  }),
  updateProject: (email: string, id: string) => ({
    mutationKey: careersMutationKeys.updateProject(),
    mutationFn: (body: ProjectUpsertRequest) => fetchProjectUpdate(id, body),
    invalidateQueryKeys: [
      careersQueryKeys.allByEmail(email),
      careersQueryKeys.projectDetail(id),
    ],
  }),
  deleteProject: (email: string, id: string) => ({
    mutationKey: careersMutationKeys.deleteProject(),
    mutationFn: () => fetchProjectDelete(id),
    invalidateQueryKeys: [
      careersQueryKeys.allByEmail(email),
      careersQueryKeys.projectDetail(id),
    ],
  }),
};
