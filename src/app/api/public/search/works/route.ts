import { NextRequest, NextResponse } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";
import { MediaSource } from "@domain/media";

const DEFAULT_LIMIT = 16;
const MAX_LIMIT = 50;

const parseSearchQueries = (searchParams: URLSearchParams): string[] => {
  const rawJson = searchParams.get("searchQueries");

  if (rawJson) {
    try {
      const parsed = JSON.parse(rawJson);

      if (Array.isArray(parsed)) {
        return parsed.map((v) => String(v).trim()).filter(Boolean);
      }
    } catch {}
  }

  const repeated = searchParams
    .getAll("searchQuery")
    .map((v) => v.trim())
    .filter(Boolean);

  return repeated;
};

export async function GET(req: NextRequest) {
  const { supabase, applyCookies } = createSupabaseRouteClient(req);
  const { searchParams } = new URL(req.url);

  const limit = Math.min(
    Number(searchParams.get("limit") ?? DEFAULT_LIMIT),
    MAX_LIMIT,
  );
  const page = Math.max(Number(searchParams.get("page") ?? 1), 1);

  const searchQueries = parseSearchQueries(searchParams);

  if (searchQueries.length === 0) {
    return applyCookies(
      NextResponse.json({
        items: [],
        page,
        limit,
        totalCount: 0,
        hasNext: false,
        nextPage: null,
      }),
    );
  }

  const offset = (page - 1) * limit;

  const { data, error } = await supabase.rpc("search_works", {
    p_queries: searchQueries,
    p_limit: limit + 1,
    p_offset: offset,
  });

  if (error) {
    return applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }

  const rows = data ?? [];
  const totalCount = rows[0]?.total_count ?? 0;

  const hasNext = rows.length > limit;
  const sliced = hasNext ? rows.slice(0, limit) : rows;

  const items = sliced.map(
    (row: {
      id: string;
      slug: string;
      title: string;
      thumbnail: MediaSource;
      summary: string;
    }) => ({
      id: row.id,
      slug: row.slug,
      data: {
        title: row.title,
        thumbnail: row.thumbnail,
        summary: row.summary,
      },
    }),
  );

  return applyCookies(
    NextResponse.json({
      items,
      page,
      limit,
      totalCount,
      hasNext,
      nextPage: hasNext ? page + 1 : null,
    }),
  );
}
