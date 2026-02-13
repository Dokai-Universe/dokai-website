import { NextRequest } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";

export async function requireUser(req: NextRequest) {
  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return { user: null, supabase, applyCookies };
  }

  return { user: data.user, supabase, applyCookies };
}
