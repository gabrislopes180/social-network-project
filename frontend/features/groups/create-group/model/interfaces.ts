import { IGroup } from "@/entities/group/model/interfaces"
import { IResponse } from "@/shared/interfaces"

export interface GroupPayload {
  name: string
  description: string
  allowMembersToPost: boolean
}

export interface CreatedGroupResponse extends IResponse {
  group: IGroup
}
