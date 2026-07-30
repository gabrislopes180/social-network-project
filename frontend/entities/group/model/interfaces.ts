export interface IGroup {
  name: string
  description: string
  creatorId: string
  leaderId: string
  members: string[]
  allowMembersToPost: boolean
  createdAt: Date
  updatedAt: Date
  lastLeadershipTransfer: Date
  meLeader?: boolean
}
