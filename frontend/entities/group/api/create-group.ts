import { api } from "@/shared/api"
import { getServerError } from "@/shared/lib/get-server-error"

export const CreateGroup = async () => {
  try {
    const res = await api.post("/groups/create", {})
    return res.data
  } catch (err) {
    throw getServerError(err)
  }
}
