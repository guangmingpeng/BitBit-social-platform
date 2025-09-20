import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import type {
  Conversation,
  Message,
  ParticipantRole,
} from "@/features/chat/types";
import {
  mockConversations,
  mockMessages,
  mockUsers,
} from "@/features/chat/mock";

export interface UseChatStateOptions {
  currentUserId: string;
  initialConversationId?: string;
}

export interface UseChatStateReturn {
  // 状态
  conversations: Conversation[];
  messages: Message[];
  activeConversationId: string | null;
  showSettings: boolean;
  presetMessage: string;

  // 计算属性
  activeConversation: Conversation | undefined;
  unreadMessages: Message[];
  hasUnreadMessages: boolean;
  lastReadMessageId: string | null;
  updatedConversations: Conversation[];

  // 实时新消息相关
  realtimeNewMessages: Message[];
  hasRealtimeNewMessages: boolean;
  isUserAtBottom: boolean;

  // 操作方法
  setActiveConversationId: (id: string | null) => void;
  setShowSettings: (show: boolean) => void;
  setPresetMessage: (message: string) => void;
  setUserAtBottom: (isAtBottom: boolean) => void;
  clearRealtimeNewMessages: () => void;
  handleConversationClick: (conversationId: string) => void;
  markConversationAsRead: (conversationId: string) => void;
  markAllAsRead: () => void;
  handleSendMessage: (
    content: string,
    type?: "text" | "image" | "emoji",
    imageFile?: File
  ) => void;
  simulateNewMessage: (senderId?: string, content?: string) => void;
  simulateMultipleMessages: (count?: number) => void;
  createOrFindConversationWithUser: (
    userId: string,
    userInfo?: { name: string; avatar?: string }
  ) => Promise<string>;
  switchToConversation: (conversationId: string) => void;

  // 群组设置方法
  handleToggleInvitePermission: (conversationId: string) => void;
  handleToggleFileSharing: (conversationId: string) => void;
  handleToggleNotifications: (conversationId: string) => void;
  handleMemberRoleChange: (
    conversationId: string,
    userId: string,
    newRole: string
  ) => void;
  handleRemoveMember: (conversationId: string, userId: string) => void;
  handleDismissGroup: (conversationId: string) => void;
  handleClearChatHistory: (conversationId: string) => void;

  // 会话管理方法
  handleTogglePin: (conversationId: string) => void;
  handleToggleReadStatus: (conversationId: string) => void;
  handleDeleteConversation: (conversationId: string) => void;

  // 获取消息的方法
  getCurrentMessages: () => Message[];
  getConversationUnreadCount: (conversation: Conversation) => number;
  getTotalUnreadCount: () => number;
}

export function useChatState({
  currentUserId,
  initialConversationId = "conv1",
}: UseChatStateOptions): UseChatStateReturn {
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(initialConversationId);

  // 初始化时对conversations按最后活动时间排序
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    return [...mockConversations].sort((a, b) => {
      // 置顶的对话始终在前面
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;

      // 都置顶的话，按置顶时间排序（最近置顶的在前）
      if (a.isPinned && b.isPinned) {
        const aPinnedTime = a.pinnedAt ? new Date(a.pinnedAt).getTime() : 0;
        const bPinnedTime = b.pinnedAt ? new Date(b.pinnedAt).getTime() : 0;
        return bPinnedTime - aPinnedTime;
      }

      // 都不置顶的话，按最后活动时间排序（最新的在前）
      const aTime = a.lastMessage
        ? new Date(a.lastMessage.timestamp).getTime()
        : new Date(a.lastActivity).getTime();
      const bTime = b.lastMessage
        ? new Date(b.lastMessage.timestamp).getTime()
        : new Date(b.lastActivity).getTime();

      return bTime - aTime; // 最新的在前
    });
  });
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [showSettings, setShowSettings] = useState(false);
  const [presetMessage, setPresetMessageState] = useState<string>("");

  // 新增：实时新消息跟踪
  const [realtimeNewMessages, setRealtimeNewMessages] = useState<Message[]>([]);
  const [isUserAtBottom, setIsUserAtBottom] = useState<boolean>(true);
  const lastMessageCountRef = useRef<number>(0);

  // 跟踪最后一次操作类型，用于控制排序行为
  const [lastOperationType, setLastOperationType] = useState<
    "message" | "pin" | "read-status" | "delete" | null
  >(null);

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  // 计算未读消息（排除自己发送的消息）
  const getUnreadMessages = useCallback(() => {
    if (!activeConversation) return [];

    const currentUserParticipant = activeConversation.participants.find(
      (p) => p.userId === currentUserId
    );

    if (!currentUserParticipant?.lastReadAt)
      return messages.filter((m) => m.senderId !== currentUserId);

    // 找到用户最后阅读时间之后的消息，但排除自己发送的
    return messages.filter(
      (m) =>
        m.conversationId === activeConversationId &&
        new Date(m.timestamp) > new Date(currentUserParticipant.lastReadAt!) &&
        m.senderId !== currentUserId // 排除自己发送的消息
    );
  }, [activeConversation, activeConversationId, currentUserId, messages]);

  // 获取最后阅读的消息ID
  const getLastReadMessageId = useCallback(() => {
    if (!activeConversation) return null;

    const currentUserParticipant = activeConversation.participants.find(
      (p) => p.userId === currentUserId
    );

    if (!currentUserParticipant?.lastReadAt) {
      return null;
    }

    // 找到当前会话的所有消息，按时间排序
    const conversationMessages = messages
      .filter((m) => m.conversationId === activeConversationId)
      .sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );

    // 找到lastReadAt时间点之前的所有消息
    const lastReadTime = new Date(currentUserParticipant.lastReadAt!).getTime();

    // 找到最后一条在lastReadAt时间之前或等于的消息
    let lastReadMessage = null;
    for (let i = conversationMessages.length - 1; i >= 0; i--) {
      const message = conversationMessages[i];
      const messageTime = new Date(message.timestamp).getTime();

      if (messageTime <= lastReadTime) {
        lastReadMessage = message;
        break;
      }
    }

    const result = lastReadMessage ? lastReadMessage.id : null;

    return result;
  }, [activeConversation, activeConversationId, currentUserId, messages]);

  // 计算会话的真实未读消息数量（排除自己发送的）
  const getConversationUnreadCount = useCallback(
    (conversation: Conversation) => {
      const currentUserParticipant = conversation.participants.find(
        (p) => p.userId === currentUserId
      );

      const conversationMessages = messages.filter(
        (m) =>
          m.conversationId === conversation.id && m.senderId !== currentUserId
      );

      if (!currentUserParticipant?.lastReadAt) {
        // 如果没有阅读记录，计算所有非自己发送的消息
        return conversationMessages.length;
      }

      // 计算最后阅读时间之后的非自己发送的消息
      const unreadMessages = messages.filter(
        (m) =>
          m.conversationId === conversation.id &&
          new Date(m.timestamp) >
            new Date(currentUserParticipant.lastReadAt!) &&
          m.senderId !== currentUserId
      );

      return unreadMessages.length;
    },
    [currentUserId, messages]
  );

  const unreadMessages = getUnreadMessages();
  const hasUnreadMessages = unreadMessages.length > 0;
  const lastReadMessageId = getLastReadMessageId();

  // 计算带有未读计数的会话列表，但不强制排序
  const conversationsWithUnreadCount = useMemo(() => {
    return conversations.map((conv) => ({
      ...conv,
      unreadCount: getConversationUnreadCount(conv),
    }));
  }, [conversations, getConversationUnreadCount]);

  // 计算实时新消息（用户在当前会话中，且不在底部时收到的新消息）
  const hasRealtimeNewMessages = realtimeNewMessages.length > 0;

  // 当切换会话时重置实时新消息
  useEffect(() => {
    setRealtimeNewMessages([]);
    lastMessageCountRef.current = messages.filter(
      (m) => m.conversationId === activeConversationId
    ).length;
  }, [activeConversationId, messages]);

  // 检测新消息到达
  useEffect(() => {
    if (!activeConversationId) return;

    const currentMessages = messages.filter(
      (m) => m.conversationId === activeConversationId
    );
    const newMessageCount = currentMessages.length;
    const previousCount = lastMessageCountRef.current;

    if (newMessageCount > previousCount) {
      // 有新消息到达
      const newMessages = currentMessages.slice(previousCount);
      const newNonSelfMessages = newMessages.filter(
        (m) => m.senderId !== currentUserId
      );

      if (newNonSelfMessages.length > 0 && !isUserAtBottom) {
        // 用户不在底部且有新的非自己的消息，添加到实时新消息列表
        setRealtimeNewMessages((prev) => [...prev, ...newNonSelfMessages]);
      }
    }

    lastMessageCountRef.current = newMessageCount;
  }, [messages, activeConversationId, currentUserId, isUserAtBottom]);

  // 重置操作类型，防止一直保持某种排序行为
  useEffect(() => {
    if (lastOperationType === "read-status") {
      // 对于标记已读/未读操作，立即重置，确保下次排序时正常排序
      const timer = setTimeout(() => {
        setLastOperationType(null);
      }, 50);
      return () => clearTimeout(timer);
    }

    if (lastOperationType === "pin") {
      // 对于置顶操作，延迟一点重置，确保排序完成
      const timer = setTimeout(() => {
        setLastOperationType(null);
      }, 500);
      return () => clearTimeout(timer);
    }

    if (lastOperationType) {
      // 对于其他操作，稍后重置
      const timer = setTimeout(() => {
        setLastOperationType(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [lastOperationType]);

  // 用户滚动状态更新方法
  const setUserAtBottom = useCallback((atBottom: boolean) => {
    setIsUserAtBottom(atBottom);
    if (atBottom) {
      // 用户滚动到底部时清除实时新消息
      setRealtimeNewMessages([]);
    }
  }, []);

  // 清除实时新消息
  const clearRealtimeNewMessages = useCallback(() => {
    setRealtimeNewMessages([]);
  }, []);

  // 计算总未读消息数
  const getTotalUnreadCount = useCallback(() => {
    return conversationsWithUnreadCount.reduce(
      (total: number, conv) => total + conv.unreadCount,
      0
    );
  }, [conversationsWithUnreadCount]);

  // 标记会话为已读
  const markConversationAsRead = useCallback(
    (conversationId: string) => {
      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === conversationId) {
            // 更新参与者的最后阅读时间
            const updatedParticipants = conv.participants.map((p) => {
              if (p.userId === currentUserId) {
                return {
                  ...p,
                  lastReadAt: new Date(),
                };
              }
              return p;
            });

            return {
              ...conv,
              participants: updatedParticipants,
            };
          }
          return conv;
        })
      );
    },
    [currentUserId]
  );

  // 标记所有会话为已读
  const markAllAsRead = useCallback(() => {
    setConversations((prev) =>
      prev.map((conv) => {
        // 更新参与者的最后阅读时间
        const updatedParticipants = conv.participants.map((p) => {
          if (p.userId === currentUserId) {
            return {
              ...p,
              lastReadAt: new Date(),
            };
          }
          return p;
        });

        return {
          ...conv,
          participants: updatedParticipants,
        };
      })
    );
  }, [currentUserId]);

  // 处理会话点击
  const handleConversationClick = useCallback(
    (conversationId: string) => {
      // 如果当前有活跃会话且不同于新选择的会话，先标记当前会话为已读
      if (activeConversationId && activeConversationId !== conversationId) {
        markConversationAsRead(activeConversationId);
      }

      setActiveConversationId(conversationId);
      setShowSettings(false);
    },
    [activeConversationId, markConversationAsRead]
  );

  // 处理发送消息
  const handleSendMessage = useCallback(
    (
      content: string,
      type: "text" | "image" | "emoji" = "text",
      imageFile?: File
    ) => {
      if (!activeConversationId) return;

      const messageType: "text" | "image" = type === "emoji" ? "text" : type;

      const messageContent = content;
      let attachments: Array<{
        id: string;
        type: "image" | "file";
        url: string;
        name: string;
        size: number;
        mimeType: string;
      }> = [];

      // 处理图片文件
      if (messageType === "image" && imageFile) {
        // 创建临时 URL 用于显示
        const imageUrl = URL.createObjectURL(imageFile);
        attachments = [
          {
            id: `attachment_${Date.now()}`,
            type: "image",
            url: imageUrl,
            name: imageFile.name,
            size: imageFile.size,
            mimeType: imageFile.type,
          },
        ];
        // 图片消息不需要默认文本，保持原有内容（可能为空）
      }

      const newMessage: Message = {
        id: `msg_${Date.now()}`,
        content: messageContent,
        senderId: currentUserId,
        conversationId: activeConversationId,
        timestamp: new Date(),
        type: messageType,
        status: "sent",
        ...(attachments.length > 0 && { attachments }),
      };

      setLastOperationType("message");
      setMessages((prev) => [...prev, newMessage]);

      // 更新会话的最后消息并重新排序
      setConversations((prev) => {
        const updated = prev.map((conv) => {
          if (conv.id === activeConversationId) {
            const now = new Date();
            return {
              ...conv,
              lastMessage: newMessage,
              lastActivity: now,
              // 如果是置顶会话，也更新置顶时间，确保有新消息的置顶会话排在最前面
              ...(conv.isPinned && { pinnedAt: now }),
            };
          }
          return conv;
        });

        // 对置顶会话进行排序：有新消息的置顶会话应该排在最前面
        const sorted = updated.sort((a, b) => {
          const aIsPinned = a.isPinned;
          const bIsPinned = b.isPinned;

          // 置顶优先
          if (aIsPinned && !bIsPinned) return -1;
          if (!aIsPinned && bIsPinned) return 1;

          if (aIsPinned && bIsPinned) {
            // 两个都是置顶的情况：按最新消息时间排序（最新的在前）
            return (
              new Date(b.lastActivity).getTime() -
              new Date(a.lastActivity).getTime()
            );
          }

          // 都不是置顶：按最新消息时间排序
          return (
            new Date(b.lastActivity).getTime() -
            new Date(a.lastActivity).getTime()
          );
        });

        return sorted;
      });
    },
    [activeConversationId, currentUserId]
  );

  // 模拟新消息到达的函数
  const simulateNewMessage = useCallback(
    (senderId?: string, content?: string) => {
      const otherUsers = ["1", "2", "3", "5", "6"].filter(
        (id) => id !== currentUserId
      );
      const defaultSenderId =
        senderId || otherUsers[Math.floor(Math.random() * otherUsers.length)];
      const defaultContent = content || "这是一条模拟的新消息 📩";

      const newMessage: Message = {
        id: `msg_sim_${Date.now()}`,
        content: defaultContent,
        senderId: defaultSenderId,
        conversationId: activeConversationId || "conv1",
        timestamp: new Date(),
        type: "text",
        status: "delivered",
      };

      setLastOperationType("message");
      setMessages((prev) => [...prev, newMessage]);

      // 更新会话的最后消息并重新排序
      setConversations((prev) => {
        const updated = prev.map((conv) => {
          const targetConvId = activeConversationId || "conv1";
          if (conv.id === targetConvId) {
            const now = new Date();
            return {
              ...conv,
              lastMessage: newMessage,
              lastActivity: now,
              // 如果是置顶会话，也更新置顶时间，确保有新消息的置顶会话排在最前面
              ...(conv.isPinned && { pinnedAt: now }),
            };
          }
          return conv;
        });

        // 对置顶会话进行排序：有新消息的置顶会话应该排在最前面
        const sorted = updated.sort((a, b) => {
          const aIsPinned = a.isPinned;
          const bIsPinned = b.isPinned;

          // 置顶优先
          if (aIsPinned && !bIsPinned) return -1;
          if (!aIsPinned && bIsPinned) return 1;

          if (aIsPinned && bIsPinned) {
            // 两个都是置顶的情况：按最新消息时间排序（最新的在前）
            return (
              new Date(b.lastActivity).getTime() -
              new Date(a.lastActivity).getTime()
            );
          }

          // 都不是置顶：按最新消息时间排序
          return (
            new Date(b.lastActivity).getTime() -
            new Date(a.lastActivity).getTime()
          );
        });

        return sorted;
      });
    },
    [activeConversationId, currentUserId]
  );

  // 模拟多条新消息
  const simulateMultipleMessages = useCallback(
    (count = 5) => {
      const otherUsers = ["1", "2", "3", "5", "6"].filter(
        (id) => id !== currentUserId
      );
      const messageList = [
        "大家准备好了吗？",
        "天气预报说明天有小雨，记得带雨具",
        "我已经准备好登山装备了",
        "集合时间是早上8点，不要迟到哦",
        "期待明天的活动！",
        "有人知道具体的路线吗？",
        "我带了相机，可以帮大家拍照",
        "记得带足够的水和食物",
        "安全第一，大家小心",
        "这次活动一定会很有趣！",
      ];

      const selectedMessages = messageList.slice(0, count);

      selectedMessages.forEach((content, index) => {
        setTimeout(() => {
          const senderId = otherUsers[index % otherUsers.length];
          simulateNewMessage(senderId, content);
        }, (index + 1) * 800);
      });
    },
    [currentUserId, simulateNewMessage]
  );

  // 创建或查找与指定用户的对话
  const createOrFindConversationWithUser = useCallback(
    async (
      userId: string,
      userInfo?: { name: string; avatar?: string }
    ): Promise<string> => {
      console.log("查找或创建与用户的会话:", { userId, userInfo });

      // 严格检查是否已存在与该用户的私聊对话
      const existingConversation = conversations.find(
        (conv) =>
          conv.type === "private" &&
          conv.participants.length === 2 && // 确保只有两个参与者
          conv.participants.some((p) => p.userId === currentUserId) && // 包含当前用户
          conv.participants.some((p) => p.userId === userId) // 包含目标用户
      );

      if (existingConversation) {
        console.log("找到已存在的会话:", existingConversation.id);
        return existingConversation.id;
      }

      console.log("创建新会话，目标用户:", userId);

      // 获取用户信息
      const targetUser = mockUsers[userId] || {
        id: userId,
        username: `user${userId}`,
        email: `user${userId}@example.com`,
        name: userInfo?.name || `用户${userId}`,
        avatar: userInfo?.avatar,
        bio: "",
        location: "",
        profession: "",
        age: 0,
        isOnline: false,
      };

      const currentUser = mockUsers[currentUserId];

      // 创建新的私聊对话 - 使用更唯一的ID生成算法
      const timestamp = Date.now();
      const randomSuffix = Math.random().toString(36).substring(2, 8);
      const newConversationId = `private_${currentUserId}_${userId}_${timestamp}_${randomSuffix}`;

      console.log("生成新会话ID:", newConversationId);

      const newConversation: Conversation = {
        id: newConversationId,
        type: "private",
        title: targetUser.name,
        avatar: targetUser.avatar,
        participants: [
          {
            userId: currentUserId,
            user: currentUser,
            joinedAt: new Date(),
            role: "member",
            isTyping: false,
          },
          {
            userId: userId,
            user: targetUser,
            joinedAt: new Date(),
            role: "member",
            isTyping: false,
          },
        ],
        lastActivity: new Date(),
        unreadCount: 0,
        isArchived: false,
        isMuted: false,
        settings: {
          allowInvites: false,
          allowFileSharing: true,
          allowReactions: true,
          muteNotifications: false,
        },
      };

      setConversations((prev) => [newConversation, ...prev]);

      console.log("新会话已创建:", {
        conversationId: newConversationId,
        participants: newConversation.participants.map((p) => ({
          id: p.userId,
          name: p.user.name,
        })),
        isNewConversation: true,
        hasHistoryMessages: false,
      });

      return newConversationId;
    },
    [conversations, currentUserId]
  );

  // 切换到指定对话
  const switchToConversation = useCallback(
    (conversationId: string) => {
      const conversation = conversations.find((c) => c.id === conversationId);

      if (conversation) {
        console.log("切换到会话:", {
          conversationId,
          type: conversation.type,
          title: conversation.title,
          participantCount: conversation.participants.length,
          lastMessage: conversation.lastMessage?.content || "暂无消息",
          hasHistory: !!conversation.lastMessage,
        });

        // 检查是否是历史会话（有lastMessage）还是新会话
        const isHistoryConversation = !!conversation.lastMessage;
        const messageCount = messages.filter(
          (m) => m.conversationId === conversationId
        ).length;

        console.log(
          `会话状态: ${
            isHistoryConversation ? "历史会话" : "新会话"
          }, 消息数量: ${messageCount}`
        );
      }

      setActiveConversationId(conversationId);
    },
    [conversations, messages]
  );

  // 设置预设消息
  const setPresetMessage = useCallback((message: string) => {
    setPresetMessageState(message);
    // 设置后清空，避免重复设置
    setTimeout(() => setPresetMessageState(""), 100);
  }, []);

  // 群组设置相关方法
  const handleToggleInvitePermission = useCallback((conversationId: string) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              settings: {
                ...conv.settings,
                allowInvites: !conv.settings.allowInvites,
              },
            }
          : conv
      )
    );
  }, []);

  const handleToggleFileSharing = useCallback((conversationId: string) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              settings: {
                ...conv.settings,
                allowFileSharing: !conv.settings.allowFileSharing,
              },
            }
          : conv
      )
    );
  }, []);

  const handleToggleNotifications = useCallback((conversationId: string) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              settings: {
                ...conv.settings,
                muteNotifications: !conv.settings.muteNotifications,
              },
            }
          : conv
      )
    );
  }, []);

  // 处理置顶/取消置顶
  const handleTogglePin = useCallback((conversationId: string) => {
    setLastOperationType("pin");
    setConversations((prev) => {
      // 更新会话状态
      const updated = prev.map((conv) => {
        if (conv.id === conversationId) {
          const isPinned = conv.isPinned;
          const newConv = {
            ...conv,
            isPinned: !isPinned,
            pinnedAt: !isPinned ? new Date() : undefined,
          };
          return newConv;
        }
        return conv;
      });

      // 立即进行排序：置顶的会话应该立即排到最前面
      const sorted = updated.sort((a, b) => {
        const aIsPinned = a.isPinned;
        const bIsPinned = b.isPinned;

        // 置顶优先
        if (aIsPinned && !bIsPinned) return -1;
        if (!aIsPinned && bIsPinned) return 1;

        if (aIsPinned && bIsPinned) {
          // 两个都是置顶的情况：按置顶时间排序（最近置顶的在前）
          const aPinnedAt = a.pinnedAt ? new Date(a.pinnedAt).getTime() : 0;
          const bPinnedAt = b.pinnedAt ? new Date(b.pinnedAt).getTime() : 0;
          return bPinnedAt - aPinnedAt;
        }

        // 都不是置顶：按最新消息时间排序
        return (
          new Date(b.lastActivity).getTime() -
          new Date(a.lastActivity).getTime()
        );
      });

      return sorted;
    });
  }, []);

  // 处理标记已读/未读
  const handleToggleReadStatus = useCallback(
    (conversationId: string) => {
      setLastOperationType("read-status");

      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === conversationId) {
            const currentUserParticipant = conv.participants.find(
              (p) => p.userId === currentUserId
            );

            if (!currentUserParticipant) {
              return conv;
            }

            // 使用动态计算的未读数来判断当前状态
            const currentUnreadCount = getConversationUnreadCount(conv);
            const isCurrentlyUnread = currentUnreadCount > 0;

            // 更新参与者的最后阅读时间
            const updatedParticipants = conv.participants.map((p) => {
              if (p.userId === currentUserId) {
                if (isCurrentlyUnread) {
                  // 标记为已读：将最后阅读时间设置为当前时间
                  return { ...p, lastReadAt: new Date() };
                } else {
                  // 标记为未读：需要找到一个合适的时间点来制造未读状态
                  const conversationMessages = messages.filter(
                    (m) =>
                      m.conversationId === conversationId &&
                      m.senderId !== currentUserId
                  );

                  if (conversationMessages.length > 0) {
                    // 将最后阅读时间设置为倒数第二条其他人的消息时间（如果存在）
                    // 这样最后一条消息就会变成未读
                    const sortedMessages = conversationMessages.sort(
                      (a, b) =>
                        new Date(a.timestamp).getTime() -
                        new Date(b.timestamp).getTime()
                    );

                    let targetTime: Date;
                    if (sortedMessages.length >= 2) {
                      // 有至少2条消息，设置为倒数第二条消息的时间
                      targetTime = new Date(
                        sortedMessages[sortedMessages.length - 2].timestamp
                      );
                    } else {
                      // 只有1条消息，设置为比这条消息早1秒
                      targetTime = new Date(
                        sortedMessages[0].timestamp.getTime() - 1000
                      );
                    }

                    return { ...p, lastReadAt: targetTime };
                  } else {
                    // 没有其他人的消息，无法标记为未读
                    return p;
                  }
                }
              }
              return p;
            });

            // 只更新participants，移除unreadCount的直接设置
            // 让动态计算来处理未读数显示
            return {
              ...conv,
              participants: updatedParticipants,
            };
          }
          return conv;
        })
      );
    },
    [currentUserId, getConversationUnreadCount, messages]
  );

  // 处理删除会话
  const handleDeleteConversation = useCallback(
    (conversationId: string) => {
      setLastOperationType("delete");
      setConversations((prev) =>
        prev.filter((conv) => conv.id !== conversationId)
      );
      // 如果删除的是当前活跃会话，清空活跃会话
      if (activeConversationId === conversationId) {
        setActiveConversationId(null);
      }
    },
    [activeConversationId]
  );

  const handleMemberRoleChange = useCallback(
    (conversationId: string, userId: string, newRole: string) => {
      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === conversationId) {
            const updatedParticipants = conv.participants.map((p) =>
              p.userId === userId
                ? { ...p, role: newRole as ParticipantRole }
                : p
            );
            return { ...conv, participants: updatedParticipants };
          }
          return conv;
        })
      );
    },
    []
  );

  const handleRemoveMember = useCallback(
    (conversationId: string, userId: string) => {
      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === conversationId) {
            const updatedParticipants = conv.participants.filter(
              (p) => p.userId !== userId
            );
            return { ...conv, participants: updatedParticipants };
          }
          return conv;
        })
      );
    },
    []
  );

  // 解散群聊
  const handleDismissGroup = useCallback(
    (conversationId: string) => {
      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === conversationId) {
            return {
              ...conv,
              isDismissed: true,
              dismissedAt: new Date(),
              dismissedBy: currentUserId,
            };
          }
          return conv;
        })
      );
    },
    [currentUserId]
  );

  // 清空聊天记录
  const handleClearChatHistory = useCallback((conversationId: string) => {
    // 删除该会话的所有消息
    setMessages((prev) =>
      prev.filter((message) => message.conversationId !== conversationId)
    );

    // 清空实时新消息
    setRealtimeNewMessages((prev) =>
      prev.filter((message) => message.conversationId !== conversationId)
    );

    // 更新会话的最后消息为undefined
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            lastMessage: undefined,
            unreadCount: 0,
          };
        }
        return conv;
      })
    );
  }, []);

  // 获取当前会话的消息
  const getCurrentMessages = useCallback(() => {
    return messages.filter((m) => m.conversationId === activeConversationId);
  }, [messages, activeConversationId]);

  return {
    // 状态
    conversations,
    messages,
    activeConversationId,
    showSettings,
    presetMessage,

    // 计算属性
    activeConversation,
    unreadMessages,
    hasUnreadMessages,
    lastReadMessageId,
    updatedConversations: conversationsWithUnreadCount,

    // 实时新消息相关
    realtimeNewMessages,
    hasRealtimeNewMessages,
    isUserAtBottom,

    // 操作方法
    setActiveConversationId,
    setShowSettings,
    setPresetMessage,
    setUserAtBottom,
    clearRealtimeNewMessages,
    handleConversationClick,
    markConversationAsRead,
    markAllAsRead,
    handleSendMessage,
    simulateNewMessage,
    simulateMultipleMessages,
    createOrFindConversationWithUser,
    switchToConversation,

    // 群组设置方法
    handleToggleInvitePermission,
    handleToggleFileSharing,
    handleToggleNotifications,
    handleMemberRoleChange,
    handleRemoveMember,
    handleDismissGroup,
    handleClearChatHistory,

    // 会话管理方法
    handleTogglePin,
    handleToggleReadStatus,
    handleDeleteConversation,

    // 获取消息的方法
    getCurrentMessages,
    getConversationUnreadCount,
    getTotalUnreadCount,
  };
}
