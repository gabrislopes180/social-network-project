import { api } from "@/shared/api"
import { User } from "../../session/model/types"

export interface SearchResponse {
  success: boolean
  users: User[]
  message?: string
}

export async function GetUsersSearch(
  username: string
): Promise<SearchResponse> {
  try {
    const res = await api.get("/users/user-suggestion", {
      params: {
        username,
      },
    })

    return res.data
  } catch {
    throw new Error("Falha ao buscar usuário")
  }
}
