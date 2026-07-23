"use client"

import { Button } from "@/components/ui/button"
import { useFollowUser } from "../model/use-follow-user"
import { useSessionQuery } from "@/entities/session/model/useSession"
import { CircleCheck } from "lucide-react"
import { useUnfollowUser } from "../model/use-unfollow-user"
import { Skeleton } from "@/components/ui/skeleton"
import { useState } from "react"
import { SpinnerCustom } from "@/components/loading-spinner"

export default function FollowButton({ id }: { id: string }) {
  const { user, isLoading } = useSessionQuery()

  const { mutate, isPending } = useFollowUser(user!)
  const { mutate: unfollowMutate, isPending: isUnfollowing } = useUnfollowUser(
    user!
  )

  const [showUnfollowButton, setShowUnfollowButton] = useState(false)

  const followsMe = user?.followers.includes(id)
  const followingUser = user?.following.includes(id)

  if (!user || isLoading) {
    return <Skeleton className="h-10 w-35 rounded-lg" />
  }

  if (followingUser) {
    return (
      <div className="relative flex min-w-20 flex-col items-center justify-center gap-3">
        <Button
          className="opacity-70"
          variant={"outline"}
          onClick={() => setShowUnfollowButton((prev) => !prev)}
        >
          Seguindo <CircleCheck />
        </Button>

        {showUnfollowButton && (
          <Button
            className="absolute top-10 w-full animate-fade-down animate-duration-50"
            size={"default"}
            onClick={() => unfollowMutate(id)}
            disabled={isUnfollowing}
          >
            {isUnfollowing ? <SpinnerCustom variant="background" /> : "Deixar"}
          </Button>
        )}
      </div>
    )
  }
  if (followsMe && !followingUser) {
    return (
      <Button
        className="w-full"
        onClick={() => mutate(id)}
        disabled={isPending}
      >
        {isPending ? <SpinnerCustom variant="background" /> : "Seguir De volta"}
      </Button>
    )
  }

  return (
    <Button className="w-full" onClick={() => mutate(id)} disabled={isPending}>
      {isPending ? <SpinnerCustom variant="background" /> : "Seguir"}
    </Button>
  )
}
