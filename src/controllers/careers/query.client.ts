import { QueryDef } from "../common";
import {
  fetchCareerPageDetail,
  fetchMemberList,
  fetchProfileDetail,
  fetchProfileList,
  fetchProjectDetail,
} from "./fetch";
import { careersQueryKeys } from "./keys";
import {
  AdminMemberListResponse,
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
  memberList: (): QueryDef<AdminMemberListResponse> => ({
    queryKey: careersQueryKeys.memberList(),
    queryFn: () => fetchMemberList(),
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
