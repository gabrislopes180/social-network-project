import { api } from "@/shared/api"
import { LoginPayload, SessionResponse } from "../model/types"

export async function LoginRequest(
  payload: LoginPayload
): Promise<SessionResponse> {
  try {
    const res = await api.post("/auth/login", payload)

    if (res.data.error) {
      return res.data
    }
    return res.data
  } catch {
    throw new Error("Falha ao fazer login")
  }
}
