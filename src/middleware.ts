import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "@/lib/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth?.user;
  const pathname = nextUrl.pathname;

  // Public marketing routes are always accessible.
  const isPublicRoute =
    pathname === "/" ||
    pathname.startsWith("/ar") ||
    pathname.startsWith("/en") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/contact") ||
    pathname.startsWith("/api/quotes");

  // Admin routes require authentication + staff-level role.
  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/admin/login", nextUrl);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    const role = req.auth?.user?.role;
    if (role === "CLIENT") {
      return NextResponse.redirect(new URL("/portal", nextUrl));
    }
    return NextResponse.next();
  }

  // Portal routes require authentication + client role.
  if (pathname.startsWith("/portal")) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/portal/login", nextUrl);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  if (isPublicRoute) return NextResponse.next();

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};