import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import getOrCreateDB from "./models/server/dbSetup";
import getOrCreateStorage from "./models/server/storageSetup";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  await Promise.all([getOrCreateDB(), getOrCreateStorage()]);

  const pathname = request.nextUrl.pathname;
  const isLoggedIn = Boolean(request.cookies.get("session"));

  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  const isAppRoute =
    pathname.startsWith("/home") ||
    pathname.startsWith("/questions") ||
    pathname.startsWith("/profile") ||
    pathname.startsWith("/settings");

  if (!isLoggedIn && isAppRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoggedIn && isAppRoute) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  /* match all request paths except for the the ones that starts with:
  - api
  - _next/static
  - _next/image
  - favicon.com

  */
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
