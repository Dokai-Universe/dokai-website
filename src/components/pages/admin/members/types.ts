export type AdminMemberRole = "admin" | "staff";

export type AdminMemberItem = {
  memberId: string;
  email: string;
  role: AdminMemberRole | null;
  isFixed: boolean;
  fixedOrder: number | null;
};
