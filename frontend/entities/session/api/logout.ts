import { api } from "@/shared/api"
import { getServerError } from "@/shared/lib/get-server-error"

interface Response {
  success: boolean
  message: string
}

export async function logoutRequest(): Promise<Response> {
  try {
    const res = await api.post("/auth/logout")
    return res.data
  } catch (error) {
    throw getServerError(error)
  }
}
