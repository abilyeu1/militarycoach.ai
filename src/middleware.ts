import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;

  const email = req.cookies.get("email")?.value;
  const password = req.cookies.get("password")?.value;

  const { pathname } = req.nextUrl.clone();

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  const publicRoutes = [
    "/login",
    "/signup",
    "/forgot-password",
    "/military-personal-details",
  ];

  const protectedRoutes = [
    "/tools",
    "/bullet-translator",
    "/career-wizard",
    "/cover-letter-wizard",
    "/edit-education",
    "/edit-personal-details",
    "/mock-interview-prep",
    "/profile",
    "/skills-gap-analysis",
    "/edit-work-experience",
  ];

  if (token && publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/tools", req.url));
  }

  // if (pathname !== "/signup" && !token && (!email || !password)) {
  //   return NextResponse.redirect(new URL("/signup", req.url));
  // }

  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|static|favicon.ico|assets|favicon|manifest.json|_next).*)",
  ],
};
