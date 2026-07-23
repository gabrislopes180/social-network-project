import { IResponse } from "@/shared/interfaces"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { DeletePost } from "../api/delete-post"
import { toast } from "sonner"
import { deletePostFromCache } from "@/entities/posts/lib/update-post-cache"
import { showError } from "@/shared/lib/get-server-error"

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
      const error = showError({
        err,
        genericMessage: "Houve um erro ao excluir a publicação.",
      })
      toast.error(error, {
        description: "Tente novamente em alguns instantes",
      })
    },
  })
}
