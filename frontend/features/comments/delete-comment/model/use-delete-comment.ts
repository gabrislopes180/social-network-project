import { deleteComment } from "@/entities/comments/api/delete-comment"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { DeleteCommentResponse, DeleteRequest } from "./interfaces"
import { deleteCommentCache } from "@/entities/comments/lib/update-comment-cache"
import { showError } from "@/shared/lib/get-server-error"

export const useDeleteComment = () => {
  const queryClient = useQueryClient()
  return useMutation<DeleteCommentResponse, Error, DeleteRequest>({
    mutationFn: async (req) => await deleteComment(req),
    onSuccess: (res) => {
      console.log(res)
      deleteCommentCache({
        comment: res.comment,
        queryClient,
      })
    },
    onError: (err) => {
      const error = showError({
        err,
        genericMessage: "Houve um erro ao deletar o comentário",
      })
      toast.error(error)
    },
  })
}
