import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";
import { createSupabaseAdminClient } from "@lib/supabase/admin";
import { tryGetRole } from "@lib/auth/tryGetRole";
import { requireRole } from "@lib/auth/requireRole";
import { normalizeWork } from "@server/normalize/work";
import { Work } from "@domain/work";

/**
 * @openapi
 * /api/public/works/{slug}:
 *   get:
 *     tags: [Works]
 *     summary: Get work by slug (admin sees drafts too)
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/WorkDetailResponse' }
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ErrorResponse' }
 *   patch:
 *     tags: [Works]
 *     summary: Update work (admin only)
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/WorkUpdateRequest' }
 *     responses:
 *       200:
 *         description: OK
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
 *   delete:
 *     tags: [Works]
 *     summary: Delete work (admin only)
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200:
 *         description: OK
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
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;

  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  const role = await tryGetRole(req);
  const isAdmin = role === "admin";

  const db = isAdmin ? createSupabaseAdminClient() : supabase;

  const { data, error } = await db
    .from("works")
    .select("id, slug, data, is_published, created_at, updated_at")
    .eq("slug", slug)
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

  if (!isAdmin && !data.is_published) {
    return applyCookies(
      NextResponse.json({ message: "Not Found" }, { status: 404 }),
    );
  }

  return applyCookies(
    NextResponse.json({
      id: data.id,
      data: data.data,
      isPublished: !!data.is_published,
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    }),
  );
}

// ✅ UPDATE (admin only)
// body: { data?: Partial<Work>, isPublished?: boolean }
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;

  const auth = await requireRole(req, ["admin"]);
  if (!auth.ok) {
    return auth.applyCookies(
      NextResponse.json({ message: auth.message }, { status: auth.status }),
    );
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return auth.applyCookies(
      NextResponse.json({ message: "Invalid JSON" }, { status: 400 }),
    );
  }

  const { data: patchData, isPublished } = body as {
    data?: Partial<Work>;
    isPublished?: boolean;
  };

  const admin = createSupabaseAdminClient();

  // 부분 업데이트를 하려면 기존 data를 읽고 merge 후 저장
  const nextUpdate: { data?: Work; is_published?: boolean } = {};
  if (patchData) {
    const { data: prev, error: prevErr } = await admin
      .from("works")
      .select("data")
      .eq("slug", slug)
      .maybeSingle();

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

    const merged = normalizeWork({ ...prev.data, ...patchData });
    nextUpdate.data = merged;
  }

  if (typeof isPublished === "boolean") {
    nextUpdate.is_published = isPublished;
  }

  if (Object.keys(nextUpdate).length === 0) {
    return auth.applyCookies(
      NextResponse.json({ message: "Nothing to update" }, { status: 400 }),
    );
  }

  const { data: updated, error } = await admin
    .from("works")
    .update(nextUpdate)
    .eq("slug", slug)
    .select("id, is_published, updated_at")
    .maybeSingle();

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
      id: updated.id,
      isPublished: !!updated.is_published,
      updatedAt: updated.updated_at,
    }),
  );
}

// ✅ DELETE (admin only)
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;

  const auth = await requireRole(req, ["admin"]);
  if (!auth.ok) {
    return auth.applyCookies(
      NextResponse.json({ message: auth.message }, { status: auth.status }),
    );
  }

  const admin = createSupabaseAdminClient();
  const { error } = await admin.from("works").delete().eq("slug", slug);

  if (error) {
    return auth.applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }

  return auth.applyCookies(NextResponse.json({ ok: true }));
}
