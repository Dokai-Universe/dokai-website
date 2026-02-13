import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@lib/supabase/admin";
import { requireCareerEditor } from "@lib/auth/requireCareerEditor";
import { normalizeProfileData, type ProfileData } from "@server/models/careers";

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/**
 * @openapi
 * /api/admin/careers/{email}:
 *   put:
 *     tags: [Careers]
 *     summary: Upsert profile (admin or staff-self)
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ProfileUpsertRequest' }
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [ok, email, updatedAt]
 *               properties:
 *                 ok: { type: boolean }
 *                 email: { type: string }
 *                 updatedAt: { type: string, nullable: true }
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
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 */
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ email: string }> },
) {
  const { email } = await context.params;

  const auth = await requireCareerEditor(req, email);
  if (!auth.ok) {
    return auth.applyCookies(
      NextResponse.json({ message: auth.message }, { status: auth.status }),
    );
  }

  const raw = (await req.json().catch(() => null)) as unknown;
  if (!isRecord(raw)) {
    return auth.applyCookies(
      NextResponse.json({ message: "Invalid JSON" }, { status: 400 }),
    );
  }

  const dataRaw = (raw as { data?: unknown }).data;
  if (!isRecord(dataRaw)) {
    return auth.applyCookies(
      NextResponse.json({ message: "`data` is required" }, { status: 400 }),
    );
  }

  const isPublished = (raw as { isPublished?: unknown }).isPublished;
  if (isPublished !== undefined && typeof isPublished !== "boolean") {
    return auth.applyCookies(
      NextResponse.json(
        { message: "`isPublished` must be boolean" },
        { status: 400 },
      ),
    );
  }

  const normalized = normalizeProfileData(dataRaw as Partial<ProfileData>);

  const admin = createSupabaseAdminClient();
  const payload: {
    email: string;
    data: ProfileData;
    is_published?: boolean;
  } = { email, data: normalized };

  if (typeof isPublished === "boolean") payload.is_published = isPublished;

  const { data: upserted, error } = await admin
    .from("career_profiles")
    .upsert(payload, { onConflict: "email" })
    .select("email, updated_at")
    .maybeSingle<{ email: string; updated_at: string | null }>();

  if (error) {
    return auth.applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }

  return auth.applyCookies(
    NextResponse.json({
      ok: true,
      email: upserted?.email ?? email,
      updatedAt: upserted?.updated_at ?? null,
    }),
  );
}
