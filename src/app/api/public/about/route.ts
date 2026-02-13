import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";

/**
 * @openapi
 * /api/public/about:
 *   get:
 *     tags: [About]
 *     summary: Get about page (public, published only)
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/AboutPageResponse' }
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 */
export async function GET(req: NextRequest) {
  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  const { data, error } = await supabase
    .from("about_page")
    .select("id, data, is_published, updated_at")
    .eq("id", "main")
    .maybeSingle();

  if (error) {
    return applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }

  // RLS 상 published=false면 data가 null일 수 있음(혹은 row 자체가 조회 안됨)
  if (!data || !data.is_published) {
    return applyCookies(
      NextResponse.json({ message: "Not Found" }, { status: 404 }),
    );
  }

  return applyCookies(
    NextResponse.json({
      data: data.data,
      updatedAt: data.updated_at,
    }),
  );
}
