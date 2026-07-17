import { useMutation, useQueryClient } from "@tanstack/react-query"
import { LikeResponse } from "./interfaces"
import { updatePostCache } from "@/entities/posts/lib/update-post-cache"
import { toast } from "sonner"
import { RemoveLike } from "../api/remove-like"

export const useRemoveLike = (isFromMe: boolean) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation<LikeResponse, Error, string>({
    mutationFn: (postId) => {
      console.log(postId)
      return RemoveLike(postId)
    },

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
      toast.error(err.message || "Houve um erro ao descurtir essa publicação", {
        description: "Tente novamente em alguns instantes",
      })
    },
  })

  return {
    handleRemove: mutate,
    isPending,
  }
}
