export type AdminMemberRole = "admin" | "staff";

export type AdminMemberItem = {
  memberId: string;
  email: string;
  role: AdminMemberRole | null;
  isFixed: boolean;
  fixedOrder: number | null;
};

export type AdminMemberDiffPayload = {
  created: AdminMemberItem[];
  updated: AdminMemberItem[];
  deleted: AdminMemberItem[];
};
