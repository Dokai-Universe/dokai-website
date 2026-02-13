import { createServerClient } from "@supabase/ssr";
import type { NextRequest, NextResponse } from "next/server";

export function createSupabaseRouteClient(req: NextRequest) {
  let cookiesToSet: Parameters<NextResponse["cookies"]["set"]>[0][] = [];

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(nextCookies) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          cookiesToSet = nextCookies as any;
        },
      },
    },
  );

  const applyCookies = (res: NextResponse) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for (const c of cookiesToSet as any[]) {
      res.cookies.set(c.name, c.value, c.options);
    }
    return res;
  };

  return { supabase, applyCookies };
}
