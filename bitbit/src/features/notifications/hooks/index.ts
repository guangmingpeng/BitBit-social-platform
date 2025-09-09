import { useState, useEffect, useCallback } from "react";
import { notificationService } from "../services";
import type {
  Notification,
  NotificationStats,
  NotificationType,
} from "../types";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [stats, setStats] = useState<NotificationStats>({
    total: 0,
    unread: 0,
    byType: { all: 0, activity: 0, social: 0, system: 0 },
  });
  const [loading, setLoading] = useState(true);

  const refreshData = useCallback(() => {
    try {
      const newNotifications = notificationService.getNotifications();
      const newStats = notificationService.getStats();
      setNotifications(newNotifications);
      setStats(newStats);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();
    const unsubscribe = notificationService.subscribe(refreshData);
    return unsubscribe;
  }, [refreshData]);

  return {
    notifications,
    stats,
    loading,
    refreshData,
  };
};

export const useNotificationsByType = (type: NotificationType) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshData = useCallback(() => {
    try {
      const filteredNotifications =
        notificationService.getNotificationsByType(type);
      setNotifications(filteredNotifications);
    } catch (error) {
      console.error(`Failed to fetch ${type} notifications:`, error);
    } finally {
      setLoading(false);
    }
  }, [type]);

  useEffect(() => {
    refreshData();
    const unsubscribe = notificationService.subscribe(refreshData);
    return unsubscribe;
  }, [refreshData]);

  return {
    notifications,
    loading,
    refreshData,
  };
};

export const useNotificationActions = () => {
  const markAsRead = useCallback((id: string) => {
    notificationService.markAsRead(id);
  }, []);

  const markAllAsRead = useCallback(() => {
    notificationService.markAllAsRead();
  }, []);

  const clearAllNotifications = useCallback(() => {
    notificationService.clearAllNotifications();
  }, []);

  const deleteNotification = useCallback((id: string) => {
    notificationService.deleteNotification(id);
  }, []);

  return {
    markAsRead,
    markAllAsRead,
    clearAllNotifications,
    deleteNotification,
  };
};
