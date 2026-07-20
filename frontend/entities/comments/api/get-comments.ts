import { api } from "@/shared/api"

export async function GetComments(postId: string) {
  try {
    const res = await api.get(`/comments/me/${postId}`)
    return res.data.comments
  } catch (err) {
    throw Error(err as string)
  }
}
