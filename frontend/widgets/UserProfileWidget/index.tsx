"use client"

import FollowButton from "@/features/follow/follow-user/ui/followButton"
import { AvatarProfile } from "@/components/profile-avatar"
import { UserProfileHeader } from "@/components/ui/user-profile-header"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import { ProfileCover } from "@/components/profile-cover"
import { HeaderSkeleton } from "@/components/skeletons/profile-header-skeleton"
import { useGetUserByUsername } from "@/entities/users/model/useGetUserByUsernameQuery"
import Link from "next/link"
import { IUserParams } from "@/shared/interfaces"
import { Skeleton } from "@/components/ui/skeleton"
import { ConfigModal } from "@/components/config-modal"

export default function UserProfile({ username, isFromMe }: IUserParams) {
  const { currentUser, isLoading } = useGetUserByUsername({
    username,
    isFromMe,
  })

  if (!currentUser || isLoading) {
    return <HeaderSkeleton />
  }

  return (
    <div className="w-full">
      <div className="relative w-full">
        {isLoading ? (
          <Skeleton className="relative z-0 mt-4 h-32 w-full rounded-t-xl shadow-sm md:h-48" />
        ) : (
          <div className="relative w-full">
            <ProfileCover user={currentUser.user} />

            {isFromMe && (
              <Button
                className="absolute top-4 right-4 z-20"
                variant={"secondary"}
                size={"icon-sm"}
              >
                <ConfigModal />
              </Button>
            )}
            <AvatarProfile className="relative bottom-12 h-30 w-30 border-4 border-background shadow-md md:h-32 md:w-32" />
          </div>
        )}
      </div>

      <UserProfileHeader
        user={currentUser.user}
        isFromMe={isFromMe}
        actions={
          isFromMe ? (
            <Link href="/config/data">
              <Button variant="secondary" className="font-mediumne px-3">
                Editar Perfil
              </Button>
            </Link>
          ) : (
            <>
              <FollowButton
                id={currentUser.user._id}
                isFollowing={currentUser.isFollowing}
                followsMe={currentUser.followsMe}
              />
              <Button
                variant="secondary"
                disabled
                // className="rounded-full px-8 shadow-none"
              >
                <Mail />
                Convidar
              </Button>
            </>
          )
        }
      />
    </div>
  )
}
