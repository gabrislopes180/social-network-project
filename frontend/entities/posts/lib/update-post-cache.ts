import { IPost } from "@/entities/posts/model/interfaces"
import { QueryClient } from "@tanstack/react-query"

interface UpdateCacheProps {
  newPost: IPost
  queryClient: QueryClient
  isFromMe?: boolean
}

const QUERY_KEY = ["posts"]

export const addPostToCache = ({ newPost, queryClient }: UpdateCacheProps) => {
  queryClient.setQueryData<IPost[]>(QUERY_KEY, (oldData) => {
    if (!oldData) return

    return [newPost, ...oldData]
  })
}

export const updatePostCache = ({
  newPost,
  queryClient,
  isFromMe,
}: UpdateCacheProps) => {
  const ACTIVE_KEY = isFromMe === true ? QUERY_KEY : ["user-posts"]
  queryClient.setQueryData<IPost[]>(ACTIVE_KEY, (oldData) => {
    if (!oldData) return oldData

    return oldData.map((currentPost) =>
      currentPost._id === newPost._id ? newPost : currentPost
    )
  })
}

export const deletePostFromCache = (id: string, queryClient: QueryClient) => {
  queryClient.setQueryData<IPost[]>(QUERY_KEY, (oldData) => {
    if (!oldData) return

    return oldData.filter((post) => post._id !== id)
  })
}
