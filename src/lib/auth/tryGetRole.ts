import type { NextRequest } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";

export async function tryGetRole(
  req: NextRequest,
): Promise<"admin" | "staff" | null> {
  try {
    const { supabase } = createSupabaseRouteClient(req);

    const { data: userData, error: userErr } = await supabase.auth.getUser();
    const user = userData.user;

    if (userErr || !user) return null;

    const { data: allowed, error } = await supabase
      .from("allowed_users")
      .select("role")
      .eq("user_id", user.id)
      .maybeSingle();

    if (error || !allowed) return null;

    return allowed.role === "admin" ? "admin" : "staff";
  } catch {
    return null;
  }
}
