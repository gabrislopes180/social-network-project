import { User } from "@/entities/session/model/types"
import { IResponse } from "@/shared/interfaces"

export interface UpdatePayload {
  fullName: string
  username: string
  description: string
  preferences: {
    color1: string
    color2: string
  }
}

export interface UpdateResponse extends IResponse {
  user: User
}
