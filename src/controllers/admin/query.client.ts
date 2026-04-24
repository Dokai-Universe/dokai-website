import { QueryDef } from "../common";
import { fetchMemberList } from "./fetch";
import { adminQueryKeys } from "./queryKeys";

export const adminQueriesClient = {
  members: (): QueryDef<
    { items: { email: string; role: string }[] },
    readonly ["members"]
  > => ({
    queryKey: adminQueryKeys.members(),
    queryFn: () => fetchMemberList(),
  }),
};
