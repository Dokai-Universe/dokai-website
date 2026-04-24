import { NextResponse, type NextRequest } from "next/server";
import { NewsUpsertRequest } from "@controllers/news/types";
import {
  createSupabaseRouteClient,
  supabaseErrorToStatus,
} from "@lib/supabase/route";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  const { data: userRes, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userRes.user) {
    return applyCookies(
      NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    );
  }

  let body: NewsUpsertRequest;
  try {
    body = (await req.json()) as NewsUpsertRequest;
  } catch {
    return applyCookies(
      NextResponse.json({ message: "Invalid JSON body" }, { status: 400 }),
    );
  }

  const updatePayload: Record<string, unknown> = {};

  if (body.slug !== undefined) {
    updatePayload.slug = body.slug;
  }

  if (body.isPublished !== undefined) {
    updatePayload.is_published = body.isPublished;
  }

  if (body.data !== undefined) {
    updatePayload.data = body.data;
  }

  if (Object.keys(updatePayload).length === 0) {
    return applyCookies(
      NextResponse.json({ message: "Nothing to update" }, { status: 400 }),
    );
  }

  const { data, error } = await supabase
    .from("news")
    .update(updatePayload)
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    return applyCookies(
      NextResponse.json(
        { message: error.message },
        { status: supabaseErrorToStatus(error) },
      ),
    );
  }

  if (!data) {
    return applyCookies(
      NextResponse.json({ message: "Not Found" }, { status: 404 }),
    );
  }

  return applyCookies(
    NextResponse.json({
      ok: true,
      id: data.id,
    }),
  );
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  const { data: userRes, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userRes.user) {
    return applyCookies(
      NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    );
  }

  const { data, error } = await supabase
    .from("news")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    return applyCookies(
      NextResponse.json(
        { message: error.message },
        { status: supabaseErrorToStatus(error) },
      ),
    );
  }

  if (!data) {
    return applyCookies(
      NextResponse.json({ message: "Not Found" }, { status: 404 }),
    );
  }

  return applyCookies(NextResponse.json({ ok: true, id: data.id }));
}
