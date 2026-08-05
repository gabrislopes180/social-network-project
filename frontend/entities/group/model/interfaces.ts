export interface IGroup {
  _id: string
  name: string
  description: string
  creatorId: string
  leader: {
    _id: string
    username: string
    fullName: string
  }
  members: string[]
  allowMembersToPost: boolean
  xp: number
  createdAt: Date
  updatedAt: Date
  lastLeadershipTransfer: Date
  meLeader?: boolean
}
