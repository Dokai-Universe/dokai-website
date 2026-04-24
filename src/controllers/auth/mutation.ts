import { fetchLogout } from "./fetch";
import { authMutationKeys, authQueryKeys } from "./queryKeys";

export const authMutations = {
  logout: () => ({
    mutationKey: authMutationKeys.logout(),
    mutationFn: () => fetchLogout(),
    invalidateQueryKeys: [authQueryKeys.session()],
  }),
};
