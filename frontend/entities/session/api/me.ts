import { api } from "@/shared/api"
import { MeResponse } from "../model/types"

export async function MeRequest() {
  const res = await api.get<MeResponse>("/auth/me")
  return res.data.user
}
