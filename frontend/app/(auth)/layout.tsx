"use client"

import { AuthGuard } from "@/features/auth/auth-guard"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthGuard>{children}</AuthGuard>
}
