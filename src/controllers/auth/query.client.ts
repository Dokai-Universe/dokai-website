import { QueryDef } from "../common";
import { SessionStatus } from "./types";
import { fetchSessionStatus } from "./fetch";
import { authQueryKeys } from "./queryKeys";

export const authQueriesClient = {
  sessionStatus: (): QueryDef<SessionStatus | null, readonly ["session"]> => ({
    queryKey: authQueryKeys.session(),
    queryFn: () => fetchSessionStatus(),
  }),
};
