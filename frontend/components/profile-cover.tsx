"use client"

import { useSessionQuery } from "@/entities/session/model/useSession"
import { SpinnerCustom } from "./loading-spinner"
import { useGetUserByUsername } from "@/entities/users/model/useGetUserByUsernameQuery"
import { Skeleton } from "./ui/skeleton"
import { User } from "@/entities/session/model/types"

interface ProfileCoverProps {
  name?: string
  userFound?: User
}

export function ProfileCover({ userFound, name }: ProfileCoverProps) {
  const { user, isLoading } = useSessionQuery()

  const currentUser = !name ? user : userFound

  const color1 = currentUser?.preferences?.color1
  const color2 = currentUser?.preferences?.color2

  if (isLoading) {
    return (
      <Skeleton className="relative z-0 mt-4 h-32 w-full rounded-t-xl shadow-sm md:h-48" />
    )
  }

  return (
    <div
      className="relative z-0 h-32 w-full rounded-t-xl shadow-sm sm:rounded-xl md:h-48"
      style={{ background: `linear-gradient(to right, ${color1}, ${color2})` }}
    />
  )
}
