import { api } from "@/shared/api"

export async function LikeRequest(postId: string) {
  try {
    const res = await api.post(`/likes/${postId}`)
    return res.data
  } catch (err) {
    throw Error(err as string)
  }
}
