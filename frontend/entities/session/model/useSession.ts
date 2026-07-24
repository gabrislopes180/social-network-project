import { useQuery, useQueryClient } from "@tanstack/react-query"
import { MeRequest } from "../api/me"
import { User } from "./types"

export const useSessionQuery = () => {
  const queryClient = useQueryClient()
  const QUERY_KEY = ["session"]

  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User>({
    queryKey: QUERY_KEY,
    queryFn: async () => MeRequest(),
    retry: false,
    staleTime: 1000 * 5 * 60,
  })

  return { user, isLoading, error }
}
