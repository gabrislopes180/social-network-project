import { api } from "@/shared/api"
import { UpdatePayload } from "../model/interfaces"
import { getServerError } from "@/shared/lib/get-server-error"

export const updataUser = async (payload: UpdatePayload) => {
  console.log(payload)
  try {
    const res = await api.put("/users/me", payload)
    return res.data
  } catch (err) {
    throw getServerError(err as string)
  }
}
