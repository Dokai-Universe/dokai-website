import { NextResponse, type NextRequest } from "next/server";
import {
  createSupabaseRouteClient,
  supabaseErrorToStatus,
} from "@lib/supabase/route";
import { ChangeRoleRequest } from "@controllers/admin/types";

export async function PATCH(req: NextRequest) {
  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  const { data: userRes, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userRes.user) {
    return applyCookies(
      NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    );
  }

  let body: ChangeRoleRequest;
  try {
    body = (await req.json()) as ChangeRoleRequest;
  } catch {
    return applyCookies(
      NextResponse.json({ message: "Invalid JSON body" }, { status: 400 }),
    );
  }

  const nextRole = body.role;
  const nextEmail = body.email.toLowerCase();

  const { data, error } = await supabase
    .from("allowed_users")
    .update({ role: nextRole })
    .eq("email", nextEmail)
    .select("user_id, email, role")
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

  return applyCookies(
    NextResponse.json({
      ok: true,
      user_id: data.user_id,
    }),
  );
}
