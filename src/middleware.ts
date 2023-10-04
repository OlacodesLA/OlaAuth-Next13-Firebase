import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { onAuthStateChanged, User } from "firebase/auth";

const protectedRoutes = ["/"];
const authRoutes = ["/auth"];

export async function middleware(request: NextRequest) {
  let auth = request.cookies.get("auth");

  if (!auth && protectedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.rewrite(new URL("/auth/login", request.url));
  }

  if (auth && request.nextUrl.pathname.startsWith("/auth")) {
    return NextResponse.rewrite(new URL("/", request.url));
  }
}
