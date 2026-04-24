import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";
import { decodeEmailParam } from "@utils/Email";

/**
 * @openapi
 * /api/public/profiles/{email}:
 *   get:
 *     tags:
 *       - Profiles
 *     summary: Get profile detail by email (public; admin/staff can see more)
 *     parameters:
 *       - in: path
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
 *               $ref: '#/components/schemas/CareerProfileDetailResponse'
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
  { params }: { params: Promise<{ email: string }> },
) {
  const email = (await params).email;
  const targetEmail = decodeEmailParam(email);

  const { supabase: routeSupabase, applyCookies } =
    createSupabaseRouteClient(req);

  const { data: profile, error: pErr } = await routeSupabase
    .from("career_profiles")
    .select("id, email, data, is_published, updated_at")
    .eq("email", targetEmail)
    .maybeSingle();

  if (pErr) {
    return applyCookies(
      NextResponse.json({ message: pErr.message }, { status: 500 }),
    );
  }
  if (!profile) {
    return applyCookies(
      NextResponse.json({ message: "Not Found" }, { status: 404 }),
    );
  }

  const { data: projects, error: prErr } = await routeSupabase
    .from("career_projects")
    .select("id, data->title, data->thumbnail, is_published")
    .eq("owner_email", targetEmail)
    .order("updated_at", { ascending: false });

  if (prErr) {
    return applyCookies(
      NextResponse.json({ message: prErr.message }, { status: 500 }),
    );
  }

  return applyCookies(
    NextResponse.json({
      id: profile.id,
      isPublished: !!profile.is_published,
      data: {
        ...profile.data,
        projects:
          projects.map((p) => ({
            id: p.id,
            title: p.title ?? "",
            thumbnail: p.thumbnail ?? null,
          })) ?? [],
      },
      updatedAt: profile.updated_at,
    }),
  );
}
