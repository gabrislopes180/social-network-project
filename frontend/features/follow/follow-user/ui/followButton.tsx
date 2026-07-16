"use client"

import { Button } from "@/components/ui/button"
import { useFollowUser } from "../model/use-follow-user"
import { useSessionQuery } from "@/entities/session/model/useSession"
import { Check, CircleCheck } from "lucide-react"
import { useUnfollowUser } from "../model/use-unfollow-user"

export default function FollowButton({ id }: { id: string }) {
  const { user } = useSessionQuery()

  const { mutate, isPending } = useFollowUser(user!)
  const { mutate: unfollowMutate, isPending: isUnfollowing } = useUnfollowUser(
    user!
  )

  if (!user) {
    return <p>Carregando...</p>
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
