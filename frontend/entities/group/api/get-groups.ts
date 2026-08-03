import { api } from "@/shared/api"
import { getServerError } from "@/shared/lib/get-server-error"

export const getGroups = async () => {
  try {
    const res = await api.get("/groups/me")
    return res.data.groups
  } catch (err) {
    throw getServerError(err)
  }
}
