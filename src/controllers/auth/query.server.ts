import { QueryDef } from "../common";
import { SessionStatus } from "./types";
import { loadSessionStatus } from "./load";
import { authQueryKeys } from "./queryKeys";

export const authQueriesServer = {
  sessionStatus: (): QueryDef<SessionStatus | null, readonly ["session"]> => ({
    queryKey: authQueryKeys.session(),
    queryFn: () => loadSessionStatus(),
  }),
};
