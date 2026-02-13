import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";
import type { Project } from "@domain/careers";

/**
 * @openapi
 * /api/public/careers/{email}/{id}:
 *   get:
 *     tags: [Careers]
 *     summary: Get project detail (by email + project id)
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, description: uuid }
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ProjectResponse' }
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 */
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ email: string; id: string }> },
) {
  const { email, id } = await context.params;
  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  const { data: row, error } = await supabase
    .from("career_projects")
    .select("id, profile_email, data, updated_at")
    .eq("profile_email", email)
    .eq("id", id)
    .maybeSingle();

  if (error) {
    return applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }
  if (!row) {
    return applyCookies(
      NextResponse.json({ message: "Not Found" }, { status: 404 }),
    );
  }

  const project: Project = {
    id: row.id,
    title: row.data?.title ?? "",
    thumbnail: row.data?.thumbnail ?? null,
    contents: row.data?.contents ?? [],
    medias: row.data?.medias ?? [],
  };

  return applyCookies(
    NextResponse.json({ data: project, updatedAt: row.updated_at ?? null }),
  );
}
