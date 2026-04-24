import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@lib/supabase/admin";
import { createSupabaseRouteClient } from "@lib/supabase/route";

export async function GET(req: NextRequest) {
  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  const url = new URL(req.url);
  const raw = url.searchParams.get("slug");

  if (!raw) {
    return applyCookies(
      NextResponse.json({ message: "slug is required" }, { status: 400 }),
    );
  }

  const slug = decodeURIComponent(raw);

  const { data: u, error: uErr } = await supabase.auth.getUser();
  if (uErr || !u.user) {
    return applyCookies(
      NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    );
  }

  const admin = createSupabaseAdminClient();

  const { data, error } = await admin
    .from("news")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    return applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }

  return applyCookies(
    NextResponse.json({
      slug,
      exists: !!data,
    }),
  );
}
