import { api } from "@/shared/api"
import { getServerError } from "@/shared/lib/get-server-error"

export async function GetFeed() {
  try {
    const res = await api.get("/posts/me/feed")
    return res.data.posts
  } catch (err) {
    throw getServerError(err)
  }
}
