import { logoutRequest } from "@/entities/session/api/logout"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export const useHandleLogout = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: async () => logoutRequest(),
    onSuccess: () => {
      router.replace("/authentication")
      queryClient.setQueryData(["session"], null)
    },

    onError: (err) => {
      console.error("Logout  falhou:", err)
    },
  })
}
