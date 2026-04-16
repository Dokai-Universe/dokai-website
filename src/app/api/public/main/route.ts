import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";

export async function GET(req: NextRequest) {
  const { supabase: routeSupabase, applyCookies } =
    createSupabaseRouteClient(req);

  const { data, error } = await routeSupabase
    .from("works")
    .select(
      "id, slug, data->title, data->thumbnail, data->category, data->summary, is_published",
    )
    .order("fixed_order", { ascending: true, nullsFirst: false })
    .order("published_at", { ascending: false })
    .limit(16);

  if (error) {
    return applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }

  console.log(123);

  const items =
    data?.map((row) => ({
      id: row.id,
      slug: row.slug,
      isPublished: row.is_published,
      data: {
        title: row.title,
        thumbnail: row.thumbnail,
        category: row.category,
        summary: row.summary,
      },
    })) ?? [];

  return applyCookies(NextResponse.json({ items }));
}
