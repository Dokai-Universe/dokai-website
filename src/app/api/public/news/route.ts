import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";

const DEFAULT_LIMIT = 12;
const MAX_LIMIT = 50;

export async function GET(req: NextRequest) {
  const { supabase, applyCookies } = createSupabaseRouteClient(req);
  const { searchParams } = new URL(req.url);

  const rawLimit = Number(searchParams.get("limit") ?? DEFAULT_LIMIT);
  const rawPage = Number(searchParams.get("page") ?? 1);

  const limit =
    Number.isFinite(rawLimit) && rawLimit > 0
      ? Math.min(rawLimit, MAX_LIMIT)
      : DEFAULT_LIMIT;

  const page =
    Number.isFinite(rawPage) && rawPage > 0 ? Math.floor(rawPage) : 1;

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const query = supabase
    .from("news")
    .select(
      `
      id,
      slug,
      data->title,
      data->thumbnail,
      data->summary,
      data->category,
      published_at,
      view_count
    `,
      { count: "exact" },
    )
    .order("published_at", { ascending: false })
    .range(from, to);

  const { data, error, count } = await query;

  if (error) {
    return applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }

  const totalCount = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));

  const items =
    data?.map((row) => ({
      id: row.id,
      slug: row.slug,
      viewCount: row.view_count,
      data: {
        title: row.title,
        thumbnail: row.thumbnail,
        category: row.category,
        publishedAt: row.published_at,
      },
    })) ?? [];

  return applyCookies(
    NextResponse.json({
      items,
      totalPages,
    }),
  );
}
