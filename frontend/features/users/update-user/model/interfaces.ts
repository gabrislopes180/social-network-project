import { User } from "@/entities/session/model/types"
import { IResponse } from "@/shared/interfaces"

export interface UpdatePayload {
  fullName: string
  username: string
}

export interface UpdateResponse extends IResponse {
  user: User
}
