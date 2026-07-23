import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value
  const refreshToken = request.cookies.get("refreshToken")?.value
  const pathname = request.nextUrl.pathname

  // Se tiver um dos tokens, consideramos potencialmente logado
  const isLoggedIn = !!token || !!refreshToken

  if (pathname === "/") {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/feeds", request.url))
    }

    return NextResponse.next()
  }

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
