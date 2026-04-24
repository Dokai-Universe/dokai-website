import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";

export async function POST(req: NextRequest) {
  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  const { error } = await supabase.auth.signOut();

  if (error && !/session/i.test(error.message)) {
    return applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }

  return applyCookies(NextResponse.json({ ok: true }, { status: 200 }));
}
