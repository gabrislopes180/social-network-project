import { api } from "@/shared/api"
import { getServerError } from "@/shared/lib/get-server-error"

export const getNotifications = async () => {
  try {
    const res = await api.get("/notifications/me")
    return res.data
  } catch (err) {
    throw getServerError(err)
  }
}
