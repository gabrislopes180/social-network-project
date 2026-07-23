import { logoutRequest } from "@/entities/session/api/logout"
import { showError } from "@/shared/lib/get-server-error"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

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
      const error = showError({
        err,
        genericMessage: "Houve um erro ao deslogar",
      })
      toast.error(error)
    },
  })
}
