import { encodeEmailParam } from "@utils/Email";
import { fetchApi } from "../common";
import { AddMemberRequest, ChangeRoleRequest } from "./types";

export const fetchMemberList = () =>
  fetchApi<{ items: { email: string; role: string }[] }>(`/api/admin/members`, {
    method: "GET",
  });

export const fetchAddMember = (body: AddMemberRequest) =>
  fetchApi<{ user_id: string }, AddMemberRequest>(`/api/admin/members`, {
    method: "POST",
    body,
  });

export const fetchChangeRole = (body: ChangeRoleRequest) =>
  fetchApi<{ user_id: string }, ChangeRoleRequest>(
    `/api/admin/members/change-role`,
    {
      method: "PATCH",
      body,
    },
  );

export const fetchDeleteMember = (email: string) =>
  fetchApi<{ user_id: string }, string>(
    `/api/admin/members/${encodeEmailParam(email)}`,
    {
      method: "DELETE",
    },
  );
