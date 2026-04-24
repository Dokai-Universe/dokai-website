import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseAdminClient } from "@lib/supabase/admin";
import { requireRole } from "@lib/auth/requireRole";
import { Project } from "@domain/careers";
import {
  createSupabaseRouteClient,
  supabaseErrorToStatus,
} from "@lib/supabase/route";
import { ProjectUpsertRequest } from "@controllers/careers/types";

/**
 * @openapi
 * /api/admin/career/projects/{id}:
 *   put:
 *     tags:
 *       - Careers
 *     summary: Update project (admin/staff; staff can update only own)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CareerUpdateProjectRequest'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CareerProjectDetailResponse'
 *   delete:
 *     tags:
 *       - Careers
 *     summary: Delete project (admin/staff; staff can delete only own)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: No Content
 */
export async function PATCH(
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

  let body: ProjectUpsertRequest;
  try {
    body = (await req.json()) as ProjectUpsertRequest;
  } catch {
    return applyCookies(
      NextResponse.json({ message: "Invalid JSON body" }, { status: 400 }),
    );
  }

  const updatePayload: Record<string, unknown> = {};

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
    .from("career_projects")
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
    .from("career_projects")
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
