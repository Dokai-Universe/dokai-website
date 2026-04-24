import { NextRequest, NextResponse } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";

export async function GET(req: NextRequest) {
  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  const query = supabase
    .from("works")
    .select(
      `
      id,
      slug,
      title:data->>title,
      thumbnail:data->thumbnail,
      category:data->>category,
      summary:data->>summary,
      fixed_order
    `,
    )
    .not("fixed_order", "is", null)
    .order("fixed_order", { ascending: true });

  const { data, error } = await query;

  if (error) {
    return applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }

  const rows = data ?? [];

  const items = rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    data: {
      title: row.title,
      thumbnail: row.thumbnail,
      summary: row.summary,
    },
    fixedOrder: row.fixed_order,
  }));

  return applyCookies(
    NextResponse.json({
      items,
    }),
  );
}

export async function PATCH(req: NextRequest) {
  const { supabase, applyCookies } = await createSupabaseRouteClient(req);

  const body = await req.json().catch(() => null);
  const ids = body?.ids;

  if (!Array.isArray(ids)) {
    return applyCookies(
      NextResponse.json({ message: "ids must be an array" }, { status: 400 }),
    );
  }

  const normalizedIds = ids
    .filter((id): id is string => typeof id === "string")
    .map((id) => id.trim())
    .filter(Boolean);

  const uniqueIds = Array.from(new Set(normalizedIds));

  if (uniqueIds.length !== normalizedIds.length) {
    return applyCookies(
      NextResponse.json(
        { message: "ids contains duplicated values" },
        { status: 400 },
      ),
    );
  }

  const { error: resetError } = await supabase
    .from("works")
    .update({ fixed_order: null })
    .not("fixed_order", "is", null);

  if (resetError) {
    return applyCookies(
      NextResponse.json({ message: resetError.message }, { status: 500 }),
    );
  }

  const results = await Promise.all(
    uniqueIds.map((id, index) =>
      supabase.from("works").update({ fixed_order: index }).eq("id", id),
    ),
  );

  const error = results.find((result) => result.error)?.error;

  if (error) {
    return applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }

  return applyCookies(
    NextResponse.json({
      items: uniqueIds.map((id, index) => ({
        id,
        fixedOrder: index,
      })),
    }),
  );
}
