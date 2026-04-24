import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";

const DEFAULT_LIMIT = 16;
const MAX_LIMIT = 50;

export async function GET(req: NextRequest) {
  const { supabase, applyCookies } = createSupabaseRouteClient(req);
  const { searchParams } = new URL(req.url);

  const category = searchParams.get("category") ?? "Everything";
  const limit = Math.min(
    Number(searchParams.get("limit") ?? DEFAULT_LIMIT),
    MAX_LIMIT,
  );
  const page = Math.max(Number(searchParams.get("page") ?? 1), 1);
  const from = (page - 1) * limit;
  const to = from + limit;

  let query = supabase
    .from("works")
    .select(
      `
      id,
      slug,
      title:data->>title,
      thumbnail:data->thumbnail,
      category:data->>category,
      summary:data->>summary
    `,
    )
    .order("published_at", { ascending: false })
    .range(from, to);

  if (category && category !== "Everything") {
    query = query.eq("category", category);
  }

  const { data, error } = await query;

  if (error) {
    return applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }

  const rows = data ?? [];
  const hasNext = rows.length > limit;
  const sliced = hasNext ? rows.slice(0, limit) : rows;

  const items = sliced.map((row) => ({
    id: row.id,
    slug: row.slug,
    data: {
      title: row.title,
      thumbnail: row.thumbnail,
      category: row.category,
      summary: row.summary,
    },
  }));

  return applyCookies(
    NextResponse.json({
      items,
      page,
      limit,
      hasNext,
      nextPage: hasNext ? page + 1 : null,
    }),
  );
}
