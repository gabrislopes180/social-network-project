import { IPost } from "@/entities/posts/model/interfaces"
import { api } from "@/shared/api"
import { IResponse } from "@/shared/interfaces"

interface PostsResponse extends IResponse {
  posts: IPost[]
}

export async function GetPostsByUser(username: string): Promise<IPost[]> {
  try {
    const res = await api.get(`/posts/user/${username}`)
    return res.data.posts
  } catch (err) {
    throw new Error(err as string)
  }
}
