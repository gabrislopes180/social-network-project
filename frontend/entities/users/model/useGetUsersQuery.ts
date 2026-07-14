"use client"

import { useQuery } from "@tanstack/react-query"
import { GetUsersSearch, SuggestionsResponse } from "../api/get-suggestions"

export const useGetUsers = () => {
  const { data, isLoading, error } = useQuery<SuggestionsResponse>({
    queryKey: ["users"],
    queryFn: GetUsersSearch,
    staleTime: 1000 * 60 * 2, // 5 minutos
  })
  console.log(data)

  const users = data?.data || []

  return {
    users,
    isLoading,
    error,
  }
}
