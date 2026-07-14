import { QueryClient } from "@tanstack/react-query"
import { User } from "@/entities/session/model/types"
import { FollowResponse } from "../follow-user/model/types"

interface UnfollowCacheProps {
  followedUser: User
  loggedUserId: string
  queryClient: QueryClient
}

export const updateUnfollowCache = ({
  followedUser,
  loggedUserId,
  queryClient,
}: UnfollowCacheProps) => {
  // Atualiza o perfil visitado
  queryClient.setQueryData<FollowResponse>(
    ["user-found", followedUser.username],
    (old) => {
      if (!old) return old

      return {
        ...old,
        user: {
          ...old.user,
          followers: old.user.followers.filter((id) => id !== loggedUserId),
        },
      }
    }
  )

  // Atualiza o usuário logado
  queryClient.setQueryData<User>(["session"], (old) => {
    if (!old) return old

    return {
      ...old,
      following: old.following.filter((id) => id !== followedUser._id),
    }
  })
}
