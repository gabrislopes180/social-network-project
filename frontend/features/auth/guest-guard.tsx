"use client"

import { SpinnerCustom } from "@/components/loading-spinner"
import { Spinner } from "@/components/ui/spinner"
import { useSessionQuery } from "@/entities/session/model/useSession"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function GuestGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { user, isLoading } = useSessionQuery()

  useEffect(() => {
    if (!isLoading && user) {
      router.replace("/feeds")
    }
  }, [isLoading, router, user])

  if (isLoading || user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <SpinnerCustom />
      </div>
    )
  }

  return <>{children}</>
}
