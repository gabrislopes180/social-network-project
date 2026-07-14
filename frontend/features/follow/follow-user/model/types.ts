import { User } from "@/entities/session/model/types"

export interface FollowResponse {
  success: boolean
  message: string
  user: User
  status: {
    followedBy: boolean
    isFollowing: boolean
    id: string
    followedUser: {
      _id: string
      username: string
    }
  }
}
