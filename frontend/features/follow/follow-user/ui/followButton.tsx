"use client"

import { Button } from "@/components/ui/button"
import { useFollowUser } from "../model/use-follow-user"
import { useSessionQuery } from "@/entities/session/model/useSession"
import { CircleCheck } from "lucide-react"
import { useUnfollowUser } from "../model/use-unfollow-user"
import { Skeleton } from "@/components/ui/skeleton"

export default function FollowButton({ id }: { id: string }) {
  const { user, isLoading } = useSessionQuery()

  const { mutate, isPending } = useFollowUser(user!)
  const { mutate: unfollowMutate, isPending: isUnfollowing } = useUnfollowUser(
    user!
  )

  if (!user || isLoading) {
    return (
      <div className="flex flex-col space-y-3">
        <Skeleton className="h-10 w-35 rounded-lg" />
        <Skeleton className="h-10 w-35 rounded-lg" />
      </div>
    )
  }

  if (user?.following.includes(id)) {
    return (
      <div className="flex flex-col items-center justify-center gap-3">
        <Button className="w-full" variant={"outline"} disabled>
          Seguindo <CircleCheck />
        </Button>

        <Button
          className="w-full"
          onClick={() => unfollowMutate(id)}
          disabled={isUnfollowing}
        >
          {isUnfollowing ? "Deixando de seguir..." : "Deixar de Seguir"}
        </Button>
      </div>
    )
  }

  return (
    <Button className="w-full" onClick={() => mutate(id)} disabled={isPending}>
      {isPending ? "Seguindo..." : "Seguir"}
    </Button>
  )
}
