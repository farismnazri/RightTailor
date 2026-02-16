import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const DEFAULT_POST_AUTH_REDIRECT = "/app";

const normalizeNextPath = (next: string | null) => {
  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return DEFAULT_POST_AUTH_REDIRECT;
  }
  return next;
};

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const authCode = requestUrl.searchParams.get("code");
  const next = normalizeNextPath(requestUrl.searchParams.get("next"));

  if (authCode) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(authCode);

    if (!error) {
      return NextResponse.redirect(new URL(next, requestUrl.origin));
    }
  }

  const loginUrl = new URL("/login", requestUrl.origin);
  loginUrl.searchParams.set("error", "oauth_callback_failed");
  return NextResponse.redirect(loginUrl);
}
