export type NotificationType = "like" | "follow" | "comment"

// 2. A interface principal da Notificação
export interface INotification {
  _id: string
  recipient: string
  sender: {
    _id: string
    username: string
    fullName: string
    avatar?: string
  }
  type: NotificationType
  relatedPost?: {
    _id: string
    content?: string
    image?: string
  } | null
  read: boolean
  createdAt: string
  updatedAt: string
}

export interface NotificationsResponse {
  success: boolean
  notifications: INotification[]
}
