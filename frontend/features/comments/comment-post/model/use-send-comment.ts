import { createComment } from "@/entities/comments/api/create-comment"
import { IComment } from "@/entities/comments/model/interfaces"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { SendCommentPayload } from "./interfaces"
import { toast } from "sonner"
import { updateCommentCache } from "@/entities/comments/lib/update-comment-cache"

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
        postId: data.postId,
        queryClient,
      })
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })
  return { sendComment: mutate, isPending, error, isSuccess }
}
