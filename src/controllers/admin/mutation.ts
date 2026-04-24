import { fetchAddMember, fetchChangeRole, fetchDeleteMember } from "./fetch";
import { adminMutationKeys, adminQueryKeys } from "./queryKeys";
import { AddMemberRequest, ChangeRoleRequest } from "./types";

export const adminMutations = {
  changeRole: () => ({
    mutationKey: adminMutationKeys.changeRole(),
    mutationFn: (body: ChangeRoleRequest) => fetchChangeRole(body),
    invalidateQueries: [adminQueryKeys.members()],
  }),

  deleteMember: () => ({
    mutationKey: adminMutationKeys.deleteMember(),
    mutationFn: (email: string) => fetchDeleteMember(email),
    invalidateQueries: [adminQueryKeys.members()],
  }),

  addMember: () => ({
    mutationKey: adminMutationKeys.addMember(),
    mutationFn: (body: AddMemberRequest) => fetchAddMember(body),
    invalidateQueries: [adminQueryKeys.members()],
  }),
};
