import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const COOKIE = "alhejaz_admin";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  const expected = process.env.ADMIN_PASSWORD;
  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/admin/login";
  loginUrl.searchParams.set("next", pathname);

  // Never leave admin open in production without a password
  if (!expected) {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE)?.value;
  if (token === expected) {
    return NextResponse.next();
  }

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
