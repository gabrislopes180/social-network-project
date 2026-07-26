import { apiServer } from "@/shared/api"
import { MeResponse } from "../model/types"

export async function MeRequestServer() {
  const res = await apiServer.get<MeResponse>("/auth/me")
  return res.data.user
}
