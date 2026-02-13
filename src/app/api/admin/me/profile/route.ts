import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";

/**
 * @openapi
 * /api/admin/me/profile:
 *   get:
 *     tags: [Careers]
 *     summary: Check if the current logged-in user has a profile row
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [exists]
 *               properties:
 *                 exists: { type: boolean }
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 */
export async function GET(req: NextRequest) {
  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  const { data: userData, error: userErr } = await supabase.auth.getUser();
  if (userErr) {
    return applyCookies(
      NextResponse.json({ message: userErr.message }, { status: 500 }),
    );
  }

  const email = userData.user?.email;
  if (!email) {
    return applyCookies(
      NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    );
  }

  // 존재 여부만 확인
  const { data: row, error } = await supabase
    .from("career_profiles")
    .select("email")
    .eq("email", email)
    .maybeSingle<{ email: string }>();

  if (error) {
    return applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }

  return applyCookies(NextResponse.json({ exists: !!row }));
}
