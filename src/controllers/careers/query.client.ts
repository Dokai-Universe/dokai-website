import { QueryDef } from "../common";
import {
  fetchCareerPageDetail,
  fetchProfileDetail,
  fetchProfileList,
  fetchProjectDetail,
} from "./fetch";
import { careersQueryKeys } from "./keys";
import {
  CareerPageDetailResponse,
  ProfileDetailResponse,
  ProfileListResponse,
  ProjectDetailResponse,
} from "./types";

export const careersQueriesClient = {
  careerPageDetail: (): QueryDef<CareerPageDetailResponse> => ({
    queryKey: careersQueryKeys.careerPageDetail(),
    queryFn: () => fetchCareerPageDetail(),
  }),
  profileList: (): QueryDef<ProfileListResponse> => ({
    queryKey: careersQueryKeys.profileList(),
    queryFn: () => fetchProfileList(),
  }),
  profileDetail: (email: string): QueryDef<ProfileDetailResponse> => ({
    queryKey: careersQueryKeys.profileDetail(email),
    queryFn: () => fetchProfileDetail(email),
  }),
  projectDetail: (projectId: string): QueryDef<ProjectDetailResponse> => ({
    queryKey: careersQueryKeys.projectDetail(projectId),
    queryFn: () => fetchProjectDetail(projectId),
  }),
};
