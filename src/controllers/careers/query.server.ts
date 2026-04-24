import { QueryDef } from "../common";
import { ProfileDetailResponse, ProfileListResponse } from "./types";
import { careersQueryKeys } from "./keys";
import { loadProfileDetail, loadProfileList } from "./load";

export const careersQueriesServer = {
  profileList: (): QueryDef<ProfileListResponse | null> => ({
    queryKey: careersQueryKeys.profileList(),
    queryFn: () => loadProfileList(),
  }),
  profileDetail: (email: string): QueryDef<ProfileDetailResponse | null> => ({
    queryKey: careersQueryKeys.profileDetail(email),
    queryFn: () => loadProfileDetail(email),
  }),
};
