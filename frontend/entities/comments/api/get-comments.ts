import { api } from "@/shared/api"
import { getServerError } from "@/shared/lib/get-server-error"

export async function GetComments(postId: string) {
  try {
    const res = await api.get(`/comments/me/${postId}`)
    return res.data.comments
  } catch (err) {
    throw getServerError(err)
  }
}
