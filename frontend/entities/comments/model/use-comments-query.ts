import { useQuery } from "@tanstack/react-query"
import { GetComments } from "../api/get-comments"
import { IComment, ICommentsQueryProps } from "./interfaces"

export const useCommentsQuery = ({
  postId,
  enableToFetch,
}: ICommentsQueryProps) => {
  const { data, isLoading, error } = useQuery<IComment[], string>({
    queryKey: ["comments", postId],
    queryFn: () => GetComments(postId),
    staleTime: 10 * 1000,
    enabled: !!postId && enableToFetch,
  })

  return {
    comments: data,
    isLoading,
    error,
  }
}
