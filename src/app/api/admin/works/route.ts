import { NextResponse, type NextRequest } from "next/server";
import { WorkUpsertRequest } from "@controllers/works/types";
import {
  createSupabaseRouteClient,
  supabaseErrorToStatus,
} from "@lib/supabase/route";

/**
 * @openapi
 * /api/admin/works:
 *   post:
 *     tags:
 *       - Works
 *     summary: Create work (admin)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorkUpsertRequest'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/WorkDetailResponse'
 *       '400':
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
export async function POST(req: NextRequest) {
  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  let body: WorkUpsertRequest;
  try {
    body = (await req.json()) as WorkUpsertRequest;
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
    .from("works")
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
        workId: data.id,
      },
      { status: 201 },
    ),
  );
}
