import { api } from "@/shared/api"
import { UpdatePayload } from "../model/interfaces"

export const updataUser = async (payload: UpdatePayload) => {
  console.log(payload)
  try {
    const res = await api.put("/users/me", payload)
    return res.data
  } catch (err) {
    throw Error(err as string)
  }
}
