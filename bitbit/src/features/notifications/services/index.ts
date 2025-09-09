import type {
  Notification,
  NotificationStats,
  NotificationType,
} from "../types";

// 模拟数据
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "activity",
    title: "活动报名成功",
    content: "您已成功报名参加《周末音乐节》活动",
    time: "2小时前",
    isRead: false,
    avatar: "🎵",
    actionUrl: "/activities/music-festival-2024",
    createdAt: "2025-01-08T10:00:00Z",
  },
  {
    id: "2",
    type: "social",
    title: "新的关注者",
    content: "张三关注了你",
    time: "5小时前",
    isRead: false,
    avatar: "https://picsum.photos/40/40?random=1",
    actionUrl: "/profile/followers",
    createdAt: "2025-01-08T07:00:00Z",
  },
  {
    id: "3",
    type: "message",
    title: "收到新消息",
    content: "李四: 今天的摄影活动怎么样？",
    time: "1天前",
    isRead: true,
    avatar: "https://picsum.photos/40/40?random=2",
    actionUrl: "/messages/chat/lisi",
    createdAt: "2025-01-07T12:00:00Z",
  },
  {
    id: "4",
    type: "system",
    title: "系统更新",
    content: "BitBit v2.1 版本已发布，新增了更多个性化功能",
    time: "3天前",
    isRead: true,
    avatar: "🔄",
    actionUrl: "/about/changelog",
    createdAt: "2025-01-05T09:00:00Z",
  },
  {
    id: "5",
    type: "activity",
    title: "活动提醒",
    content: "《摄影分享会》将在明天下午2点开始",
    time: "6小时前",
    isRead: false,
    avatar: "📸",
    actionUrl: "/activities/photography-meetup",
    createdAt: "2025-01-08T06:00:00Z",
  },
  {
    id: "6",
    type: "social",
    title: "获得点赞",
    content: "王五点赞了你的帖子《城市夜景摄影技巧》",
    time: "12小时前",
    isRead: true,
    avatar: "❤️",
    actionUrl: "/community/post-123",
    createdAt: "2025-01-08T00:00:00Z",
  },
];

class NotificationService {
  private notifications: Notification[] = [...mockNotifications];
  private listeners: Set<() => void> = new Set();

  // 获取所有通知
  getNotifications(): Notification[] {
    return [...this.notifications].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  // 根据类型筛选通知
  getNotificationsByType(type: NotificationType): Notification[] {
    const notifications = this.getNotifications();
    if (type === "all") return notifications;
    return notifications.filter((notification) => notification.type === type);
  }

  // 获取统计信息
  getStats(): NotificationStats {
    const notifications = this.getNotifications();
    const unreadCount = notifications.filter((n) => !n.isRead).length;

    const byType: Record<NotificationType, number> = {
      all: notifications.length,
      activity: notifications.filter((n) => n.type === "activity").length,
      social: notifications.filter(
        (n) => n.type === "social" || n.type === "message"
      ).length,
      system: notifications.filter((n) => n.type === "system").length,
    };

    return {
      total: notifications.length,
      unread: unreadCount,
      byType,
    };
  }

  // 标记为已读
  markAsRead(id: string): void {
    const notification = this.notifications.find((n) => n.id === id);
    if (notification && !notification.isRead) {
      notification.isRead = true;
      notification.updatedAt = new Date().toISOString();
      this.notifyListeners();
    }
  }

  // 标记所有为已读
  markAllAsRead(): void {
    let hasChanges = false;
    this.notifications.forEach((notification) => {
      if (!notification.isRead) {
        notification.isRead = true;
        notification.updatedAt = new Date().toISOString();
        hasChanges = true;
      }
    });
    if (hasChanges) {
      this.notifyListeners();
    }
  }

  // 清空所有通知
  clearAllNotifications(): void {
    if (this.notifications.length > 0) {
      this.notifications = [];
      this.notifyListeners();
    }
  }

  // 删除单个通知
  deleteNotification(id: string): void {
    const index = this.notifications.findIndex((n) => n.id === id);
    if (index !== -1) {
      this.notifications.splice(index, 1);
      this.notifyListeners();
    }
  }

  // 添加监听器
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  // 通知监听器
  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener());
  }
}

// 单例实例
export const notificationService = new NotificationService();

// 导出服务方法
export const {
  getNotifications,
  getNotificationsByType,
  getStats,
  markAsRead,
  markAllAsRead,
  clearAllNotifications,
  deleteNotification,
  subscribe,
} = notificationService;
