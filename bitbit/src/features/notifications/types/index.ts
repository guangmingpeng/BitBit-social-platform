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
  // 消息通知聚合相关字段
  messageData?: {
    senders: Array<{
      userId: string;
      userName: string;
      userAvatar?: string;
      lastMessage: string;
      timestamp: string;
    }>;
    totalCount: number;
    lastSenderName: string;
    lastMessage: string;
    lastSenderId: string;
    lastSenderAvatar?: string;
  };
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
