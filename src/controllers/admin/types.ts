import { Role } from "@lib/auth/types";

export type ChangeRoleRequest = {
  email: string;
  role: Role;
};

export type AddMemberRequest = {
  email: string;
  role: Role;
};
