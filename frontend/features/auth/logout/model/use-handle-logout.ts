import { logoutRequest } from "@/entities/session/api/logout"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export const useHandleLogout = () => {
  const queryClient = useQueryClient()
  const routes = useRouter()

  return useMutation({
    mutationFn: async () => logoutRequest(),
    onSuccess: () => {
      queryClient.setQueryData(["session"], null)
      routes.replace("/")
    },

    onError: (err) => {
      console.error("Logout  falhou:", err)
    },
  })
}
