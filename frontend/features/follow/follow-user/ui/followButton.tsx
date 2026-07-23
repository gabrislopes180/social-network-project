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

  if (!user || isLoading) {
    return <Skeleton className="h-10 w-35 rounded-lg" />
  }

  if (user?.following.includes(id)) {
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
            className="absolute top-10 w-full"
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

  return (
    <Button className="w-full" onClick={() => mutate(id)} disabled={isPending}>
      {isPending ? "Seguindo..." : "Seguir"}
    </Button>
  )
}
