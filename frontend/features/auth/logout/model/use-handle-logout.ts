import { logoutRequest } from "@/entities/session/api/logout"
import { useSessionQuery } from "@/entities/session/model/useSession"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

export const useHandleLogout = () => {
  const { clearSession } = useSessionQuery()
  const router = useRouter()

  return useMutation({
    mutationFn: async () => logoutRequest(),
    onSuccess: () => {
      router.replace("/authentication")
      clearSession()
    },

    onError: (err) => {
      console.error("Logout  falhou:", err)
    },
  })
}
