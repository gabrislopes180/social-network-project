import { api } from "@/shared/api"
import { FollowResponse } from "../model/types"
import { getServerError } from "@/shared/lib/get-server-error"

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
    throw getServerError(error)
  }
}
