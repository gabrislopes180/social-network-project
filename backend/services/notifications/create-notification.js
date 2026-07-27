import { Notification } from "../../models/Notifications.js";

export const createNotification = async ({
  recipientId,
  senderId,
  type,
  relatedPostId = null,
}) => {
  try {
    if (recipientId.toString() === senderId.toString()) {
      return;
    }

    await Notification.create({
      recipient: recipientId,
      sender: senderId,
      type,
      relatedPost: relatedPostId,
    });
  } catch (error) {
    console.error("Erro ao criar notificação:", error);
  }
};
