import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updataUser } from "../api/update-user"
import { UpdatePayload, UpdateResponse } from "./interfaces"
import { toast } from "sonner"
import { User } from "@/entities/session/model/types"
import { showError } from "@/shared/lib/get-server-error"

export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  return useMutation<UpdateResponse, Error, UpdatePayload>({
    mutationFn: (req) => updataUser(req),
    onSuccess: (res) => {
      queryClient.setQueryData<User>(["session"], res.user)
      toast.success(res.message)
    },

    onError: (err) => {
      const error = showError({
        err,
        genericMessage: "Houve um erro ao atualizar os dados",
      })
      toast.error(error)
    },
  })
}
