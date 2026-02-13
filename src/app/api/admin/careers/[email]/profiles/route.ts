import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@lib/supabase/admin";
import { requireCareerEditor } from "@lib/auth/requireCareerEditor";
import { normalizeProjectData, type ProjectData } from "@server/models/careers";

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

/**
 * @openapi
 * /api/admin/careers/{email}/projects:
 *   post:
 *     tags: [Careers]
 *     summary: Create project (admin or staff-self)
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ProjectCreateRequest' }
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required: [ok, id, updatedAt]
 *               properties:
 *                 ok: { type: boolean }
 *                 id: { type: string, nullable: true, description: uuid }
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
export async function POST(
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

  const orderIndex = (raw as { orderIndex?: unknown }).orderIndex;
  if (
    orderIndex !== undefined &&
    (typeof orderIndex !== "number" || !Number.isFinite(orderIndex))
  ) {
    return auth.applyCookies(
      NextResponse.json(
        { message: "`orderIndex` must be number" },
        { status: 400 },
      ),
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

  const normalized = normalizeProjectData(dataRaw as Partial<ProjectData>);

  const admin = createSupabaseAdminClient();

  const payload: {
    profile_email: string;
    data: ProjectData;
    order_index: number;
    is_published?: boolean;
  } = {
    profile_email: email,
    data: normalized,
    order_index: typeof orderIndex === "number" ? orderIndex : 0,
  };

  if (typeof isPublished === "boolean") payload.is_published = isPublished;

  const { data: created, error } = await admin
    .from("career_projects")
    .insert(payload)
    .select("id, updated_at")
    .maybeSingle<{ id: string; updated_at: string | null }>();

  if (error) {
    return auth.applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }

  return auth.applyCookies(
    NextResponse.json({
      ok: true,
      id: created?.id ?? null,
      updatedAt: created?.updated_at ?? null,
    }),
  );
}
