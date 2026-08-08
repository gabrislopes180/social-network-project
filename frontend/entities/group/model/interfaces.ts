export interface IMemberUser {
  _id: string
  username: string
  avatar: string
  isMe: boolean
}

export interface ILeader {
  _id: string
  username: string
  fullName: string
}

export interface IGroup {
  _id: string
  name: string
  description: string
  creatorId: string
  leader: ILeader
  members: IMemberUser[]
  allowMembersToPost: boolean
  xp: number
  createdAt: string
  updatedAt: string
  lastLeadershipTransfer: Date
  meLeader?: boolean
}
