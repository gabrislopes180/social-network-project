import { api } from "@/shared/api"

export async function DeleteMe(email: string) {
  try {
    const res = await api.post("/auth/me/delete", { email })
    return res.data
  } catch (err) {
    throw Error(err as string)
  }
}
