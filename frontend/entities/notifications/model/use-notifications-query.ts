import { useQuery } from "@tanstack/react-query"
import { getNotifications } from "../api/get-notifications"
import { NotificationsResponse } from "./interfaces"
import { IServerError } from "@/shared/interfaces"
import { useSessionQuery } from "@/entities/session/model/useSession"

export const useNotificationsQuery = () => {
  const { user } = useSessionQuery()
  return useQuery<NotificationsResponse, IServerError>({
    queryKey: ["notifications"],
    queryFn: getNotifications,

    refetchInterval: 5000,
    refetchIntervalInBackground: false,
    refetchOnReconnect: true,
    enabled: !!user,
  })
}
