import { GroupPayload } from "@/features/groups/create-group/model/interfaces"
import { api } from "@/shared/api"
import { getServerError } from "@/shared/lib/get-server-error"

export const CreateGroup = async (payload: GroupPayload) => {
  try {
    const res = await api.post("/groups/create", payload)
    return res.data
  } catch (err) {
    throw getServerError(err)
  }
}
