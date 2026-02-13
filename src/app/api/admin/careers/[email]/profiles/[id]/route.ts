import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@lib/supabase/admin";
import { requireCareerEditor } from "@lib/auth/requireCareerEditor";
import { normalizeProjectData, type ProjectData } from "@server/models/careers";

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

type ProjectRow = { data: ProjectData } | null;

/**
 * @openapi
 * /api/admin/careers/{email}/projects/{id}:
 *   patch:
 *     tags: [Careers]
 *     summary: Update project (admin or staff-self)
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema: { type: string }
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, description: uuid }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ProjectPatchRequest' }
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
 *                 id: { type: string, description: uuid }
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
 *
 *   delete:
 *     tags: [Careers]
 *     summary: Delete project (admin or staff-self)
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
 *             schema:
 *               type: object
 *               required: [ok, id]
 *               properties:
 *                 ok: { type: boolean }
 *                 id: { type: string, description: uuid }
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
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ email: string; id: string }> },
) {
  const { email, id } = await context.params;

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

  const dataPatch = (raw as { data?: unknown }).data;
  const orderIndex = (raw as { orderIndex?: unknown }).orderIndex;
  const isPublished = (raw as { isPublished?: unknown }).isPublished;

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
  if (isPublished !== undefined && typeof isPublished !== "boolean") {
    return auth.applyCookies(
      NextResponse.json(
        { message: "`isPublished` must be boolean" },
        { status: 400 },
      ),
    );
  }
  if (dataPatch !== undefined && !isRecord(dataPatch)) {
    return auth.applyCookies(
      NextResponse.json({ message: "`data` must be object" }, { status: 400 }),
    );
  }

  const admin = createSupabaseAdminClient();

  let nextData: ProjectData | undefined;

  if (dataPatch && isRecord(dataPatch)) {
    const { data: prev, error: prevErr } = await admin
      .from("career_projects")
      .select("data")
      .eq("id", id)
      .eq("profile_email", email)
      .maybeSingle<ProjectRow>();

    if (prevErr) {
      return auth.applyCookies(
        NextResponse.json({ message: prevErr.message }, { status: 500 }),
      );
    }
    if (!prev) {
      return auth.applyCookies(
        NextResponse.json({ message: "Not Found" }, { status: 404 }),
      );
    }

    // merge -> normalize
    const merged = {
      ...(prev.data ?? {}),
      ...(dataPatch as Partial<ProjectData>),
    };
    nextData = normalizeProjectData(merged);
  }

  const updatePayload: {
    data?: ProjectData;
    order_index?: number;
    is_published?: boolean;
  } = {};

  if (nextData) updatePayload.data = nextData;
  if (typeof orderIndex === "number") updatePayload.order_index = orderIndex;
  if (typeof isPublished === "boolean")
    updatePayload.is_published = isPublished;

  if (Object.keys(updatePayload).length === 0) {
    return auth.applyCookies(
      NextResponse.json({ message: "Nothing to update" }, { status: 400 }),
    );
  }

  const { data: updated, error } = await admin
    .from("career_projects")
    .update(updatePayload)
    .eq("id", id)
    .eq("profile_email", email)
    .select("id, updated_at")
    .maybeSingle<{ id: string; updated_at: string | null }>();

  if (error) {
    return auth.applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }
  if (!updated) {
    return auth.applyCookies(
      NextResponse.json({ message: "Not Found" }, { status: 404 }),
    );
  }

  return auth.applyCookies(
    NextResponse.json({
      ok: true,
      id: updated.id,
      updatedAt: updated.updated_at ?? null,
    }),
  );
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ email: string; id: string }> },
) {
  const { email, id } = await context.params;

  const auth = await requireCareerEditor(req, email);
  if (!auth.ok) {
    return auth.applyCookies(
      NextResponse.json({ message: auth.message }, { status: auth.status }),
    );
  }

  const admin = createSupabaseAdminClient();

  const { data: deleted, error } = await admin
    .from("career_projects")
    .delete()
    .eq("id", id)
    .eq("profile_email", email)
    .select("id")
    .maybeSingle<{ id: string }>();

  if (error) {
    return auth.applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }
  if (!deleted) {
    return auth.applyCookies(
      NextResponse.json({ message: "Not Found" }, { status: 404 }),
    );
  }

  return auth.applyCookies(NextResponse.json({ ok: true, id: deleted.id }));
}
