import { User } from "@/entities/session/model/types"
import { api } from "@/shared/api"

export interface unfollowResponse {
  success: boolean
  user: User
  message: string
}

export async function unfollowUser(
  userIdToUnfollow: string,
  userId?: string
): Promise<unfollowResponse> {
  try {
    const res = await api.delete(`/follows/${userIdToUnfollow}`, {
      data: { userId },
    })
    return res.data
  } catch (error) {
    console.error("Error following user:", error)
    throw error
  }
}
