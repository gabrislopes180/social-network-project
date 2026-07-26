import { QueryClient } from "@tanstack/react-query"
import { User } from "@/entities/session/model/types"
import { FollowResponse } from "../follow-user/model/types"

interface FollowCacheProps {
  followedUser: User
  queryClient: QueryClient
}

export const updateFollowCache = ({
  followedUser,
  queryClient,
}: FollowCacheProps) => {
  // 1. Atualiza o perfil visitado (quem recebeu o follow)
  queryClient.setQueryData<FollowResponse>(
    ["user-found", followedUser.username],
    (old) => {
      if (!old) return old

      return {
        ...old,
        isFollowing: true, // Muda o status para true
        user: {
          ...old.user,
          // Incrementa o contador de seguidores do perfil visitado
          followersCount: (old.user.followersCount || 0) + 1,
        },
      }
    }
  )

  // 2. Atualiza a sessão do usuário logado (quem deu o follow)
  queryClient.setQueryData<User>(["session"], (old) => {
    if (!old) return old

    return {
      ...old,
      // Incrementa o contador de "seguindo" do usuário logado
      followingCount: (old.followingCount || 0) + 1,
    }
  })
}
