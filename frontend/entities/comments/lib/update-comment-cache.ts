import { QueryClient } from "@tanstack/react-query"
import { IComment } from "../model/interfaces"

export interface UpdateCacheProps {
  comment: IComment
  queryClient: QueryClient
  postId?: string
}

export const updateCommentCache = ({
  comment,
  postId,
  queryClient,
}: UpdateCacheProps) => {
  const QUERY_KEY = ["comments", postId]
  queryClient.setQueryData<IComment[]>(QUERY_KEY, (oldData) => {
    if (!oldData) return

    return [comment, ...oldData]
  })

  queryClient.setQueryData(["new-comment-animation", postId], comment._id)
}
