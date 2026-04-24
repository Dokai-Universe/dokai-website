import { NextResponse, type NextRequest } from "next/server";
import { requireRole } from "@lib/auth/requireRole";
import { createSupabaseAdminClient } from "@lib/supabase/admin";

/**
 * @openapi
 * /api/admin/about:
 *   put:
 *     tags: [About]
 *     summary: Upsert about page (admin only)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/AboutPageUpsertRequest' }
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/AboutPageResponse' }
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 */
export async function PUT(req: NextRequest) {
  const auth = await requireRole(req, ["admin"]);
  if (!auth.ok) {
    return auth.applyCookies(
      NextResponse.json({ message: auth.message }, { status: auth.status }),
    );
  }

  const body = await req.json().catch(() => null);
  if (!body || !body.data) {
    return auth.applyCookies(
      NextResponse.json({ message: "Invalid body" }, { status: 400 }),
    );
  }

  const admin = createSupabaseAdminClient();

  const { data, error } = await admin
    .from("page_detail")
    .upsert(
      {
        id: "about",
        data: body.data,
      },
      { onConflict: "id" },
    )
    .select("id, data, updated_at")
    .single();

  if (error) {
    return auth.applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }

  return auth.applyCookies(
    NextResponse.json({
      data: data.data,
      updatedAt: data.updated_at,
    }),
  );
}
