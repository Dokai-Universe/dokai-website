import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { supabase, applyCookies } = createSupabaseRouteClient(req);
  const slug = decodeURIComponent((await params).slug);

  const { data, error } = await supabase
    .from("news")
    .select("id, slug, data, is_published, updated_at, view_count")
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

  return applyCookies(
    NextResponse.json({
      id: data.id,
      slug: data.slug,
      isPublished: data.is_published,
      data: data.data,
      updatedAt: data.updated_at,
      viewCount: data.view_count,
    }),
  );
}
