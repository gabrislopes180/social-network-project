import { createComment } from "@/entities/comments/api/create-comment"
import { IComment } from "@/entities/comments/model/interfaces"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { SendCommentPayload } from "./interfaces"
import { toast } from "sonner"
import { updateCommentCache } from "@/entities/comments/lib/update-comment-cache"
import { showError } from "@/shared/lib/get-server-error"

export const useSendComment = () => {
  const queryClient = useQueryClient()
  const { mutate, isPending, error, isSuccess } = useMutation<
    IComment,
    Error,
    SendCommentPayload
  >({
    mutationFn: (req) => {
      console.log("Comentario no mutation: ", req.commentText)
      return createComment(req)
    },
    onSuccess: (data) => {
      // Função para atualizar o cache dos comentários
      updateCommentCache({
        comment: data,
        queryClient,
      })
    },
    onError: (error) => {
      const err = showError({
        err: error,
        genericMessage: "Houve um erro ao publicar o comentário",
      })
      toast.error(err)
    },
  })
  return { sendComment: mutate, isPending, error, isSuccess }
}
