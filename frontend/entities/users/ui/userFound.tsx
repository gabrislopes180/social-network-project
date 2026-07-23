"use client"

import FollowButton from "@/features/follow/follow-user/ui/followButton"
import { AvatarProfile } from "@/components/profile-avatar"
import { UserProfileHeader } from "@/components/ui/user-profile-header"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import { useGetUserByUsername } from "../model/useGetUserByUsernameQuery"
import { ProfileCover } from "@/components/profile-cover"
import { HeaderSkeleton } from "@/components/skeletons/profile-header-skeleton"

export default function UserFound({ name }: { name: string }) {
  const { res, isLoading } = useGetUserByUsername(name)

  if (!res || isLoading) {
    return <HeaderSkeleton />
  }

  return (
    <div className="w-full">
      <div className="relative w-full">
        <ProfileCover userFound={res.user} name={name} />
        <AvatarProfile
          className="h-24 w-24 border-4 border-background shadow-md md:h-32 md:w-32"
          wrapperClassName="-mt-12 md:-mt-16"
        />
      </div>

      <UserProfileHeader
        user={res.user}
        actions={
          <>
            <FollowButton id={res.user._id} />
            <Button
              variant="secondary"
              disabled
              // className="rounded-full px-8 shadow-none"
            >
              <Mail />
              Convidar
            </Button>
          </>
        }
      />
    </div>
  )
}
