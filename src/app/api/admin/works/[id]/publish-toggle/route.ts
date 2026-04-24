import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@lib/supabase/admin";

/**
 * @openapi
 * /api/admin/works/{id}/publish-toggle:
 *   patch:
 *     tags:
 *       - Works
 *     summary: Toggle is_published (admin)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TogglePublishResponse'
 *       '404':
 *         description: Not Found
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
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = createSupabaseAdminClient();

  // 현재값 읽어서 토글 (원샷 토글이 더 깔끔하면 RPC로 바꾸는 것도 가능)
  const { data: curr, error: readError } = await supabase
    .from("works")
    .select("id, is_published")
    .eq("id", id)
    .maybeSingle();

  if (readError) {
    return NextResponse.json({ message: readError.message }, { status: 500 });
  }
  if (!curr) {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }

  const next = !curr.is_published;

  const { data, error } = await supabase
    .from("works")
    .update({ is_published: next })
    .eq("id", id)
    .select("id, is_published")
    .single();

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }

  return NextResponse.json({ id: data.id, isPublished: data.is_published });
}
