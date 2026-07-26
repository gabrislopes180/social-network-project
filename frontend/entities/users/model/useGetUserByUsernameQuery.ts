import { useQuery } from "@tanstack/react-query"
import { GetUserByUsername } from "../api/get-user-by-username"
import { useSessionQuery } from "@/entities/session/model/useSession"
import { UserFoundRespone } from "./interfaces"
import { IUserParams } from "@/shared/interfaces"

export const useGetUserByUsername = ({ username, isFromMe }: IUserParams) => {
  const { user } = useSessionQuery()
  const { data: res, isLoading } = useQuery({
    queryKey: ["user-found", username],
    queryFn: () =>
      GetUserByUsername({
        username,
        isFromClient: true,
      }),
    enabled: !!username && !isFromMe,
    staleTime: 0,
  })

  const currentUser: UserFoundRespone | undefined =
    user?.username === username
      ? {
          success: true,
          user: user,
          followsMe: false,
          isFollowing: false,
        }
      : res

  return { currentUser, isLoading }
}
