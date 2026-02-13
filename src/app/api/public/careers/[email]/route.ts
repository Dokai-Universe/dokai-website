import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";
import type { ProfileDetail, ProjectCard } from "@domain/careers";

/**
 * @openapi
 * /api/public/careers/{email}:
 *   get:
 *     tags: [Careers]
 *     summary: Get profile detail (projects are cards)
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ProfileDetailResponse' }
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
  context: { params: Promise<{ email: string }> },
) {
  const { email } = await context.params;
  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  const { data: profileRow, error: profileErr } = await supabase
    .from("career_profiles")
    .select("email, data, updated_at")
    .eq("email", email)
    .maybeSingle();

  if (profileErr) {
    return applyCookies(
      NextResponse.json({ message: profileErr.message }, { status: 500 }),
    );
  }
  if (!profileRow) {
    return applyCookies(
      NextResponse.json({ message: "Not Found" }, { status: 404 }),
    );
  }

  const { data: projectRows, error: projectErr } = await supabase
    .from("career_projects")
    .select("id, data, order_index")
    .eq("profile_email", email)
    .order("order_index", { ascending: true });

  if (projectErr) {
    return applyCookies(
      NextResponse.json({ message: projectErr.message }, { status: 500 }),
    );
  }

  const p = profileRow.data ?? {};

  const projects: ProjectCard[] = (projectRows ?? []).map((r) => ({
    id: r.id,
    title: r.data?.title ?? "",
    thumbnail: r.data?.thumbnail ?? null,
  }));

  const detail: ProfileDetail = {
    email: profileRow.email,
    avatar: p.avatar ?? null,
    bio: p.bio ?? "",
    contacts: p.contacts ?? [],
    experiences: p.experiences ?? [],
    projects,
  };

  return applyCookies(
    NextResponse.json({
      data: detail,
      updatedAt: profileRow.updated_at ?? null,
    }),
  );
}
