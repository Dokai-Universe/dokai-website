import { NextResponse, type NextRequest } from "next/server";
import { NewsUpsertRequest } from "@controllers/news/types";
import {
  createSupabaseRouteClient,
  supabaseErrorToStatus,
} from "@lib/supabase/route";

export async function POST(req: NextRequest) {
  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  let body: NewsUpsertRequest;
  try {
    body = (await req.json()) as NewsUpsertRequest;
  } catch {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const { data: userRes, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userRes.user) {
    return applyCookies(
      NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    );
  }

  const slug = (body.slug ?? "").toString();
  if (!slug) {
    return applyCookies(
      NextResponse.json({ message: "slug is required" }, { status: 400 }),
    );
  }

  const { data, error } = await supabase
    .from("news")
    .insert({
      slug: body.slug,
      data: body.data,
      is_published: body.isPublished,
    })
    .select("id")
    .single();

  if (error) {
    return applyCookies(
      NextResponse.json(
        { message: error.message },
        { status: supabaseErrorToStatus(error) },
      ),
    );
  }

  return applyCookies(
    NextResponse.json(
      {
        newsId: data.id,
      },
      { status: 201 },
    ),
  );
}
