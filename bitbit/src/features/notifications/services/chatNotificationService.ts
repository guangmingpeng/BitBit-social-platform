/**
 * 聊天通知生成服务
 * 从聊天数据中动态生成准确的消息通知
 */

import type { Message } from "@/features/chat/types";
import type { User } from "@/types";
import type { Notification } from "@/features/notifications/types";
import { mockConversations } from "@/features/chat/mock/conversations";
import { mockMessages } from "@/features/chat/mock/messages";
import { mockUsers } from "@/features/chat/mock/users";

export interface ChatNotificationData {
  conversationId: string;
  conversationTitle: string;
  conversationType: "private" | "group" | "activity";
  conversationAvatar?: string;
  unreadCount: number;
  lastMessage: Message;
  lastSender: User;
  lastReadAt: Date;
}

export class ChatNotificationService {
  /**
   * 获取指定用户的所有未读消息通知数据
   */
  static getUnreadChatNotifications(
    currentUserId: string
  ): ChatNotificationData[] {
    const unreadNotifications: ChatNotificationData[] = [];

    mockConversations.forEach((conversation) => {
      const currentUserParticipant = conversation.participants.find(
        (p) => p.userId === currentUserId
      );

      if (!currentUserParticipant?.lastReadAt) {
        return; // 如果没有阅读记录，跳过
      }

      // 获取该会话的所有消息，按时间排序
      const conversationMessages = mockMessages
        .filter((msg) => msg.conversationId === conversation.id)
        .sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );

      if (conversationMessages.length === 0) {
        return; // 没有消息，跳过
      }

      // 计算未读消息（排除自己发送的）
      const unreadMessages = conversationMessages.filter(
        (msg) =>
          new Date(msg.timestamp) >
            new Date(currentUserParticipant.lastReadAt!) &&
          msg.senderId !== currentUserId
      );

      if (unreadMessages.length > 0) {
        const lastMessage =
          conversationMessages[conversationMessages.length - 1];
        const lastSender = mockUsers[lastMessage.senderId];

        if (lastSender) {
          unreadNotifications.push({
            conversationId: conversation.id,
            conversationTitle: conversation.title || `会话${conversation.id}`,
            conversationType: conversation.type,
            conversationAvatar: conversation.avatar,
            unreadCount: unreadMessages.length,
            lastMessage,
            lastSender,
            lastReadAt: new Date(currentUserParticipant.lastReadAt),
          });
        }
      }
    });

    // 按最新消息时间排序
    return unreadNotifications.sort(
      (a, b) =>
        new Date(b.lastMessage.timestamp).getTime() -
        new Date(a.lastMessage.timestamp).getTime()
    );
  }

  /**
   * 生成聚合消息通知
   */
  static generateAggregatedNotification(
    currentUserId: string
  ): Notification | null {
    const unreadNotifications = this.getUnreadChatNotifications(currentUserId);

    if (unreadNotifications.length === 0) {
      return null; // 没有未读消息
    }

    const totalUnreadCount = unreadNotifications.reduce(
      (sum, notif) => sum + notif.unreadCount,
      0
    );
    const latestNotification = unreadNotifications[0]; // 已按时间排序，第一个是最新的

    // 生成通知内容
    let content = "";
    let actionUrl = "";

    if (unreadNotifications.length === 1 && totalUnreadCount === 1) {
      // 单个会话，单条消息
      if (latestNotification.conversationType === "private") {
        content = `${latestNotification.lastSender.name}: ${latestNotification.lastMessage.content}`;
        actionUrl = `/messages/chat/${latestNotification.lastSender.id}`;
      } else {
        // 群聊消息显示群聊名称和消息内容
        content = `${latestNotification.conversationTitle}: ${latestNotification.lastMessage.content}`;
        actionUrl = `/messages/conversation/${latestNotification.conversationId}`;
      }
    } else if (unreadNotifications.length === 1) {
      // 单个会话，多条消息
      if (latestNotification.conversationType === "private") {
        content = `${latestNotification.lastSender.name}发来${totalUnreadCount}条新消息`;
        actionUrl = `/messages/chat/${latestNotification.lastSender.id}`;
      } else {
        // 群聊消息显示群聊名称
        content = `${latestNotification.conversationTitle} 有${totalUnreadCount}条新消息`;
        actionUrl = `/messages/conversation/${latestNotification.conversationId}`;
      }
    } else {
      // 多个会话，需要区分私聊和群聊
      const privateChats = unreadNotifications.filter(
        (n) => n.conversationType === "private"
      );
      const groupChats = unreadNotifications.filter(
        (n) => n.conversationType !== "private"
      );

      if (groupChats.length === 0) {
        // 只有私聊
        content = `${privateChats.length}个联系人发来${totalUnreadCount}条新消息`;
        actionUrl = `/messages/chat/${latestNotification.lastSender.id}`;
      } else if (privateChats.length === 0) {
        // 只有群聊
        content = `${groupChats.length}个群聊有${totalUnreadCount}条新消息`;
        actionUrl = `/messages/conversation/${latestNotification.conversationId}`;
      } else {
        // 混合情况
        content = `${privateChats.length}个联系人、${groupChats.length}个群聊发来${totalUnreadCount}条新消息`;
        // 使用最新消息的会话类型决定导航
        if (latestNotification.conversationType === "private") {
          actionUrl = `/messages/chat/${latestNotification.lastSender.id}`;
        } else {
          actionUrl = `/messages/conversation/${latestNotification.conversationId}`;
        }
      }
    }

    // 构建发送者列表（用于详细显示）
    const senders = unreadNotifications.map((notif) => ({
      userId:
        notif.conversationType === "private"
          ? notif.lastSender.id
          : notif.conversationId,
      userName:
        notif.conversationType === "private"
          ? notif.lastSender.name || `用户${notif.lastSender.id}`
          : notif.conversationTitle,
      userAvatar:
        notif.conversationType === "private"
          ? notif.lastSender.avatar
          : undefined, // 群聊使用默认头像
      lastMessage: notif.lastMessage.content,
      timestamp: notif.lastMessage.timestamp.toISOString(),
      isGroup: notif.conversationType !== "private", // 标记是否为群聊
    }));

    return {
      id: `message-notification-${Date.now()}`,
      type: "message",
      title: "新消息",
      content,
      time: this.formatTimeAgo(latestNotification.lastMessage.timestamp),
      isRead: false,
      avatar:
        latestNotification.conversationType === "private"
          ? latestNotification.lastSender.avatar
          : latestNotification.conversationAvatar || "🏠", // 群聊使用群聊头像或默认emoji
      actionUrl,
      createdAt: latestNotification.lastMessage.timestamp.toISOString(),
      messageData: {
        senders,
        totalCount: totalUnreadCount,
        lastSenderName:
          latestNotification.lastSender.name ||
          `用户${latestNotification.lastSender.id}`,
        lastMessage: latestNotification.lastMessage.content,
        lastSenderId: latestNotification.lastSender.id,
        lastSenderAvatar: latestNotification.lastSender.avatar,
      },
    };
  }

  /**
   * 格式化时间显示
   */
  private static formatTimeAgo(timestamp: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) {
      return "刚刚";
    } else if (diffMinutes < 60) {
      return `${diffMinutes}分钟前`;
    } else if (diffHours < 24) {
      return `${diffHours}小时前`;
    } else {
      return `${diffDays}天前`;
    }
  }

  /**
   * 获取最佳的导航目标
   * 根据未读消息情况决定导航到消息列表还是特定会话
   */
  static getBestNavigationTarget(currentUserId: string): {
    url: string;
    state?: Record<string, unknown>;
  } {
    const unreadNotifications = this.getUnreadChatNotifications(currentUserId);

    if (unreadNotifications.length === 0) {
      return { url: "/chat", state: { isListMode: true } }; // 没有未读消息，进入聊天列表模式
    }

    if (unreadNotifications.length === 1) {
      // 只有一个会话有未读消息，直接进入该会话
      const notification = unreadNotifications[0];
      if (notification.conversationType === "private") {
        return {
          url: `/messages/chat/${notification.lastSender.id}`,
          state: {
            fromSource: "notifications",
            conversationId: notification.conversationId,
            shouldHighlightUnread: true,
          },
        };
      } else {
        return {
          url: `/messages/conversation/${notification.conversationId}`,
          state: {
            fromSource: "notifications",
            conversationId: notification.conversationId,
            shouldHighlightUnread: true,
          },
        };
      }
    }

    // 多个会话有未读消息，使用最新消息的会话
    const latestNotification = unreadNotifications[0];
    if (latestNotification.conversationType === "private") {
      return {
        url: `/messages/chat/${latestNotification.lastSender.id}`,
        state: {
          fromSource: "notifications",
          messageNotification:
            this.generateAggregatedNotification(currentUserId)?.messageData,
          showUnreadOnly: true,
        },
      };
    } else {
      return {
        url: `/messages/conversation/${latestNotification.conversationId}`,
        state: {
          fromSource: "notifications",
          messageNotification:
            this.generateAggregatedNotification(currentUserId)?.messageData,
          showUnreadOnly: true,
        },
      };
    }
  }
}

export default ChatNotificationService;
