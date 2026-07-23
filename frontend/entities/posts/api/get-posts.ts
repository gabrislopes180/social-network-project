import { api } from "@/shared/api"
import { IPost } from "../model/interfaces"
import { getServerError } from "@/shared/lib/get-server-error"

export async function GetPosts(): Promise<IPost[]> {
  try {
    const res = await api.get("/posts/me")
    return res.data.posts
  } catch (err) {
    throw getServerError(err)
  }
}
