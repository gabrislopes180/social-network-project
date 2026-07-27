import { api } from "@/shared/api"
import { getServerError } from "@/shared/lib/get-server-error"

export async function MarkAsViewed(notificationId: string) {
  try {
    const res = await api.patch(`/notifications/markAsViewed/${notificationId}`)
    return res.data
  } catch (err) {
    throw getServerError(err)
  }
}
