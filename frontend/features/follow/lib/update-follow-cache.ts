import { QueryClient } from "@tanstack/react-query"
import { User } from "@/entities/session/model/types"
import { FollowResponse } from "../follow-user/model/types"

interface FollowCacheProps {
  followedUser: User
  loggedUserId: string
  queryClient: QueryClient
}

export const updateFollowCache = ({
  followedUser,
  loggedUserId,
  queryClient,
}: FollowCacheProps) => {
  // Atualiza o perfil visitado
  queryClient.setQueryData<FollowResponse>(
    ["user-found", followedUser.username],
    (old) => {
      if (!old) return old

      return {
        ...old,
        user: {
          ...old.user,
          followers: [...old.user.followers, loggedUserId],
        },
      }
    }
  )

  // Atualiza o usuário logado
  queryClient.setQueryData<User>(["session"], (old) => {
    if (!old) return old

    return {
      ...old,
      following: [...old.following, followedUser._id],
    }
  })
}
