import { QueryClient } from "@tanstack/react-query"
import { User } from "@/entities/session/model/types"
import { FollowResponse } from "../follow-user/model/types"

interface FollowCacheProps {
  targetUsername: string
  queryClient: QueryClient
  isFollowingAction: boolean
}

export const updateFollowCache = ({
  targetUsername,
  queryClient,
  isFollowingAction,
}: FollowCacheProps) => {
  const countModifier = isFollowingAction ? 1 : -1

  queryClient.setQueryData<FollowResponse>(
    ["user-found", targetUsername],
    (old) => {
      if (!old || !old.user) return old

      return {
        ...old,
        isFollowing: isFollowingAction,
        user: {
          ...old.user,
          followersCount: Math.max(
            0,
            (old.user.followersCount || 0) + countModifier
          ),
        },
      }
    }
  )

  // 2. ATUALIZA A SUA SESSÃO (SEU CONTADOR)
  queryClient.setQueryData<User>(["session"], (old) => {
    if (!old) return old

    return {
      ...old,
      followingCount: Math.max(0, (old.followingCount || 0) + countModifier),
    }
  })
}
