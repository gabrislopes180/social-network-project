import { api } from "@/shared/api"
import { getServerError } from "@/shared/lib/get-server-error"

export async function DeletePost(postId: string) {
  try {
    const res = await api.delete(`/posts/${postId}`)
    return res.data
  } catch (err) {
    throw getServerError(err as string)
  }
}
