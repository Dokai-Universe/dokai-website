import { createSupabaseServerClient } from "@lib/supabase/server";
import { SessionStatus } from "./types";
import { Role } from "@lib/auth/types";

export const loadSessionStatus = async (): Promise<SessionStatus | null> => {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.getUser();
  const user = data.user;

  if (error || !user) {
    return null;
  }

  const userEmail = user.email?.toLowerCase() ?? null;

  const { data: roleRow } = await supabase
    .from("allowed_users")
    .select("role, email")
    .eq("user_id", user.id)
    .maybeSingle();

  const role = (roleRow?.role as Role) ?? null;
  const email = roleRow?.email ?? userEmail ?? null;

  const { data: profile } = await supabase
    .from("career_profiles")
    .select("email")
    .eq("email", email)
    .maybeSingle();

  return { email, role, hasProfile: !!profile };
};
