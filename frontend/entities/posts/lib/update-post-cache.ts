import { IPost } from "@/entities/posts/model/interfaces"
import { QueryClient } from "@tanstack/react-query"

interface UpdateCacheProps {
  newPost: IPost
  queryClient: QueryClient
}

const QUERY_KEY = ["posts"]

export const updatePostCache = ({ newPost, queryClient }: UpdateCacheProps) => {
  queryClient.setQueryData<IPost[]>(QUERY_KEY, (oldData) => {
    if (!oldData) return

    return [newPost, ...oldData]
  })
}

export const deltePostFromCache = (id: string, queryClient: QueryClient) => {
  queryClient.setQueryData<IPost[]>(QUERY_KEY, (oldData) => {
    if (!oldData) return

    return oldData.filter((post) => post._id !== id)
  })
}
