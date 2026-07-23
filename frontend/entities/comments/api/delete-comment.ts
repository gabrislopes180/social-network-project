import { DeleteRequest } from "@/features/comments/delete-comment/model/interfaces"
import { api } from "@/shared/api"
import { getServerError } from "@/shared/lib/get-server-error"

export async function deleteComment({ commentId, postId }: DeleteRequest) {
  try {
    const res = await api.delete(`/comments/${postId}/${commentId}`)
    return res.data
  } catch (err) {
    throw getServerError(err)
  }
}
