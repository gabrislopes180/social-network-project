export interface IPostAuthor {
  _id: string
  username: string
  fullName: string
  avatar?: string
}

export interface IPost {
  _id: string
  author: IPostAuthor
  content: string
  imageUrl: string
  likesCount: number
  commentsCount: number
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
  likedByMe: boolean
}
