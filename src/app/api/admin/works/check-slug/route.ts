import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@lib/supabase/admin";
import { createSupabaseRouteClient } from "@lib/supabase/route";

/**
 * @openapi
 * /api/admin/works/check-slug:
 *   get:
 *     tags:
 *       - Works
 *     summary: Check if slug is available (admin/staff)
 *     parameters:
 *       - in: query
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
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
    .from("works")
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
