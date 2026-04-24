import { NextResponse, type NextRequest } from "next/server";
import {
  createSupabaseRouteClient,
  supabaseErrorToStatus,
} from "@lib/supabase/route";
import { decodeEmailParam } from "@utils/Email";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ email: string }> },
) {
  const email = decodeEmailParam((await params).email);

  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  const { data: userRes, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userRes.user) {
    return applyCookies(
      NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    );
  }

  const { data, error } = await supabase
    .from("allowed_users")
    .delete()
    .eq("email", email)
    .select("user_id")
    .maybeSingle();

  if (error) {
    return applyCookies(
      NextResponse.json(
        { message: error.message },
        { status: supabaseErrorToStatus(error) },
      ),
    );
  }

  if (!data) {
    return applyCookies(
      NextResponse.json({ message: "Not Found" }, { status: 404 }),
    );
  }

  return applyCookies(NextResponse.json({ ok: true, user_id: data.user_id }));
}
