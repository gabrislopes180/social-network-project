import { QueryClient } from "@tanstack/react-query"
import { User } from "@/entities/session/model/types"
import { unfollowResponse } from "../follow-user/api/unfollow-user"

interface UnfollowCacheProps {
  followedUser: User
  queryClient: QueryClient
}

export const updateUnfollowCache = ({
  followedUser,
  queryClient,
}: UnfollowCacheProps) => {
  queryClient.setQueryData<unfollowResponse>(
    ["user-found", followedUser.username],
    (old) => {
      if (!old) return old

      return {
        ...old,
        isFollowing: false,
        user: {
          ...old.user,
          followersCount: Math.max(0, (old.user.followersCount || 0) - 1),
        },
      }
    }
  )

  queryClient.setQueryData<User>(["session"], (old) => {
    if (!old) return old

    return {
      ...old,
      followingCount: Math.max(0, (old.followingCount || 0) - 1),
    }
  })
}
