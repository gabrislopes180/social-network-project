import { User } from "@/entities/session/model/types"
import { IResponse } from "@/shared/interfaces"

export interface UserFoundRespone extends IResponse {
  user: User
  isFollowing: boolean
  followsMe: boolean
}
