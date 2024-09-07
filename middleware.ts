import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const loginPageUrl = new URL("/login", req.url);

  if (!token && req.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(loginPageUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|static|favicon.ico|login|register).*)"],
};
