import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";

/**
 * @openapi
 * /api/public/profiles:
 *   get:
 *     tags:
 *       - Profiles
 *     summary: List career profiles (public; admin/staff can see more)
 *     description: "Public: published only. Admin: all. Staff: published + own profile."
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CareerProfileListResponse'
 *       '500':
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export async function GET(req: NextRequest) {
  const { supabase: routeSupabase, applyCookies } =
    createSupabaseRouteClient(req);

  const { data, error } = await routeSupabase
    .from("career_profiles")
    .select(
      "email, data->name, data->role, data->avatar, is_published, fixed_order",
    )
    .order("fixed_order", { ascending: false, nullsFirst: false })
    .order("updated_at", { ascending: false });

  if (error) {
    return applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }

  const items =
    data?.map((row) => ({
      email: row.email as string,
      avatar: row.avatar ?? null,
      name: row.name ?? "",
      role: row.role ?? "",
      fixedOrder: row.fixed_order ?? null,
    })) ?? [];

  return applyCookies(NextResponse.json({ items }));
}
