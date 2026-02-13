import type { NextRequest } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";
import { createSupabaseAdminClient } from "@lib/supabase/admin";

export type CareerRole = "admin" | "staff";

type AllowedUserRow = { role: CareerRole } | null;

export async function requireCareerEditor(
  req: NextRequest,
  targetEmail: string,
) {
  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  // 1) 로그인 체크
  const { data: userData, error: userErr } = await supabase.auth.getUser();
  if (userErr) {
    return {
      ok: false as const,
      status: 500,
      message: userErr.message,
      applyCookies,
    };
  }

  const user = userData.user;
  if (!user?.email) {
    return {
      ok: false as const,
      status: 401,
      message: "Unauthorized",
      applyCookies,
    };
  }

  // 2) role 체크(service_role로 조회)
  const admin = createSupabaseAdminClient();
  const { data: allowed, error: allowErr } = await admin
    .from("allowed_users")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle<AllowedUserRow>();

  if (allowErr) {
    return {
      ok: false as const,
      status: 500,
      message: allowErr.message,
      applyCookies,
    };
  }

  const role = allowed?.role;
  if (!role) {
    return {
      ok: false as const,
      status: 403,
      message: "Forbidden",
      applyCookies,
    };
  }

  // 3) staff는 본인만
  if (role !== "admin" && user.email !== targetEmail) {
    return {
      ok: false as const,
      status: 403,
      message: "Forbidden",
      applyCookies,
    };
  }

  return {
    ok: true as const,
    role,
    userEmail: user.email,
    userId: user.id,
    applyCookies,
  };
}
