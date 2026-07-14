import { api } from "@/shared/api"
import { FollowResponse } from "../model/types"

export async function followUser(
  userIdToFollow: string,
  userId?: string
): Promise<FollowResponse> {
  try {
    const res = await api.post(`/follows/${userIdToFollow}`, {
      userId,
    })
    return res.data
  } catch (error) {
    console.error("Error following user:", error)
    throw error
  }
}
