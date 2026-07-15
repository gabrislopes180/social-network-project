import { api } from "@/shared/api"

export async function DeletePost(postId: string) {
  try {
    const res = await api.delete(`/posts/${postId}`)
    return res.data
  } catch (err) {
    throw Error(err as string)
  }
}
