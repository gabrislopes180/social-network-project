import { useQuery } from "@tanstack/react-query"
import { GetPostsByUser } from "../api/get-posts-by-user"

export const useUserPostsQuery = (username: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user-posts", username],
    queryFn: () => GetPostsByUser(username),
    staleTime: 60 * 5 * 1000,
    enabled: !!username,
    refetchOnMount: true,
  })

  return {
    data,
    isLoading,
    error,
  }
}
