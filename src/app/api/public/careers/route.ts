import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";
import type { ProfileListItem } from "@domain/careers";

/**
 * @openapi
 * /api/public/careers:
 *   get:
 *     tags: [Careers]
 *     summary: List published profiles (email, avatar)
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ProfilesListResponse' }
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 */
export async function GET(req: NextRequest) {
  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  const { data, error } = await supabase
    .from("career_profiles")
    .select("email, data, updated_at")
    .order("updated_at", { ascending: false });

  if (error) {
    return applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }

  const items: ProfileListItem[] = (data ?? []).map((row) => ({
    email: row.email,
    avatar: (row.data?.avatar ?? null) as ProfileListItem["avatar"],
  }));

  return applyCookies(NextResponse.json({ items }));
}
