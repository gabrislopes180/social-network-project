import { INotification } from "@/entities/notifications/model/interfaces"
import { useNotificationsQuery } from "@/entities/notifications/model/use-notifications-query"
import { useEffect, useRef } from "react"
import { toast } from "sonner"

export const GlobalNotificationObserver = () => {
  const { data } = useNotificationsQuery()

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
        description: "Agora mesmo",
      })

      toastedIds.current.add(notif._id)
    })
  }, [data])

  return null
}
