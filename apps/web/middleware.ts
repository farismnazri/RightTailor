import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

const protectedPrefixes = ["/app", "/profiles"];

const isProtectedRoute = (pathname: string) => {
  return protectedPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
};

const normalizeNextPath = (pathname: string, search: string) => {
  const path = `${pathname}${search}`;
  if (!path.startsWith("/") || path.startsWith("//")) {
    return "/app";
  }
  return path;
};

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request);
  const { pathname, search } = request.nextUrl;

  if (!isProtectedRoute(pathname)) {
    return response;
  }

  if (!user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", normalizeNextPath(pathname, search));
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
