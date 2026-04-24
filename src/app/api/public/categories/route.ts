import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";

export async function GET(req: NextRequest) {
  const { supabase, applyCookies } = createSupabaseRouteClient(req);
  const { searchParams } = new URL(req.url);

  const type = searchParams.get("type");

  if (type !== "works" && type !== "news") {
    return applyCookies(
      NextResponse.json({ message: "Invalid category type" }, { status: 400 }),
    );
  }

  const { data, error } = await supabase
    .from("category_settings")
    .select("type, list")
    .eq("type", type)
    .maybeSingle();

  if (error) {
    return applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }

  if (!data) {
    return applyCookies(
      NextResponse.json({ message: "Category not found" }, { status: 404 }),
    );
  }

  return applyCookies(
    NextResponse.json({
      type: data.type,
      list: data.list ?? [],
    }),
  );
}
