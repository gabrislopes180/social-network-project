import { IResponse } from "@/shared/interfaces"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { DeletePost } from "../api/delete-post"
import { toast } from "sonner"
import { deletePostFromCache } from "@/entities/posts/lib/update-post-cache"

export const useDeletePost = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation<IResponse, Error, string>({
    mutationFn: (id) => {
      toast.loading("A publicação está sendo apagada", {
        description: "Aguarde um instante",
      })
      return DeletePost(id)
    },

    onSuccess: (data) => {
      deletePostFromCache(id, queryClient)
      toast(data.message)
    },

    onError: (err) => {
      toast.error(err.message)
    },
  })
}
