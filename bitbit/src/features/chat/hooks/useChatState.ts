import { useState, useCallback, useRef, useEffect } from "react";
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
  const [conversations, setConversations] =
    useState<Conversation[]>(mockConversations);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [showSettings, setShowSettings] = useState(false);
  const [presetMessage, setPresetMessageState] = useState<string>("");

  // 新增：实时新消息跟踪
  const [realtimeNewMessages, setRealtimeNewMessages] = useState<Message[]>([]);
  const [isUserAtBottom, setIsUserAtBottom] = useState<boolean>(true);
  const lastMessageCountRef = useRef<number>(0);

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

    // 只在切换会话时输出关键信息
    if (result) {
      console.log(`💬 会话${activeConversationId}: 最后已读消息 ${result}`);
    } else {
      console.log(`💬 会话${activeConversationId}: 没有已读消息`);
    }

    return result;
  }, [activeConversation, activeConversationId, currentUserId, messages]);

  // 计算会话的真实未读消息数量（排除自己发送的）
  const getConversationUnreadCount = useCallback(
    (conversation: Conversation) => {
      const currentUserParticipant = conversation.participants.find(
        (p) => p.userId === currentUserId
      );

      if (!currentUserParticipant?.lastReadAt) {
        // 如果没有阅读记录，计算所有非自己发送的消息
        return messages.filter(
          (m) =>
            m.conversationId === conversation.id && m.senderId !== currentUserId
        ).length;
      }

      // 计算最后阅读时间之后的非自己发送的消息
      return messages.filter(
        (m) =>
          m.conversationId === conversation.id &&
          new Date(m.timestamp) >
            new Date(currentUserParticipant.lastReadAt!) &&
          m.senderId !== currentUserId
      ).length;
    },
    [currentUserId, messages]
  );

  // 获取更新后的会话列表（带有正确的未读计数）
  const getUpdatedConversations = useCallback(() => {
    const updated = conversations.map((conv) => ({
      ...conv,
      unreadCount: getConversationUnreadCount(conv),
    }));

    // 排序：置顶的在前，然后按最新消息时间排序
    return updated.sort((a, b) => {
      // 置顶优先
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;

      // 时间排序，最新的在前
      return (
        new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime()
      );
    });
  }, [conversations, getConversationUnreadCount]);

  const unreadMessages = getUnreadMessages();
  const hasUnreadMessages = unreadMessages.length > 0;
  const lastReadMessageId = getLastReadMessageId();
  const updatedConversations = getUpdatedConversations();

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
    return updatedConversations.reduce(
      (total, conv) => total + conv.unreadCount,
      0
    );
  }, [updatedConversations]);

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
              unreadCount: 0,
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
          unreadCount: 0,
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

      let messageContent = content;
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
        // 如果没有文字内容，设置默认内容
        if (!content.trim()) {
          messageContent = "[图片]";
        }
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

      setMessages((prev) => [...prev, newMessage]);

      // 更新会话的最后消息
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId
            ? { ...conv, lastMessage: newMessage, lastActivity: new Date() }
            : conv
        )
      );
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

      setMessages((prev) => [...prev, newMessage]);

      // 更新会话的最后消息
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === (activeConversationId || "conv1")
            ? { ...conv, lastMessage: newMessage, lastActivity: new Date() }
            : conv
        )
      );
    },
    [activeConversationId, currentUserId]
  );

  // 模拟多条新消息
  const simulateMultipleMessages = useCallback(
    (count = 5) => {
      console.log("🚀 开始模拟", count, "条新消息");
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
          console.log(`📨 模拟消息 ${index + 1}/${count}:`, {
            senderId,
            content,
          });
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
      // 检查是否已存在与该用户的私聊对话
      const existingConversation = conversations.find(
        (conv) =>
          conv.type === "private" &&
          conv.participants.some((p) => p.userId === userId)
      );

      if (existingConversation) {
        return existingConversation.id;
      }

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

      // 创建新的私聊对话
      const newConversationId = `conv_${Date.now()}_${userId}`;
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
      return newConversationId;
    },
    [conversations, currentUserId]
  );

  // 切换到指定对话
  const switchToConversation = useCallback((conversationId: string) => {
    setActiveConversationId(conversationId);
  }, []);

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
    updatedConversations,

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

    // 获取消息的方法
    getCurrentMessages,
    getConversationUnreadCount,
    getTotalUnreadCount,
  };
}
