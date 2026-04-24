import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

function createSupabaseMiddlewareClient(req: NextRequest, res: NextResponse) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            res.cookies.set(name, value, options);
          });
        },
      },
    },
  );
}

export async function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const res = NextResponse.next();
  const supabase = createSupabaseMiddlewareClient(req, res);

  const isAdminArea = url.pathname.startsWith("/admin");
  if (!isAdminArea) return res;

  // 1) 로그인 체크
  const { data: userData, error: userErr } = await supabase.auth.getUser();
  const user = userData.user;

  if (!user) {
    res.headers.set("x-admin-guard", "unauthorized");
    return res;
  }

  if (userErr) {
    res.headers.set("x-admin-guard", "error");
    res.headers.set("x-admin-guard-reason", "auth");
    return res;
  }

  // 2) role 조회
  const { data: allowed, error } = await supabase
    .from("allowed_users")
    .select("role")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    res.headers.set("x-admin-guard", "error");
    res.headers.set("x-admin-guard-reason", "db");
    return res;
  }

  if (!allowed) {
    res.headers.set("x-admin-guard", "unauthorized");
    return res;
  }

  // admin은 모든 페이지 접근 가능
  // staff는 careers 페이지만 접근 가능
  if (
    allowed.role !== "admin" &&
    !(url.pathname.startsWith("/admin/careers") && allowed.role === "staff")
  ) {
    res.headers.set("x-admin-guard", "forbidden");
    return res;
  }

  res.headers.set("x-admin-guard", "ok");
  return res;
}

export const config = {
  matcher: ["/admin/:path*"],
};
