import { api } from "@/shared/api"
import { IPost } from "../model/interfaces"

export async function GetPosts(): Promise<IPost[]> {
  try {
    const res = await api.get("/posts/me")
    return res.data.posts
  } catch {
    throw new Error("Falha ao buscar publicações: ")
  }
}
