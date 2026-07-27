import { Notification } from "../models//Notifications.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user.id;

    const notifications = await Notification.find({
      recipient: userId,
      read: false,
    })
      .sort({ createdAt: -1 })
      .populate("sender", "username fullName");

    return res.status(200).json({
      success: true,
      notifications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Erro interno ao buscar notificações.",
      detail: error.message,
    });
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    await Notification.findByIdAndUpdate(notificationId, {
      read: true,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
