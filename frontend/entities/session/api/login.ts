import { api } from "@/shared/api"
import { LoginPayload, SessionResponse } from "../model/types"
import { getServerError } from "@/shared/lib/get-server-error"

export async function LoginRequest(
  payload: LoginPayload
): Promise<SessionResponse> {
  try {
    const res = await api.post("/auth/login", payload)
    return res.data
  } catch (error) {
    throw getServerError(error)
  }
}
