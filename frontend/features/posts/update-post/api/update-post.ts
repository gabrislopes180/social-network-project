import { api } from "@/shared/api"
import { UpdatePayload } from "../model/interfaces"

export async function UpdatePost({ postId, newContent }: UpdatePayload) {
  try {
    const res = await api.patch(`/posts/${postId}`, { newContent })
    return res.data
  } catch (err) {
    throw Error(err as string)
  }
}
