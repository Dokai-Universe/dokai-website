import { Role } from "@lib/auth/types";

export type SessionStatus = {
  email: string;
  role: Role;
  hasProfile: boolean;
};
