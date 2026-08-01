import createMiddleware from "next-intl/middleware";
import { getToken } from "next-auth/jwt";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "./lib/i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    if (token.role === "CLIENT") {
      return NextResponse.redirect(new URL("/portal", req.url));
    }

    return NextResponse.next();
  }

  if (pathname.startsWith("/portal") && !pathname.startsWith("/portal/login")) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });

    if (!token) {
      return NextResponse.redirect(new URL("/portal/login", req.url));
    }

    return NextResponse.next();
  }

  if (pathname.startsWith("/admin") || pathname.startsWith("/portal") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
