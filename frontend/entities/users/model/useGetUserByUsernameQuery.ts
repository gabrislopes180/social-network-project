import { useQuery } from "@tanstack/react-query"
import { GetUserByUsername } from "../api/get-user-by-username"

export const useGetUserByUsername = (name: string) => {
  const { data: res, isLoading } = useQuery({
    queryKey: ["user-found", name],
    queryFn: () =>
      GetUserByUsername({
        username: name,
        isFromClient: true,
      }),
    enabled: !!name,
    staleTime: 0,
  })

  return { res, isLoading }
}
