import { QueryClient } from "@tanstack/react-query"
import { IComment } from "../model/interfaces"

export interface UpdateCacheProps {
  comment: IComment
  queryClient: QueryClient
}

export const updateCommentCache = ({
  comment,
  queryClient,
}: UpdateCacheProps) => {
  const QUERY_KEY = ["comments", comment.postId]
  queryClient.setQueryData<IComment[]>(QUERY_KEY, (oldData) => {
    if (!oldData) return

    return [comment, ...oldData]
  })

  queryClient.setQueryData(
    ["new-comment-animation", comment.postId],
    comment._id
  )
}

export const deleteCommentCache = ({
  queryClient,
  comment,
}: UpdateCacheProps) => {
  queryClient.setQueryData<IComment[]>(
    ["comments", comment.postId],
    (oldData) => {
      if (!oldData || !comment) return

      return oldData.filter(
        (deletedComment) => deletedComment._id !== comment._id
      )
    }
  )
}
