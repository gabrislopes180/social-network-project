import { useMutation, useQueryClient } from "@tanstack/react-query"
import { FollowResponse } from "./types"
import { followUser } from "../api/follow-user"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { updateFollowCache } from "../../lib/update-follow-cache"
import { User } from "@/entities/session/model/types"

export const useFollowUser = (user: User) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  return useMutation<FollowResponse, Error, string>({
    mutationFn: async (userIdToFollow: string) =>
      followUser(userIdToFollow, user?._id),

    onSuccess: (data) => {
      if (!user) return
      updateFollowCache({
        followedUser: data.user,
        loggedUserId: user?._id,
        queryClient: queryClient,
      })
      toast.success(data.message)
      router.refresh()
    },
    onError: (error) => {
      console.error("Error following user:", error)
      toast.error("Erro ao seguir usuário. Tente novamente.")
    },
  })
}
