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
  if (!expected) {
    // No password configured — allow access in local/dev, but discourage production
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIE)?.value;
  if (token === expected) {
    return NextResponse.next();
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/admin/login";
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
