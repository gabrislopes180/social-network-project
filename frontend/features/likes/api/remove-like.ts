import { api } from "@/shared/api"
import { getServerError } from "@/shared/lib/get-server-error"

export async function RemoveLike(postId: string) {
  try {
    const res = await api.delete(`/likes/${postId}`)
    return res.data
  } catch (err) {
    throw getServerError(err)
  }
}
