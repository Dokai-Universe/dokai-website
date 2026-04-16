import { QueryDef } from "../common";
import { WorkDetailResponse } from "./types";
import { loadWorkDetail } from "./load";
import { worksQueryKeys } from "./keys";

export const worksQueriesServer = {
  workDetail: (slug: string): QueryDef<WorkDetailResponse | null> => ({
    queryKey: worksQueryKeys.workDetail(slug),
    queryFn: () => loadWorkDetail(slug),
  }),
};
