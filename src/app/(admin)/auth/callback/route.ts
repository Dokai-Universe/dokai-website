import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";
import { createSupabaseAdminClient } from "@lib/supabase/admin";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  const code = url.searchParams.get("code");
  const rawNext = url.searchParams.get("next") || "/";
  const next = rawNext.startsWith("/") ? rawNext : "/";

  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      return applyCookies(
        NextResponse.redirect(new URL("/auth/done?error=oauth", url.origin)),
      );
    }
  }

  const { data } = await supabase.auth.getUser();
  const user = data.user;

  if (!user?.email) {
    return applyCookies(
      NextResponse.redirect(new URL("/auth/done?error=no_email", url.origin)),
    );
  }

  const admin = createSupabaseAdminClient();

  // ✅ 허용 여부 확인 + 동시에 user_id 저장 (허용된 row만 업데이트됨)
  const { data: allowed, error: allowErr } = await admin
    .from("allowed_users")
    .update({ user_id: user.id, updated_at: new Date().toISOString() })
    .eq("email", user.email)
    .select("email, role, user_id")
    .maybeSingle();

  // ✅ 허용된 이메일이 아니면 allowed가 null로 떨어짐
  if (allowErr || !allowed) {
    await supabase.auth.signOut();
    return applyCookies(
      NextResponse.redirect(
        new URL("/auth/done?error=not_allowed", url.origin),
      ),
    );
  }

  // (선택) role에 따라 next 강제 변경 같은 것도 가능
  // if (allowed.role === "staff" && next.startsWith("/admin")) next = "/";

  return applyCookies(
    NextResponse.redirect(
      new URL(`/auth/done?next=${encodeURIComponent(next)}`, url.origin),
    ),
  );
}
