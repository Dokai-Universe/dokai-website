import { QueryDef } from "../common";
import { fetchAboutDetail } from "./fetch";
import { aboutQueryKeys } from "./keys";
import { AboutDetailResponse } from "./types";

export const aboutQueriesClient = {
  aboutDetail: (): QueryDef<AboutDetailResponse> => ({
    queryKey: aboutQueryKeys.aboutDetail(),
    queryFn: () => fetchAboutDetail(),
  }),
};
