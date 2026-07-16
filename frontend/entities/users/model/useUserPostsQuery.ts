import { useQuery } from "@tanstack/react-query"
import { GetPostsByUser } from "../api/get-posts-by-user"

export const useUserPostsQuery = (username: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user-posts"],
    queryFn: () => GetPostsByUser(username),
    staleTime: 0,
    enabled: !!username,
    refetchOnMount: true,
  })

  return {
    data,
    isLoading,
    error,
  }
}
