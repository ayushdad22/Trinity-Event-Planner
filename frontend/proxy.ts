import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth(function middleware(req) {
  const isLoggedIn = !!req.auth
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth")

  if (!isLoggedIn && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth", req.url))
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
}