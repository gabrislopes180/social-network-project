export interface IComment {
  _id: string
  postId: string
  commentText: string
  isMyComment: boolean
  createdAt: string
  updatedAt: string
  userId: {
    _id: string
    username: string
  }
}

export interface ICommentsQueryProps {
  postId: string
  enableToFetch: boolean
}
