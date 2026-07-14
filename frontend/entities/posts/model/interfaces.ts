export interface IPost {
  _id: string
  authorId: string
  content: string
  imageUrl: string
  likesCount: string
  commentsCount: string
  createdAt: Date
  updatedAt: Date | null
  deletedAt: Date | null
}
