import { api } from "@/shared/api"
import { UpdatePayload } from "../model/interfaces"
import { getServerError } from "@/shared/lib/get-server-error"

export async function UpdatePost({ postId, newContent }: UpdatePayload) {
  try {
    const res = await api.patch(`/posts/${postId}`, { newContent })
    return res.data
  } catch (err) {
    throw getServerError(err as string)
  }
}
