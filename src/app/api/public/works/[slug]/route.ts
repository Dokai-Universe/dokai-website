import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";

/**
 * @openapi
 * /api/public/works/{slug}:
 *   get:
 *     tags:
 *       - Works
 *     summary: Get work detail by slug (public, published only)
 *     parameters:
 *       - in: path
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
 *               $ref: '#/components/schemas/WorkDetailResponse'
 *       '404':
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { supabase, applyCookies } = createSupabaseRouteClient(req);
  const slug = decodeURIComponent((await params).slug);

  const { data, error } = await supabase
    .from("works")
    .select("id, slug, data, is_published, updated_at")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    return applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }

  if (!data) {
    return applyCookies(
      NextResponse.json({ message: "Not Found" }, { status: 404 }),
    );
  }

  return applyCookies(
    NextResponse.json({
      id: data.id,
      slug: data.slug,
      isPublished: data.is_published,
      data: data.data,
      updatedAt: data.updated_at,
    }),
  );
}
