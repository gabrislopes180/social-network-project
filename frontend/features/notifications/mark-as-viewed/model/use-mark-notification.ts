import { useMutation } from "@tanstack/react-query"
import { MarkAsViewed } from "../api/mark-as-viewed"
import { IResponse, IServerError } from "@/shared/interfaces"

export const useMarkNotification = () => {
  return useMutation<IResponse, IServerError, string>({
    mutationFn: (id) => MarkAsViewed(id),
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (err) => {
      console.error(err)
    },
  })
}
