import { NextResponse } from "next/server"

export async function POST() {
  const response = NextResponse.json({ ok: true })

  response.cookies.set("isLoggedIn", "true", {
    maxAge: 60 * 60 * 24,
    path: "/",
    sameSite: "lax",
  })

  return response
}
