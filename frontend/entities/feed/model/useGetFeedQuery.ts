"use client"

import { useSessionQuery } from "@/entities/session/model/useSession"
import { useQuery } from "@tanstack/react-query"
import { GetFeed } from "../api/get-feed"
import { usePathname } from "next/navigation"
import { IPost } from "@/entities/posts/model/interfaces"
import { IServerError } from "@/shared/interfaces"

export const useFeedQuery = () => {
  const { user } = useSessionQuery()
  const pathname = usePathname()
  const { data, isLoading, error, isError } = useQuery<IPost[], IServerError>({
    queryKey: ["feed", user?._id],
    queryFn: GetFeed,
    enabled: !!user && pathname === "/feeds",
    staleTime: 1000 * 20,
    refetchOnReconnect: true,
    refetchOnMount: true,
  })
  return {
    feedPosts: data,
    isLoading,
    isError,
    error,
  }
}
