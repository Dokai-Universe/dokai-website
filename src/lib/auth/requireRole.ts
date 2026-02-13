import type { NextRequest } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";
import { createSupabaseAdminClient } from "@lib/supabase/admin";

type Role = "admin" | "staff";

export async function requireRole(
  req: NextRequest,
  roles: Role[] = ["admin", "staff"],
) {
  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  const { data } = await supabase.auth.getUser();
  const user = data.user;

  if (!user) {
    return {
      ok: false as const,
      status: 401 as const,
      message: "Unauthorized",
      applyCookies,
    };
  }

  const admin = createSupabaseAdminClient();
  const { data: allowed, error } = await admin
    .from("allowed_users")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error || !allowed) {
    return {
      ok: false as const,
      status: 403 as const,
      message: "Not allowed",
      applyCookies,
    };
  }

  if (!roles.includes(allowed.role as Role)) {
    return {
      ok: false as const,
      status: 403 as const,
      message: "Forbidden",
      applyCookies,
    };
  }

  return {
    ok: true as const,
    user,
    role: allowed.role as Role,
    supabase,
    applyCookies,
  };
}
