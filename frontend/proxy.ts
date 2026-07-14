import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value
  const pathname = request.nextUrl.pathname

  if (pathname === "/") {
    if (token) {
      return NextResponse.redirect(new URL("/feeds", request.url))
    }

    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
