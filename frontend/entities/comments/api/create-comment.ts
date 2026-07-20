import { SendCommentPayload } from "@/features/comments/comment-post/model/interfaces"
import { api } from "@/shared/api"

export const createComment = async ({
  commentText,
  postId,
}: SendCommentPayload) => {
  try {
    console.log("Comentario no endpoint: ", commentText)

    const res = await api.post(`/comments/${postId}`, { commentText })
    return res.data.comment
  } catch (err) {
    throw Error(err as string)
  }
}
