import { NextRequest, NextResponse } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";

type MemberPayloadItem = {
  email: string;
  role: "admin" | "staff" | null;
  fixedOrder: number | null;
};

export async function PATCH(req: NextRequest) {
  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  const body = (await req.json()) as {
    items?: MemberPayloadItem[];
  };

  const rawItems = body.items ?? [];

  const items = rawItems
    .map((item) => ({
      email: item.email.trim().toLowerCase(),
      role: item.role ?? null,
      fixedOrder: item.fixedOrder ?? null,
    }))
    .filter((item) => item.email.length > 0);

  const uniqueMap = new Map<string, MemberPayloadItem>();

  for (const item of items) {
    uniqueMap.set(item.email, item);
  }

  const normalizedItems = [...uniqueMap.values()];

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

  const existingProfileMap = new Map(
    (existingProfiles ?? []).map((row) => [
      (row.email ?? "").toLowerCase(),
      row,
    ]),
  );

  // 1) allowed_users upsert 대상
  const upsertMembers = normalizedItems
    .filter((item) => item.role !== null)
    .map((item) => {
      const existing = existingMemberMap.get(item.email);

      return {
        user_id: existing?.user_id ?? null,
        email: item.email,
        role: item.role,
      };
    });

  // user_id 없는 row는 allowed_users 구조에 따라 insert 불가할 수 있음
  // 보통 allowed_users가 user_id required면 신규 초대/가입 전에는 insert 못 함
  // 그래서 여기서는 existing user만 update 대상으로 제한하는 방식도 가능
  const safeUpsertMembers = upsertMembers;
  // .filter((row) => !!row.user_id);

  if (safeUpsertMembers.length > 0) {
    const { error: upsertMembersError } = await supabase
      .from("allowed_users")
      .upsert(safeUpsertMembers, {
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

  // 2) allowed_users delete 대상
  const deleteEmails = normalizedItems
    .filter((item) => item.role === null)
    .map((item) => item.email);

  if (deleteEmails.length > 0) {
    const { error: deleteMembersError } = await supabase
      .from("allowed_users")
      .delete()
      .in("email", deleteEmails);

    if (deleteMembersError) {
      return applyCookies(
        NextResponse.json(
          { message: deleteMembersError.message },
          { status: 500 },
        ),
      );
    }
  }

  // 3) career_profiles fixed_order update
  for (const item of normalizedItems) {
    if (!existingProfileMap.has(item.email)) continue;

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

  return applyCookies(
    NextResponse.json({
      success: true,
    }),
  );
}
