import { DeleteRequest } from "@/features/comments/delete-comment/model/interfaces"
import { api } from "@/shared/api"

export async function deleteComment({ commentId, postId }: DeleteRequest) {
  try {
    const res = await api.delete(`/comments/${postId}/${commentId}`)
    return res.data
  } catch (err) {
    throw Error(err as string)
  }
}
