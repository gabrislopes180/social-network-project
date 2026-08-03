export interface IGroup {
  _id: string
  name: string
  description: string
  creatorId: string
  leaderId: string
  members: string[]
  allowMembersToPost: boolean
  xp: number
  createdAt: Date
  updatedAt: Date
  lastLeadershipTransfer: Date
  meLeader?: boolean
}
