import { useQuery } from "@tanstack/react-query"
import { getGroups } from "../api/get-groups"
import { usePathname } from "next/navigation"
import { IGroup } from "./interfaces"
import { IServerError } from "@/shared/interfaces"
import { getGroup } from "../api/get-group"

export const useGroupsQuery = (groupId?: string) => {
  const pathname = usePathname()
  const { data, isLoading, isError, error } = useQuery<IGroup[], IServerError>({
    queryKey: ["groups"],
    queryFn: getGroups,
    enabled: pathname === "/groups",
    staleTime: 60 * 1000 * 30,
    refetchOnReconnect: true,
  })

  const groupFound = useQuery<IGroup, IServerError>({
    queryKey: ["group", groupId],
    queryFn: () =>
      getGroup({
        groupId: groupId!,
        isFromServer: false,
      }),
    enabled: !!groupId && pathname.startsWith("/groups/feeds"),
    staleTime: 1000 * 60 * 5,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  })
  return {
    groups: data,
    isLoading,
    isError,
    error,
    //
    group: groupFound.data,
    loadingGroup: groupFound.isLoading,
    errorInGroup: groupFound.error,
  }
}
