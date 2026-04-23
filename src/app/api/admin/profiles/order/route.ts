import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseRouteClient } from "@lib/supabase/route";

export async function PATCH(req: NextRequest) {
  const { supabase, applyCookies } = createSupabaseRouteClient(req);

  const body = await req.json().catch(() => null);
  const emails = body?.emails;

  if (!Array.isArray(emails)) {
    return applyCookies(
      NextResponse.json(
        { message: "emails must be an array" },
        { status: 400 },
      ),
    );
  }

  const normalizedEmails = emails
    .filter((email): email is string => typeof email === "string")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  const uniqueEmails = Array.from(new Set(normalizedEmails));

  if (uniqueEmails.length !== normalizedEmails.length) {
    return applyCookies(
      NextResponse.json(
        { message: "emails contains duplicated values" },
        { status: 400 },
      ),
    );
  }

  const updates = uniqueEmails.map((email, index) =>
    supabase
      .from("career_profiles")
      .update({ fixed_order: index })
      .eq("email", email),
  );

  const results = await Promise.all(updates);

  const error = results.find((result) => result.error)?.error;

  if (error) {
    return applyCookies(
      NextResponse.json({ message: error.message }, { status: 500 }),
    );
  }

  return applyCookies(
    NextResponse.json({
      success: true,
      items: uniqueEmails.map((email, index) => ({
        email,
        fixedOrder: index,
      })),
    }),
  );
}
