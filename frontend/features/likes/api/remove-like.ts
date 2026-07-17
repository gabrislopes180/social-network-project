import { api } from "@/shared/api"

export async function RemoveLike(postId: string) {
  try {
    const res = await api.delete(`/likes/${postId}`)
    return res.data
  } catch (err) {
    throw Error(err as string)
  }
}
