import { useQuery } from "@tanstack/react-query"
import { GetPosts } from "../api/get-posts"
import { IPost } from "./interfaces"
import { GetPostsByUser } from "@/entities/users/api/get-posts-by-user"
import { IUserParams } from "@/shared/interfaces"

export const usePostsQuery = ({ username, isFromMe }: IUserParams) => {
  const {
    data: myPosts,
    isLoading: loandingMyPosts,
    error: myPostsError,
  } = useQuery<IPost[]>({
    queryKey: ["posts"],
    queryFn: GetPosts,
    enabled: isFromMe && !!username,
    staleTime: 0,
  })

  const {
    data: userPosts,
    isLoading,
    error: userPostsError,
  } = useQuery({
    queryKey: ["user-posts", username],
    queryFn: () => GetPostsByUser(username),
    staleTime: 0,
    enabled: !!username && !isFromMe,
    refetchOnMount: true,
  })

  const posts = isFromMe ? myPosts : userPosts
  const loading = isFromMe ? loandingMyPosts : isLoading
  const error = isFromMe ? myPostsError : userPostsError

  return {
    posts,
    loading,
    error,
  }
}
