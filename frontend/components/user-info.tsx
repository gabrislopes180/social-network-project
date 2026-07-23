"use client"

import { useSessionQuery } from "@/entities/session/model/useSession"
import { Button } from "@/components/ui/button"
import LogoutButton from "@/features/auth/logout/ui/logoutButton"
import { UserProfileHeader } from "./ui/user-profile-header"
import Link from "next/link"
import { SpinnerCustom } from "./loading-spinner"
import { HeaderSkeleton } from "./skeletons/profile-header-skeleton"

export default function UserInfo() {
  const { user, isLoading, error } = useSessionQuery()

  if (isLoading) {
    return <HeaderSkeleton />
  }

  if (!user || error) {
    return (
      <>
        <p className="text-sm text-muted-foreground">Usuario nao logado.</p>
      </>
    )
  }

  return (
    <>
      <UserProfileHeader
        user={user}
        actions={
          <Link href="/config/data">
            <Button
              variant="secondary"
              className="rounded-full px-8 font-semibold shadow-none"
            >
              Editar Perfil
            </Button>
          </Link>
        }
      />

      {/* <div className="mt-2 mb-2 flex justify-center">
        <LogoutButton />
      </div> */}
    </>
  )
}
