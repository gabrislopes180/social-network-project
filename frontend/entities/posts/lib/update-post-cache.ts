import { IPost } from "@/entities/posts/model/interfaces"
import { QueryClient } from "@tanstack/react-query"

interface UpdateCacheProps {
  newPost: IPost
  queryClient: QueryClient
}

export const updatePostCache = ({ newPost, queryClient }: UpdateCacheProps) => {
  const QUERY_KEY = ["posts"]
  queryClient.setQueryData<IPost[]>(QUERY_KEY, (oldData) => {
    if (!oldData) return

    return [newPost, ...oldData]
  })
}
