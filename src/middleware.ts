import NextAuth from "next-auth";
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import authConfig from "./lib/auth.config";
import { routing } from "./lib/i18n/routing";

const { auth } = NextAuth(authConfig);
const intlMiddleware = createMiddleware(routing);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    if (session.user?.role === "CLIENT") {
      return NextResponse.redirect(new URL("/portal", req.url));
    }

    return NextResponse.next();
  }

  if (pathname.startsWith("/portal") && !pathname.startsWith("/portal/login")) {
    if (!session) {
      return NextResponse.redirect(new URL("/portal/login", req.url));
    }

    return NextResponse.next();
  }

  if (pathname.startsWith("/admin") || pathname.startsWith("/portal") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
