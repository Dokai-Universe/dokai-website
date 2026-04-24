import { NextRequest, NextResponse } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";
import {
  AdminMemberListUpdateRequest,
  MemberPatchItem,
} from "@controllers/careers/types";

const normalizeItem = (item: MemberPatchItem) => ({
  memberId: item.memberId,
  email: item.email.trim().toLowerCase(),
  role: item.role ?? null,
  isFixed: !!item.isFixed,
  fixedOrder: item.isFixed ? (item.fixedOrder ?? 0) : null,
});

export async function PATCH(req: NextRequest) {
  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  const body = (await req.json()) as AdminMemberListUpdateRequest;

  const created = (body.created ?? []).map(normalizeItem);
  const updated = (body.updated ?? []).map(normalizeItem);
  const deleted = (body.deleted ?? []).map(normalizeItem);

  const changedItems = [...created, ...updated];
  const deletedEmails = deleted.map((item) => item.email);

  const { data: existingMembers, error: existingMembersError } = await supabase
    .from("allowed_users")
    .select("user_id, email, role");

  if (existingMembersError) {
    return applyCookies(
      NextResponse.json(
        { message: existingMembersError.message },
        { status: 500 },
      ),
    );
  }

  const { data: existingProfiles, error: existingProfilesError } =
    await supabase.from("career_profiles").select("email, fixed_order");

  if (existingProfilesError) {
    return applyCookies(
      NextResponse.json(
        { message: existingProfilesError.message },
        { status: 500 },
      ),
    );
  }

  const existingMemberMap = new Map(
    (existingMembers ?? []).map((row) => [
      (row.email ?? "").toLowerCase(),
      row,
    ]),
  );

  const existingProfileEmailSet = new Set(
    (existingProfiles ?? []).map((row) => (row.email ?? "").toLowerCase()),
  );

  // 1) allowed_users upsert
  const upsertMembers = changedItems
    .filter((item) => item.role !== null)
    .map((item) => {
      const existing = existingMemberMap.get(item.email);

      return {
        user_id: existing?.user_id ?? null,
        email: item.email,
        role: item.role,
      };
    });

  if (upsertMembers.length > 0) {
    const { error: upsertMembersError } = await supabase
      .from("allowed_users")
      .upsert(upsertMembers, {
        onConflict: "email",
      });

    if (upsertMembersError) {
      return applyCookies(
        NextResponse.json(
          { message: upsertMembersError.message },
          { status: 500 },
        ),
      );
    }
  }

  // 2) role이 null로 바뀐 updated + deleted 는 allowed_users 삭제
  const removeEmailsFromAllowedUsers = [
    ...updated.filter((item) => item.role === null).map((item) => item.email),
    ...deletedEmails,
  ];

  if (removeEmailsFromAllowedUsers.length > 0) {
    const { error: deleteMembersError } = await supabase
      .from("allowed_users")
      .delete()
      .in("email", removeEmailsFromAllowedUsers);

    if (deleteMembersError) {
      return applyCookies(
        NextResponse.json(
          { message: deleteMembersError.message },
          { status: 500 },
        ),
      );
    }
  }

  // 3) fixed_order 반영
  for (const item of changedItems) {
    if (!existingProfileEmailSet.has(item.email)) continue;

    const { error: updateProfileError } = await supabase
      .from("career_profiles")
      .update({
        fixed_order: item.fixedOrder,
      })
      .eq("email", item.email);

    if (updateProfileError) {
      return applyCookies(
        NextResponse.json(
          { message: updateProfileError.message },
          { status: 500 },
        ),
      );
    }
  }

  // 4) deleted 멤버는 profile fixed_order 제거
  for (const item of deleted) {
    if (!existingProfileEmailSet.has(item.email)) continue;

    const { error: clearProfileError } = await supabase
      .from("career_profiles")
      .update({
        fixed_order: null,
      })
      .eq("email", item.email);

    if (clearProfileError) {
      return applyCookies(
        NextResponse.json(
          { message: clearProfileError.message },
          { status: 500 },
        ),
      );
    }
  }

  return applyCookies(
    NextResponse.json({
      success: true,
    }),
  );
}
