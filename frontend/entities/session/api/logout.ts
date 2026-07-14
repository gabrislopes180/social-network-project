import { api } from "@/shared/api"

interface Response {
  success: boolean
  message: string
}

export async function logoutRequest(): Promise<Response> {
  try {
    const res = await api.post("/auth/logout")
    return res.data
  } catch (error) {
    console.error("Error logging out:", error)
    throw error
  }
}
