import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";

export async function PATCH(req: NextRequest) {
  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  const body = await req.json().catch(() => null);

  const type = body?.type;
  const list = body?.list;

  if (!Array.isArray(list)) {
    return applyCookies(
      NextResponse.json({ message: "list must be an array" }, { status: 400 }),
    );
  }

  const normalizedList = list
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);

  const uniqueList = Array.from(
    new Map(normalizedList.map((item) => [item.toLowerCase(), item])).values(),
  );

  if (uniqueList.length !== normalizedList.length) {
    return applyCookies(
      NextResponse.json(
        { message: "list contains duplicated categories" },
        { status: 400 },
      ),
    );
  }

  const { data, error } = await supabase
    .from("category_settings")
    .update({ list: uniqueList })
    .eq("type", type)
    .select("type, list, updated_at")
    .single();

  if (error) {
    return applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }

  return applyCookies(
    NextResponse.json({
      type: data.type,
      list: data.list ?? [],
      updatedAt: data.updated_at,
    }),
  );
}
