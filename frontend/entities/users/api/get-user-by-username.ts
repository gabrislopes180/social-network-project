import { api, apiServer } from "@/shared/api"
import { User } from "../../session/model/types"

interface UserResponse {
  success: boolean
  user: User
}

interface RequestParams {
  username: string
  isFromClient: boolean
}

export async function GetUserByUsername({
  username,
  isFromClient,
}: RequestParams): Promise<UserResponse> {
  try {
    if (isFromClient) {
      const res = await api.get(`/users/${username}`)
      return res.data
    }
    const res = await apiServer.get(`/users/${username}`)
    return res.data
  } catch (error) {
    throw new Error("Falha ao buscar usuário por nome de usuário: " + error)
  }
}
