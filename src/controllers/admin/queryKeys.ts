export const adminQueryKeys = {
  members: () => ["members"] as const,
};

export const adminMutationKeys = {
  addMember: () => ["add-member"] as const,
  changeRole: () => ["change-role"] as const,
  deleteMember: () => ["delete-member"] as const,
};
