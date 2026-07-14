import { api } from "@/shared/api"
import { User } from "../../session/model/types"

export interface SuggestionsResponse {
  data: User[]
}

export async function GetUsersSearch(): Promise<SuggestionsResponse> {
  try {
    const res = await api.get("/users/suggestions")

    return res.data
  } catch {
    throw new Error("Falha ao buscar sugestões de usuários")
  }
}
