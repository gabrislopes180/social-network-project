import { useMutation, useQueryClient } from "@tanstack/react-query"
import { LikeResponse } from "./interfaces"
import { toast } from "sonner"
import { RemoveLike } from "../api/remove-like"
import { showError } from "@/shared/lib/get-server-error"
import { toggleLikeInCache } from "../lib/update-like-cache"

export const useRemoveLike = (isFromMe: boolean) => {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation<LikeResponse, Error, string>({
    mutationFn: (postId) => {
      console.log(postId)
      return RemoveLike(postId)
    },

    onSuccess: (data) => {
      if (data.success) {
        toggleLikeInCache({
          postId: data.post._id,
          queryClient,
          isFromMe,
          action: "unlike",
        })
      }
    },

    onError: (err) => {
      const error = showError({
        err,
        genericMessage: "Houve um erro ao descurtir essa publicação",
      })
      toast.error(error, {
        description: "Tente novamente em alguns instantes",
      })
    },
  })

  return {
    handleRemove: mutate,
    isPending,
  }
}
