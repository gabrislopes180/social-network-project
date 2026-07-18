"use client"

import FollowButton from "@/features/follow/follow-user/ui/followButton"
import { GetUserByUsername } from "../api/get-user-by-username"
import { useQuery } from "@tanstack/react-query"
import { AvatarProfile } from "@/components/profile-avatar"

export default function UserFound({ name }: { name: string }) {
  const { data: res, isLoading } = useQuery({
    queryKey: ["user-found", name],
    queryFn: () =>
      GetUserByUsername({
        username: name,
        isFromClient: true,
      }),
  })

  if (isLoading || !res) return <>Carregando usuario...</>

  return (
    <div className="mx-auto flex w-60 flex-col items-center justify-center">
      <AvatarProfile />
      <p className="tracking-tight text-muted-foreground">
        @{res.user.username}
      </p>
      <span className="my-2 text-sm">
        Seguidores: {res.user.followers.length} Seguindo:
        {res.user.following.length}
      </span>

      <FollowButton id={res.user._id} />
    </div>
  )
}
