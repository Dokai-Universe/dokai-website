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
  careerPageDetail: (): QueryDef<
    CareerPageDetailResponse,
    readonly ["careers-page", "career-page-detail"]
  > => ({
    queryKey: careersQueryKeys.careerPageDetail(),
    queryFn: () => fetchCareerPageDetail(),
  }),
  profileList: (): QueryDef<
    ProfileListResponse,
    readonly ["careers", "profile-list"]
  > => ({
    queryKey: careersQueryKeys.profileList(),
    queryFn: () => fetchProfileList(),
  }),
  profileDetail: (
    email: string,
  ): QueryDef<
    ProfileDetailResponse,
    readonly ["careers", "profile-detail", string]
  > => ({
    queryKey: careersQueryKeys.profileDetail(email),
    queryFn: () => fetchProfileDetail(email),
  }),
  projectDetail: (
    projectId: string,
  ): QueryDef<
    ProjectDetailResponse,
    readonly ["careers", "project-detail", string]
  > => ({
    queryKey: careersQueryKeys.projectDetail(projectId),
    queryFn: () => fetchProjectDetail(projectId),
  }),
};
