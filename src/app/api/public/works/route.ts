import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@lib/supabase/admin";
import { getOptionalRole } from "@lib/auth/optionalRole";

type Mode = "main" | "category" | "search";

const WORK_CATEGORIES = [
  "ANIMATE",
  "BRANDING",
  "CHARACTER",
  "AWARD",
  "FILM",
  "COMMERCIAL",
  "SOCIAL_CONTENTS",
] as const;

function parseIntOr(v: string | null, fallback: number) {
  if (!v) return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? Math.trunc(n) : fallback;
}

function normalizeCategory(raw: string | null) {
  if (!raw) return "EVERYTHING" as const;
  const v = raw.toUpperCase();
  if (v === "EVERYTHING") return "EVERYTHING" as const;
  if ((WORK_CATEGORIES as readonly string[]).includes(v)) {
    return v as (typeof WORK_CATEGORIES)[number];
  }
  return null;
}

/**
 * q 배열 파싱:
 * - ?q=asd&q=tmp
 * - ?q[]=asd&q[]=tmp
 */
function getQueryTokens(queries: string[]) {
  const tokens = queries
    .flatMap((s) => s.split(/\s+/g))
    .map((s) => s.trim())
    .filter(Boolean);

  return Array.from(new Set(tokens));
}

/**
 * websearch 타입 검색어 만들기
 * - 토큰을 공백으로 join하면 AND에 가깝게 동작
 */
function buildWebsearchQueryFromTokens(tokens: string[]) {
  const cleaned = tokens
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => t.replace(/[():"'\\]/g, " "))
    .map((t) => t.replace(/\s+/g, " ").trim())
    .filter((t) => t.length >= 2);

  if (cleaned.length === 0) return null;
  return cleaned.join(" ");
}

/**
 * @openapi
 * /api/public/works:
 *   get:
 *     tags:
 *       - Works
 *     summary: List works (public; admin/staff can see unpublished)
 *     description: "mode=main|category|search. Public returns published only; admin/staff returns all."
 *     parameters:
 *       - in: query
 *         name: mode
 *         required: false
 *         schema:
 *           type: string
 *           enum:
 *             - main
 *             - category
 *             - search
 *           default: main
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: pageSize
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 12
 *       - in: query
 *         name: category
 *         required: false
 *         schema:
 *           type: string
 *           default: EVERYTHING
 *       - in: query
 *         name: q
 *         required: false
 *         description: "Repeatable query param. Example: ?q=asd&q=tmp (also supports ?q[]=asd&q[]=tmp)"
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         style: form
 *         explode: true
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkListResponse'
 *       '400':
 *         description: Bad Request
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
export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  const mode = (url.searchParams.get("mode") ?? "main") as Mode;
  if (mode !== "main" && mode !== "category" && mode !== "search") {
    return NextResponse.json({ message: "Invalid mode" }, { status: 400 });
  }

  const page = Math.max(1, parseIntOr(url.searchParams.get("page"), 1));
  const pageSize = Math.min(
    100,
    Math.max(1, parseIntOr(url.searchParams.get("pageSize"), 12)),
  );
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const category = normalizeCategory(url.searchParams.get("category"));
  if (category === null) {
    return NextResponse.json({ message: "Invalid category" }, { status: 400 });
  }

  // ✅ 권한 체크: public endpoint지만 admin/staff면 unpublished 포함
  const {
    isPrivileged,
    supabase: routeSupabase,
    applyCookies,
  } = await getOptionalRole(req);

  const supabase = isPrivileged ? createSupabaseAdminClient() : routeSupabase;

  let query = supabase
    .from("works")
    .select("id, slug, data, fixed_at, published_at, category, is_published", {
      count: "exact",
    });

  if (category !== "EVERYTHING") {
    query = query.eq("category", category);
  }

  const queries = url.searchParams.getAll("q");

  if (queries?.length) {
    const shortQs = queries.filter((q) => q.length <= 2);
    const longQs = queries.filter((q) => q.length > 2);

    for (const q of shortQs) {
      query = query.ilike("search_text", `%${q}%`);
    }

    if (longQs.length) {
      const tokens = getQueryTokens(longQs);
      const websearchQuery = buildWebsearchQueryFromTokens(tokens);

      if (!websearchQuery) {
        return applyCookies(
          NextResponse.json({
            items: [],
            page,
            pageSize,
            total: 0,
            hasNext: false,
          }),
        );
      }

      query = query.textSearch("search_tsv", websearchQuery, {
        type: "websearch",
        config: "simple",
      });
    }
  }

  if (mode === "main") {
    query = query.order("fixed_at", { ascending: false, nullsFirst: false });
  }

  query = query.order("published_at", { ascending: false }).range(from, to);

  const { data, error, count } = await query;

  if (error) {
    return applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }

  const items =
    data?.map((row) => ({
      id: row.id as string,
      slug: row.slug as string,
      title: row.data?.title ?? "",
      thumbnail: row.data?.thumbnail ?? null,
      summary: row.data?.summary ?? "",
      category: (row.category as string) ?? row.data?.category ?? "",
      fixedAt: row.fixed_at ? new Date(row.fixed_at).toISOString() : null,
      // ✅ 어드민 UI에 필요할 수 있어서 항상 내려줌(공개 사용자에겐 true만 보일 것)
      isPublished: !!row.is_published,
    })) ?? [];

  const total = count ?? 0;
  const hasNext = from + items.length < total;

  return applyCookies(
    NextResponse.json({
      items,
      page,
      pageSize,
      total,
      hasNext,
    }),
  );
}
