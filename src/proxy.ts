import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  privateRoutes,
} from "./routes";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const { nextUrl } = req;
  const pathname = nextUrl.pathname;

  // Skip API auth routes immediately - no token check needed
  if (pathname.startsWith(apiAuthPrefix)) return NextResponse.next();

  // Read JWT from cookie - fast, no DB call
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });
  const isLoggedIn = !!token;

  const isAuthRoute = authRoutes.includes(pathname);
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  // If logged in and trying to access auth routes, redirect to home
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
  }

  // Not logged in trying to access private routes - redirect to login
  if (!isLoggedIn && isPrivateRoute) {
    const callbackUrl = encodeURIComponent(nextUrl.pathname + nextUrl.search);
    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${callbackUrl}`, nextUrl),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};
