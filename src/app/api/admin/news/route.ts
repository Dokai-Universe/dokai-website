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
