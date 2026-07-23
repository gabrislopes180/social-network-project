"use client"

import { SpinnerCustom } from "@/components/loading-spinner"
import { useSessionQuery } from "@/entities/session/model/useSession"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, isLoading, error } = useSessionQuery()

  useEffect(() => {
    if (!isLoading && (error || !user)) {
      router.replace("/")
    }
  }, [error, isLoading, router, user])

  if (isLoading || error || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <SpinnerCustom />
      </div>
    )
  }

  return <>{children}</>
}
