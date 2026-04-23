import { NextResponse, type NextRequest } from "next/server";
import {
  createSupabaseRouteClient,
  supabaseErrorToStatus,
} from "@lib/supabase/route";
import { ProfileUpsertRequest } from "@controllers/careers/types";

/**
 * @openapi
 * /api/admin/career/profiles:
 *   post:
 *     tags:
 *       - Careers-Profile
 *     summary: Create profile (admin/staff; staff can create only own)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CareerCreateProfileRequest'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CareerProfileDetailResponse'
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export async function GET(req: NextRequest) {
  const { supabase: routeSupabase, applyCookies } =
    createSupabaseRouteClient(req);

  const { data: profileData, error: profileError } = await routeSupabase
    .from("career_profiles")
    .select("email, fixed_order")
    .order("updated_at", { ascending: false });

  if (profileError) {
    return applyCookies(
      NextResponse.json({ message: profileError.message }, { status: 500 }),
    );
  }

  const { data: membersData, error: membersError } = await routeSupabase
    .from("allowed_users")
    .select("email, role");

  if (membersError) {
    return applyCookies(
      NextResponse.json({ message: membersError.message }, { status: 500 }),
    );
  }

  const profileMap = new Map<
    string,
    {
      fixedOrder: number | null;
    }
  >();

  for (const row of profileData ?? []) {
    const email = (row.email ?? "").toLowerCase().trim();
    if (!email) continue;

    profileMap.set(email, {
      fixedOrder: row.fixed_order ?? null,
    });
  }

  const memberRoleMap = new Map<string, string | null>();

  for (const row of membersData ?? []) {
    const email = (row.email ?? "").toLowerCase().trim();
    if (!email) continue;

    memberRoleMap.set(email, row.role ?? null);
  }

  const allEmails = new Set<string>([
    ...profileMap.keys(),
    ...memberRoleMap.keys(),
  ]);

  const items = [...allEmails].map((email) => ({
    email,
    role: memberRoleMap.get(email) ?? null,
    fixedOrder: profileMap.get(email)?.fixedOrder ?? null,
  }));

  return applyCookies(NextResponse.json({ items }));
}

export async function POST(req: NextRequest) {
  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  let body: ProfileUpsertRequest;
  try {
    body = (await req.json()) as ProfileUpsertRequest;
  } catch {
    return applyCookies(
      NextResponse.json({ message: "Invalid JSON body" }, { status: 400 }),
    );
  }

  const { data: userRes, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userRes.user) {
    return applyCookies(
      NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    );
  }

  const email = (body.data.email ?? "").toString();
  if (!email) {
    return applyCookies(
      NextResponse.json({ message: "email is required" }, { status: 400 }),
    );
  }

  const { data, error } = await supabase
    .from("career_profiles")
    .insert({
      email,
      data: body.data,
      is_published: !!body.isPublished,
    })
    .select("id")
    .single();

  if (error) {
    return applyCookies(
      NextResponse.json(
        { message: error.message },
        { status: supabaseErrorToStatus(error) },
      ),
    );
  }

  return applyCookies(
    NextResponse.json(
      {
        profileId: data.id,
      },
      { status: 201 },
    ),
  );
}
