import { NextResponse, type NextRequest } from "next/server";
import {
  createSupabaseRouteClient,
  supabaseErrorToStatus,
} from "@lib/supabase/route";
import { AddMemberRequest } from "@controllers/admin/types";

/**
 * @openapi
 * /api/public/profiles:
 *   get:
 *     tags:
 *       - Profiles
 *     summary: List career profiles (public; admin/staff can see more)
 *     description: "Public: published only. Admin: all. Staff: published + own profile."
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CareerProfileListResponse'
 *       '500':
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export async function GET(req: NextRequest) {
  const { supabase: routeSupabase, applyCookies } =
    createSupabaseRouteClient(req);

  const { data, error } = await routeSupabase
    .from("allowed_users")
    .select("email, role")
    .order("email", { ascending: true });

  if (error) {
    return applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }

  const items =
    data?.map((row) => ({
      email: row.email as string,
      role: row.role as string,
    })) ?? [];

  return applyCookies(NextResponse.json({ items }));
}

export async function POST(req: NextRequest) {
  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  const { data: userRes, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userRes.user) {
    return applyCookies(
      NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    );
  }

  let body: AddMemberRequest;
  try {
    body = (await req.json()) as AddMemberRequest;
  } catch {
    return applyCookies(
      NextResponse.json({ message: "Invalid JSON body" }, { status: 400 }),
    );
  }

  const nextRole = body.role;
  const nextEmail = body.email.toLowerCase();

  const { data, error } = await supabase
    .from("allowed_users")
    .insert({ email: nextEmail, role: nextRole })
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
