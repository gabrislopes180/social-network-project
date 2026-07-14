import { useMutation, useQueryClient } from "@tanstack/react-query"
import { unfollowResponse, unfollowUser } from "../api/unfollow-user"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { updateUnfollowCache } from "../../lib/update-unfollow-cache"
import { User } from "@/entities/session/model/types"

export const useUnfollowUser = (user: User) => {
  const queryClient = useQueryClient()

  const router = useRouter()

  return useMutation<unfollowResponse, Error, string>({
    mutationFn: async (userIdToUnfollow: string) =>
      unfollowUser(userIdToUnfollow, user?._id),

    onSuccess: (data) => {
      console.log("User unfollowed successfully:", data)
      toast.success(data.message)
      updateUnfollowCache({
        queryClient: queryClient,
        followedUser: data.user,
        loggedUserId: user?._id,
      })
      router.refresh()
    },
    onError: (error) => {
      console.error("Error unfollowing user:", error)
      toast.error("Erro ao deixar de seguir usuário. Tente novamente.")
    },
  })
}
