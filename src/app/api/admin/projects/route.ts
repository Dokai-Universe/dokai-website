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
 * /api/admin/career/projects:
 *   post:
 *     tags:
 *       - Careers
 *     summary: Create project (admin/staff; staff can create only own)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CareerCreateProjectRequest'
 *     responses:
 *       '201':
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CareerProjectDetailResponse'
 */
export async function POST(req: NextRequest) {
  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  let body: ProjectUpsertRequest;
  try {
    body = (await req.json()) as ProjectUpsertRequest;
  } catch {
    return applyCookies(
      NextResponse.json({ message: "Invalid JSON body" }, { status: 400 }),
    );
  }

  const ownerEmail = (body?.ownerEmail ?? "").toString();
  if (!ownerEmail) {
    return applyCookies(
      NextResponse.json({ message: "ownerEmail is missing" }, { status: 400 }),
    );
  }

  const { data: userRes, error: userErr } = await supabase.auth.getUser();
  if (userErr || !userRes.user) {
    return applyCookies(
      NextResponse.json({ message: "Unauthorized" }, { status: 401 }),
    );
  }

  const { data: roleRow, error: roleErr } = await supabase
    .from("allowed_users")
    .select("role, email")
    .eq("user_id", userRes.user.id)
    .maybeSingle();

  if (roleErr) {
    return applyCookies(
      NextResponse.json(
        { message: roleErr.message },
        { status: supabaseErrorToStatus(roleErr) },
      ),
    );
  }

  if (
    roleRow?.role === "staff" &&
    (roleRow?.email ?? "").toLowerCase() !== ownerEmail.toLowerCase()
  ) {
    return applyCookies(
      NextResponse.json({ message: "Forbidden" }, { status: 403 }),
    );
  }

  const { data, error } = await supabase
    .from("career_projects")
    .insert({
      owner_email: ownerEmail,
      data: body.data,
      is_published: !!body.isPublished,
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
        projectId: data.id,
      },
      { status: 201 },
    ),
  );

  // const auth = await requireRole(req, ["admin", "staff"]);
  // if (!auth.ok) {
  //   return auth.applyCookies(
  //     NextResponse.json({ message: auth.message }, { status: auth.status }),
  //   );
  // }

  // const body = (await req.json()) as {
  //   ownerEmail: string;
  //   isPublished: boolean;
  //   data: Project; // Project without id (권장)
  // };

  // const ownerEmail = (body?.ownerEmail ?? "").toString();
  // if (!ownerEmail) {
  //   return auth.applyCookies(
  //     NextResponse.json({ message: "ownerEmail is required" }, { status: 400 }),
  //   );
  // }

  // if (
  //   auth.role === "staff" &&
  //   (auth.user.email ?? "").toLowerCase() !== ownerEmail.toLowerCase()
  // ) {
  //   return auth.applyCookies(
  //     NextResponse.json({ message: "Forbidden" }, { status: 403 }),
  //   );
  // }

  // const admin = createSupabaseAdminClient();
  // const { data, error } = await admin
  //   .from("career_projects")
  //   .insert({
  //     owner_email: ownerEmail,
  //     data: body.data,
  //     is_published: !!body.isPublished,
  //   })
  //   .select("id, owner_email, data, is_published, updated_at")
  //   .single();

  // if (error) {
  //   return auth.applyCookies(
  //     NextResponse.json({ message: error.message }, { status: 500 }),
  //   );
  // }

  // return auth.applyCookies(
  //   NextResponse.json(
  //     {
  //       id: data.id,
  //       isPublished: !!data.is_published,
  //       data: { ...data.data, id: data.id },
  //       updatedAt: data.updated_at,
  //     },
  //     { status: 201 },
  //   ),
  // );
}
