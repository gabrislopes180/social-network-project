import { api, apiServer } from "@/shared/api"
import { getServerError } from "@/shared/lib/get-server-error"
import { UserFoundRespone } from "../model/interfaces"

interface RequestParams {
  username: string
  isFromClient: boolean
}

export async function GetUserByUsername({
  username,
  isFromClient,
}: RequestParams): Promise<UserFoundRespone> {
  try {
    if (isFromClient) {
      const res = await api.get(`/users/${username}`)
      return res.data
    }
    const res = await apiServer.get(`/users/${username}`)
    return res.data
  } catch (error) {
    throw getServerError(error)
  }
}
