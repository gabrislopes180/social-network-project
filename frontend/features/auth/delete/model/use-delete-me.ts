import { useMutation, useQueryClient } from "@tanstack/react-query"
import { DeleteMe } from "../api/delete-me"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { IResponse } from "@/shared/interfaces"

export const useDeleteMe = () => {
  const queryClient = useQueryClient()
  const routes = useRouter()
  const { mutate, isPending, isError } = useMutation<IResponse, Error, string>({
    mutationFn: (email) => DeleteMe(email),
    onSuccess: () => {
      queryClient.setQueryData(["session"], null)
      routes.push("/")
    },
    onError: () => {
      toast.error("Houve um erro ao excluir a conta")
    },
  })
  return { mutate, isPending, isError }
}
