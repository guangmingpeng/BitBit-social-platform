export interface Notification {
  id: string;
  type: "activity" | "social" | "system" | "message";
  title: string;
  content: string;
  time: string;
  isRead: boolean;
  avatar?: string;
  actionUrl?: string;
  createdAt: string;
  updatedAt?: string;
}

export type NotificationType = "all" | "activity" | "social" | "system";

export interface NotificationStats {
  total: number;
  unread: number;
  byType: Record<NotificationType, number>;
}

export interface NotificationFilter {
  type: NotificationType;
  onlyUnread?: boolean;
}

export interface NotificationActions {
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAllNotifications: () => void;
  deleteNotification: (id: string) => void;
}
