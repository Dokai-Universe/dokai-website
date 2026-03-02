import type { NextRequest } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";
import { createSupabaseAdminClient } from "@lib/supabase/admin";

type Role = "admin" | "staff";

export async function getOptionalRole(req: NextRequest) {
  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  const { data, error } = await supabase.auth.getUser();
  const user = data.user;

  // (선택) getUser 에러도 쿠키는 적용해서 내려주는 게 안전함
  if (error || !user) {
    return {
      user: null,
      role: null as Role | null,
      isPrivileged: false,
      supabase,
      applyCookies,
    };
  }

  const admin = createSupabaseAdminClient();
  const { data: allowed, error: allowedErr } = await admin
    .from("allowed_users")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (allowedErr || !allowed) {
    return {
      user,
      role: null as Role | null,
      isPrivileged: false,
      supabase,
      applyCookies,
    };
  }

  const role = allowed.role as Role;

  return {
    user,
    role,
    isPrivileged: role === "admin" || role === "staff",
    supabase,
    applyCookies,
  };
}
