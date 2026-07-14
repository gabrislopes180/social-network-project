import { useQuery } from "@tanstack/react-query"
import { GetPosts } from "../api/get-posts"
import { IPost } from "./interfaces"

export const usePostsQuery = () => {
  const { data, isLoading, error } = useQuery<IPost[]>({
    queryKey: ["posts"],
    queryFn: GetPosts,
    staleTime: 60 * 1000 * 10,
  })

  return {
    posts: data,
    isLoading,
    error,
  }
}
