import { INotification } from "@/entities/notifications/model/interfaces"
import { useNotificationsQuery } from "@/entities/notifications/model/use-notifications-query"
import { useMarkNotification } from "@/features/notifications/mark-as-viewed/model/use-mark-notification"
import { useEffect, useRef } from "react"
import { toast } from "sonner"

export const GlobalNotificationObserver = () => {
  const { data } = useNotificationsQuery()
  const { mutate: markNotificationAsViewed } = useMarkNotification()

  const toastedIds = useRef<Set<string>>(new Set())

  useEffect(() => {
    // Se não tiver notificações, não faz nada
    if (!data?.notifications) return

    const unreadNotifications = data.notifications.filter(
      (notif: INotification) => !notif.read
    )

    unreadNotifications.forEach((notif: INotification) => {
      if (toastedIds.current.has(notif._id)) return

      let message = ""
      if (notif.type === "like")
        message = `${notif.sender.username} curtiu sua publicação ❤️`
      if (notif.type === "follow")
        message = `${notif.sender.username} começou a seguir você 👤`
      if (notif.type === "comment")
        message = `${notif.sender.username} comentou no seu post 💬`

      toast(message, {
        id: notif._id,
        description: "Agora mesmo",
        duration: Infinity,
        action: {
          label: "Ok",
          onClick: () => {
            markNotificationAsViewed(notif._id, {
              onSuccess: () => {
                toast.dismiss(notif._id)
              },
              onError: () => {
                toast.error("Erro ao marcar como lida.")
              },
            })
          },
        },
      })

      toastedIds.current.add(notif._id)
    })
  }, [data])

  return null
}
