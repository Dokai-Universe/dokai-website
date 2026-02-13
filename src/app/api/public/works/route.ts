import { NextResponse, type NextRequest } from "next/server";
import type { Work, WorkCategory } from "@domain/work";
import { fetchWorks } from "@server/queries/works";
import { createSupabaseRouteClient } from "@lib/supabase/route";
import { createSupabaseAdminClient } from "@lib/supabase/admin";
import { tryGetRole } from "@lib/auth/tryGetRole";
import { requireRole } from "@lib/auth/requireRole";
import { normalizeWork } from "@server/normalize/work";

/**
 * @openapi
 * /api/public/works:
 *   get:
 *     tags: [Works]
 *     summary: List works (admin sees drafts too)
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema: { type: integer, minimum: 1, maximum: 50 }
 *       - in: query
 *         name: cursor
 *         schema: { type: string }
 *       - in: query
 *         name: category
 *         schema: { $ref: '#/components/schemas/WorkCategory' }
 *       - in: query
 *         name: productionType
 *         schema: { type: string }
 *       - in: query
 *         name: queries
 *         description: Repeatable. ex) ?queries=ai&queries=nike
 *         schema:
 *           type: array
 *           items: { type: string }
 *         style: form
 *         explode: true
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/WorkListResponse' }
 *   post:
 *     tags: [Works]
 *     summary: Create work (admin only)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/WorkCreateRequest' }
 *     responses:
 *       201:
 *         description: Created
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

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  const limit = Number(url.searchParams.get("limit") ?? "24");
  const cursor = url.searchParams.get("cursor") ?? undefined;

  const category = (url.searchParams.get("category") ?? undefined) as
    | WorkCategory
    | undefined;

  const productionType = url.searchParams.get("productionType") ?? undefined;

  // queries 반복 파라미터
  const queries = url.searchParams.getAll("queries");

  // ✅ 기본은 public client
  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  // ✅ 로그인/role 시도 (실패해도 public로 진행)
  const role = await tryGetRole(req);

  const isAdmin = role === "admin";
  const db = isAdmin ? createSupabaseAdminClient() : supabase;

  const result = await fetchWorks(db, {
    limit,
    cursor,
    category,
    productionType,
    queries,
    publishedOnly: !isAdmin,
  });

  return applyCookies(NextResponse.json(result));
}

// ✅ CREATE (admin only)
export async function POST(req: NextRequest) {
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

  const { slug, data, isPublished } = body as {
    slug: string;
    data: Work;
    isPublished?: boolean;
  };

  if (!data) {
    return auth.applyCookies(
      NextResponse.json({ message: "Missing data" }, { status: 400 }),
    );
  }

  const normalized = normalizeWork(data);

  const admin = createSupabaseAdminClient();
  const { data: created, error } = await admin
    .from("works")
    .insert({
      slug,
      data: normalized,
      is_published: isPublished ?? false, // 기본 draft 추천
    })
    .select("id, is_published, created_at")
    .single();

  if (error) {
    return auth.applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }

  return auth.applyCookies(
    NextResponse.json(
      {
        id: created.id,
        isPublished: created.is_published,
        createdAt: created.created_at,
      },
      { status: 201 },
    ),
  );
}
