import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";

/**
 * @openapi
 * /api/public/career/projects/{id}:
 *   get:
 *     tags:
 *       - Careers
 *     summary: Get project detail by id (public; admin/staff can see more)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CareerProjectDetailResponse'
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
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const { supabase: routeSupabase, applyCookies } =
    createSupabaseRouteClient(req);

  const { data, error } = await routeSupabase
    .from("career_projects")
    .select("id, data, is_published, updated_at")
    .eq("id", id)
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
      isPublished: data.is_published,
      data: { ...data.data, id: data.id },
      updatedAt: data.updated_at,
    }),
  );
}
