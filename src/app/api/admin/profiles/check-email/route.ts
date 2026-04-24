import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@lib/supabase/admin";
import { decodeEmailParam } from "@utils/Email";
import { createSupabaseRouteClient } from "@lib/supabase/route";

/**
 * @openapi
 * /api/admin/profiles/check-email:
 *   get:
 *     tags:
 *       - Profiles
 *     summary: Check if email is available (admin/staff)
 *     parameters:
 *       - in: query
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok: { type: boolean }
 *                 available: { type: boolean }
 *                 message: { type: string }
 *       '400':
 *         description: Bad Request
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Server Error
 */
export async function GET(req: NextRequest) {
  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  const url = new URL(req.url);
  const raw = url.searchParams.get("email");

  if (!raw) {
    return applyCookies(
      NextResponse.json({ message: "email is required" }, { status: 400 }),
    );
  }

  const email = decodeEmailParam(raw);
  if (!email.includes("@")) {
    return applyCookies(
      NextResponse.json({ message: "invalid email" }, { status: 400 }),
    );
  }

  const { data: u, error: uErr } = await supabase.auth.getUser();
  if (uErr || !u.user) {
    return applyCookies(
      NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    );
  }

  const admin = createSupabaseAdminClient();

  const { data, error } = await admin
    .from("career_profiles")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (error) {
    return applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }

  return applyCookies(
    NextResponse.json({
      email,
      exists: !!data,
    }),
  );
}
