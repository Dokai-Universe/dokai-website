import { InfiniteQueryDef, QueryDef } from "../common";
import {
  fetchCareerPageDetail,
  fetchMemberList,
  fetchProfileDetail,
  fetchProfileList,
  fetchProjectDetail,
  fetchProjectSearch,
} from "./fetch";
import { careersQueryKeys } from "./keys";
import {
  AdminMemberListResponse,
  CareerPageDetailResponse,
  ProfileDetailResponse,
  ProfileListResponse,
  ProjectDetailResponse,
  ProjectListInfiniteResponse,
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
  projectSearch: (
    queries: string[],
  ): InfiniteQueryDef<ProjectListInfiniteResponse> => ({
    queryKey: careersQueryKeys.projectSearch(queries),
    queryFn: ({ pageParam }) =>
      fetchProjectSearch({ queries, page: pageParam, limit: 12 }),
  }),
  projectDetail: (projectId: string): QueryDef<ProjectDetailResponse> => ({
    queryKey: careersQueryKeys.projectDetail(projectId),
    queryFn: () => fetchProjectDetail(projectId),
  }),
};
