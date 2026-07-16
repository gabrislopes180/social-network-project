import { useMutation, useQueryClient } from "@tanstack/react-query"
import { LikeRequest } from "../api/like-request"
import { LikeResponse } from "./interfaces"
import { updatePostCache } from "@/entities/posts/lib/update-post-cache"
import { toast } from "sonner"

export const useLikePost = (isFromMe: boolean) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation<LikeResponse, Error, string>({
    mutationFn: (postId) => LikeRequest(postId),

    onSuccess: (data) => {
      if (data.success) {
        updatePostCache({
          newPost: data.post,
          queryClient,
          isFromMe,
        })
      }
    },

    onError: (err) => {
      toast.error(err.message || "Houve um erro ao curtir essa publicação", {
        description: "Tente novamente em alguns instantes",
      })
    },
  })

  return {
    likePost: mutate,
    isPending,
  }
}
