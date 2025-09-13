import { useState, useImperativeHandle, forwardRef } from "react";
import ConversationList from "./ConversationList";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import GroupSettings from "./GroupSettings";
import type { Conversation, Message } from "@/features/chat/types";
import type { User } from "@/types";
import { cn } from "@/shared/utils/cn";

// 模拟数据
const mockUsers: Record<string, User> = {
  "1": {
    id: "1",
    username: "alice",
    email: "alice@example.com",
    name: "Alice Chen",
    avatar: "https://picsum.photos/60/60?random=1",
    bio: "户外运动组织者，热爱登山和徒步",
    location: "北京",
    profession: "户外运动教练",
    age: 28,
    isOnline: true,
  },
  "2": {
    id: "2",
    username: "bob",
    email: "bob@example.com",
    name: "Bob Wang",
    avatar: "https://picsum.photos/60/60?random=2",
    bio: "摄影爱好者，喜欢记录美好瞬间",
    location: "上海",
    profession: "摄影师",
    age: 32,
    isOnline: false,
  },
  "3": {
    id: "3",
    username: "charlie",
    email: "charlie@example.com",
    name: "Charlie Li",
    avatar: "https://picsum.photos/60/60?random=3",
    bio: "健身达人，马拉松跑者",
    location: "深圳",
    profession: "健身教练",
    age: 26,
    isOnline: true,
  },
  "4": {
    id: "4",
    username: "diana",
    email: "diana@example.com",
    name: "Diana Zhou",
    avatar: "https://picsum.photos/60/60?random=4",
    bio: "瑜伽老师，追求身心平衡",
    location: "杭州",
    profession: "瑜伽导师",
    age: 29,
    isOnline: true,
  },
  "5": {
    id: "5",
    username: "evan",
    email: "evan@example.com",
    name: "Evan Zhang",
    avatar: "https://picsum.photos/60/60?random=5",
    bio: "骑行爱好者，环保主义者",
    location: "成都",
    profession: "环保工程师",
    age: 31,
    isOnline: false,
  },
  "6": {
    id: "6",
    username: "fiona",
    email: "fiona@example.com",
    name: "Fiona Liu",
    avatar: "https://picsum.photos/60/60?random=6",
    bio: "旅行博主，世界探索者",
    location: "广州",
    profession: "旅行博主",
    age: 27,
    isOnline: true,
  },
};

const mockMessages: Message[] = [
  {
    id: "msg1",
    content: "大家好！欢迎参加这次的户外徒步活动！明天天气很好，非常适合登山。",
    senderId: "1",
    conversationId: "conv1",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1天前
    type: "text",
    status: "read",
  },
  {
    id: "msg2",
    content: "太棒了！我已经准备好装备了。Alice，这次路线大概多长？",
    senderId: "2",
    conversationId: "conv1",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20), // 20小时前
    type: "text",
    status: "read",
  },
  {
    id: "msg3",
    content: "路线全程大约12公里，预计用时5-6小时。大家记得带足够的水和食物。",
    senderId: "1",
    conversationId: "conv1",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18), // 18小时前
    type: "text",
    status: "read",
  },
  {
    id: "msg4",
    content: "什么时间开始呢？我可以早点到。",
    senderId: "3",
    conversationId: "conv1",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2小时前
    type: "text",
    status: "delivered",
  },
  {
    id: "msg5",
    content: "明天早上8点在公园门口集合，大家记得穿防滑的登山鞋。",
    senderId: "1",
    conversationId: "conv1",
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1小时前
    type: "text",
    status: "delivered",
  },
  {
    id: "msg6",
    content: "收到！我会准时到达的。需要我带什么公用装备吗？",
    senderId: "4",
    conversationId: "conv1",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30分钟前
    type: "text",
    status: "delivered",
  },
  {
    id: "msg7",
    content: "我可以带急救包和对讲机，大家觉得怎么样？",
    senderId: "5",
    conversationId: "conv1",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15分钟前
    type: "text",
    status: "sent",
  },
  {
    id: "msg8",
    content: "太好了！Evan的提议很棒，安全第一。我会带相机记录这次旅行。",
    senderId: "6",
    conversationId: "conv1",
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5分钟前
    type: "text",
    status: "sent",
  },
];

const mockConversations: Conversation[] = [
  {
    id: "conv1",
    type: "activity",
    title: "周末户外徒步活动",
    description: "一起去香山爬山，享受大自然的美好！适合所有水平的户外爱好者。",
    avatar: "https://picsum.photos/80/80?random=activity1",
    participants: [
      {
        userId: "1",
        user: mockUsers["1"],
        role: "owner",
        joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5天前创建
        lastReadAt: new Date(Date.now() - 1000 * 60 * 60), // 1小时前阅读
        isTyping: false,
      },
      {
        userId: "2",
        user: mockUsers["2"],
        role: "admin",
        joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4天前加入
        lastReadAt: new Date(Date.now() - 1000 * 60 * 30), // 30分钟前阅读
        isTyping: false,
      },
      {
        userId: "3",
        user: mockUsers["3"],
        role: "member",
        joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3天前加入
        lastReadAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3小时前阅读
        isTyping: false,
      },
      {
        userId: "4",
        user: mockUsers["4"],
        role: "member",
        joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2天前加入
        lastReadAt: new Date(Date.now() - 1000 * 60 * 60), // 1小时前阅读（当前用户）
        isTyping: false,
      },
      {
        userId: "5",
        user: mockUsers["5"],
        role: "member",
        joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1天前加入
        lastReadAt: new Date(Date.now() - 1000 * 60 * 20), // 20分钟前阅读
        isTyping: false,
      },
      {
        userId: "6",
        user: mockUsers["6"],
        role: "member",
        joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12小时前加入
        lastReadAt: new Date(Date.now() - 1000 * 60 * 10), // 10分钟前阅读
        isTyping: false,
      },
    ],
    lastMessage: mockMessages[mockMessages.length - 1],
    lastActivity: new Date(),
    unreadCount: 2, // 有2条新消息未读
    isArchived: false,
    isMuted: false,
    settings: {
      allowInvites: true,
      allowFileSharing: true,
      allowReactions: true,
      muteNotifications: false,
    },
  },
  {
    id: "conv2",
    type: "private",
    title: "Bob Wang", // 私聊显示对方名字
    participants: [
      {
        userId: "4", // 当前用户
        user: mockUsers["4"],
        role: "member",
        joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
        lastReadAt: new Date(),
        isTyping: false,
      },
      {
        userId: "2",
        user: mockUsers["2"],
        role: "member",
        joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
        lastReadAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
        isTyping: false,
      },
    ],
    lastMessage: {
      id: "msg_private1",
      content: "明天徒步活动记得带相机哦！",
      senderId: "2",
      conversationId: "conv2",
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      type: "text",
      status: "read",
    },
    lastActivity: new Date(Date.now() - 1000 * 60 * 60),
    unreadCount: 0,
    isArchived: false,
    isMuted: false,
    settings: {
      allowInvites: false,
      allowFileSharing: true,
      allowReactions: true,
      muteNotifications: false,
    },
  },
  {
    id: "conv3",
    type: "activity",
    title: "周三瑜伽晨练",
    description: "每周三早上的瑜伽练习，适合初学者和有经验的练习者",
    avatar: "https://picsum.photos/80/80?random=activity2",
    participants: [
      {
        userId: "4",
        user: mockUsers["4"],
        role: "owner", // 当前用户是这个活动的组织者
        joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
        lastReadAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
        isTyping: false,
      },
      {
        userId: "1",
        user: mockUsers["1"],
        role: "member",
        joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8),
        lastReadAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
        isTyping: false,
      },
      {
        userId: "3",
        user: mockUsers["3"],
        role: "admin",
        joinedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6),
        lastReadAt: new Date(Date.now() - 1000 * 60 * 60),
        isTyping: false,
      },
    ],
    lastMessage: {
      id: "msg_yoga1",
      content: "明天早上7点开始，大家记得带瑜伽垫",
      senderId: "4",
      conversationId: "conv3",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
      type: "text",
      status: "delivered",
    },
    lastActivity: new Date(Date.now() - 1000 * 60 * 60 * 3),
    unreadCount: 0,
    isArchived: false,
    isMuted: false,
    settings: {
      allowInvites: false, // 瑜伽课程不允许随意邀请
      allowFileSharing: true,
      allowReactions: true,
      muteNotifications: false,
    },
  },
];

interface ChatContainerProps {
  className?: string;
}

export interface ChatContainerRef {
  simulateNewMessage: () => void;
  simulateMultipleMessages: (count?: number) => void;
}

const ChatContainer = forwardRef<ChatContainerRef, ChatContainerProps>(
  ({ className }, ref) => {
    const [activeConversationId, setActiveConversationId] = useState<
      string | null
    >("conv1");
    const [conversations, setConversations] =
      useState<Conversation[]>(mockConversations);
    const [messages, setMessages] = useState<Message[]>(mockMessages);
    const [showSettings, setShowSettings] = useState(false);

    const currentUserId = "4"; // 当前用户是Diana
    const activeConversation = conversations.find(
      (c) => c.id === activeConversationId
    );

    // 模拟新消息到达的函数 - 用于测试新消息分割线
    const simulateNewMessage = (senderId?: string, content?: string) => {
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
    };

    // 模拟多条新消息 - 用于测试分割线
    const simulateMultipleMessages = (count = 5) => {
      const otherUsers = ["1", "2", "3", "5", "6"].filter(
        (id) => id !== currentUserId
      );
      const messages = [
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

      const selectedMessages = messages.slice(0, count);

      selectedMessages.forEach((content, index) => {
        setTimeout(() => {
          const senderId = otherUsers[index % otherUsers.length];
          simulateNewMessage(senderId, content);
        }, (index + 1) * 800);
      });
    };

    // 使用useImperativeHandle来暴露方法给父组件
    useImperativeHandle(ref, () => ({
      simulateNewMessage: () => simulateNewMessage(),
      simulateMultipleMessages,
    }));

    // 计算未读消息（排除自己发送的消息）
    const getUnreadMessages = () => {
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
          new Date(m.timestamp) >
            new Date(currentUserParticipant.lastReadAt!) &&
          m.senderId !== currentUserId // 排除自己发送的消息
      );
    }; // 获取最后阅读的消息ID
    const getLastReadMessageId = () => {
      if (!activeConversation) return null;

      const currentUserParticipant = activeConversation.participants.find(
        (p) => p.userId === currentUserId
      );

      if (!currentUserParticipant?.lastReadAt) return null;

      // 找到最后阅读时间之前的最后一条消息
      const conversationMessages = messages
        .filter((m) => m.conversationId === activeConversationId)
        .sort(
          (a, b) =>
            new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );

      const lastReadMessages = conversationMessages.filter(
        (m) =>
          new Date(m.timestamp) <= new Date(currentUserParticipant.lastReadAt!)
      );

      return lastReadMessages.length > 0
        ? lastReadMessages[lastReadMessages.length - 1].id
        : null;
    };

    // 计算会话的真实未读消息数量（排除自己发送的）
    const getConversationUnreadCount = (conversation: Conversation) => {
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
    };

    // 获取更新后的会话列表（带有正确的未读计数）
    const getUpdatedConversations = () => {
      return conversations.map((conv) => ({
        ...conv,
        unreadCount: getConversationUnreadCount(conv),
      }));
    };

    const unreadMessages = getUnreadMessages();
    const hasUnreadMessages = unreadMessages.length > 0;
    const lastReadMessageId = getLastReadMessageId();
    const updatedConversations = getUpdatedConversations();

    // 处理会话点击
    const handleConversationClick = (conversationId: string) => {
      setActiveConversationId(conversationId);
      setShowSettings(false);

      // 标记消息为已读
      markConversationAsRead(conversationId);
    };

    // 标记会话为已读
    const markConversationAsRead = (conversationId: string) => {
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
    };

    // 处理发送消息
    const handleSendMessage = (content: string) => {
      if (!activeConversationId) return;

      const newMessage: Message = {
        id: `msg_${Date.now()}`,
        content,
        senderId: currentUserId,
        conversationId: activeConversationId,
        timestamp: new Date(),
        type: "text",
        status: "sending",
      };

      setMessages((prev) => [...prev, newMessage]);

      // 模拟发送成功
      setTimeout(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === newMessage.id ? { ...msg, status: "sent" } : msg
          )
        );
      }, 1000);

      // 更新会话的最后消息
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId
            ? { ...conv, lastMessage: newMessage, lastActivity: new Date() }
            : conv
        )
      );
    };

    // 处理群设置更新
    const handleToggleInvitePermission = (checked: boolean) => {
      if (!activeConversationId) return;

      console.log("Toggling invite permission:", checked); // 调试日志

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId
            ? {
                ...conv,
                settings: { ...conv.settings, allowInvites: checked },
              }
            : conv
        )
      );
    };

    const handleToggleFileSharing = (checked: boolean) => {
      if (!activeConversationId) return;

      console.log("Toggling file sharing:", checked); // 调试日志

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId
            ? {
                ...conv,
                settings: { ...conv.settings, allowFileSharing: checked },
              }
            : conv
        )
      );
    };

    const handleToggleNotifications = (checked: boolean) => {
      if (!activeConversationId) return;

      console.log("Toggling notifications:", checked); // 调试日志

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId
            ? {
                ...conv,
                settings: { ...conv.settings, muteNotifications: !checked },
              }
            : conv
        )
      );
    };

    // 处理成员角色变更
    const handleMemberRoleChange = (
      userId: string,
      newRole: "admin" | "member" | "owner"
    ) => {
      if (!activeConversationId) return;

      console.log("Changing member role:", userId, newRole);

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId
            ? {
                ...conv,
                participants: conv.participants.map((p) =>
                  p.userId === userId ? { ...p, role: newRole } : p
                ),
              }
            : conv
        )
      );
    };

    // 处理移除成员
    const handleRemoveMember = (userId: string) => {
      if (!activeConversationId) return;

      console.log("Removing member:", userId);

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId
            ? {
                ...conv,
                participants: conv.participants.filter(
                  (p) => p.userId !== userId
                ),
              }
            : conv
        )
      );
    };

    // 获取当前会话的消息
    const getCurrentMessages = () => {
      if (!activeConversationId) return [];
      return messages.filter((m) => m.conversationId === activeConversationId);
    };

    // 添加新消息分隔线组件 - 增强版本
    const renderNewMessagesDivider = () => {
      if (!hasUnreadMessages || unreadMessages.length === 0) return null;

      // 检查未读消息中是否有非当前用户发送的消息
      const hasOthersUnreadMessages = unreadMessages.some(
        (msg: Message) => msg.senderId !== currentUserId
      );
      if (!hasOthersUnreadMessages) return null;

      const othersUnreadCount = unreadMessages.filter(
        (msg: Message) => msg.senderId !== currentUserId
      ).length;

      return (
        <div className="relative flex items-center justify-center py-4 animate-pulse">
          {/* 发光效果背景 */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/30 to-transparent blur-sm"></div>

          {/* 主要分隔线 */}
          <div className="relative flex items-center w-full max-w-lg mx-auto">
            <div className="flex-1 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-blue-500"></div>

            {/* 中央消息计数器 */}
            <div className="relative mx-4">
              <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg rounded-full px-4 py-2 flex items-center gap-2 border-2 border-white">
                {/* 脉动指示点 */}
                <div className="relative">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <div className="absolute inset-0 w-2 h-2 bg-white rounded-full animate-ping"></div>
                </div>

                <span className="text-sm font-semibold">
                  {othersUnreadCount}条新消息
                </span>

                {/* 小箭头指向下方 */}
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <div className="flex-1 h-0.5 bg-gradient-to-l from-transparent via-blue-400 to-blue-500"></div>
          </div>

          {/* 额外的视觉提示 */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"></div>
              <div
                className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-1 h-1 bg-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>
      );
    };
    return (
      <div className={cn("flex h-full bg-gray-50", className)}>
        {/* 左侧：会话列表 */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">聊天</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            <ConversationList
              conversations={updatedConversations}
              users={mockUsers}
              currentUserId={currentUserId}
              activeConversationId={activeConversationId}
              onConversationClick={handleConversationClick}
            />
          </div>
        </div>

        {/* 右侧：聊天内容 */}
        <div className="flex-1 flex flex-col">
          {activeConversation ? (
            <>
              {/* 聊天头部 */}
              <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                    {activeConversation.avatar ? (
                      <img
                        src={activeConversation.avatar}
                        alt={activeConversation.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-600 font-medium">
                        {activeConversation.title?.charAt(0).toUpperCase() ||
                          "G"}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {activeConversation.title || "群聊"}
                    </h3>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      {/* 只有群聊和活动聊天显示人数 */}
                      {(activeConversation.type === "group" ||
                        activeConversation.type === "activity") && (
                        <button
                          onClick={() => setShowSettings(!showSettings)}
                          className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                          title="点击查看群成员"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                          </svg>
                          <span>
                            {activeConversation.participants.length} 人
                          </span>
                        </button>
                      )}
                      {/* 私聊时显示在线状态 */}
                      {activeConversation.type === "private" && (
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          在线
                        </span>
                      )}
                      {hasUnreadMessages && (
                        <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">
                          {
                            unreadMessages.filter(
                              (m) => m.senderId !== currentUserId
                            ).length
                          }
                          条新消息
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* 测试新消息分割线的按钮 */}
                  <button
                    onClick={() => simulateMultipleMessages(5)}
                    className="px-3 py-1 text-xs bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors"
                    title="模拟新消息（测试分割线）"
                  >
                    测试新消息
                  </button>

                  {activeConversation.type === "group" ||
                  activeConversation.type === "activity" ? (
                    <button
                      onClick={() => setShowSettings(!showSettings)}
                      className={cn(
                        "p-2 rounded-lg transition-colors",
                        showSettings
                          ? "bg-primary-100 text-primary-600"
                          : "text-gray-500 hover:bg-gray-100"
                      )}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </button>
                  ) : null}
                </div>
              </div>

              {/* 聊天内容区域 */}
              <div className="flex-1 flex min-h-0">
                {/* 消息列表 */}
                <div className="flex-1 flex flex-col min-h-0">
                  {/* 消息列表容器 - 改进滚动和布局 */}
                  <div className="flex-1 relative min-h-0">
                    <MessageList
                      messages={getCurrentMessages()}
                      users={mockUsers}
                      currentUserId={currentUserId}
                      lastReadMessageId={lastReadMessageId || undefined}
                      className="absolute inset-0"
                    />

                    {/* 新消息分隔线 - 调整位置以更好地展示 */}
                    {hasUnreadMessages && (
                      <div className="absolute inset-x-0 bottom-0 pointer-events-none">
                        <div className="bg-gradient-to-t from-white via-white/80 to-transparent h-20 flex items-end justify-center pb-2">
                          {renderNewMessagesDivider()}
                        </div>
                      </div>
                    )}

                    {/* 快速滚动到底部按钮 */}
                    {hasUnreadMessages && (
                      <div className="absolute bottom-4 right-4">
                        <button
                          onClick={() => {
                            // 这里可以添加滚动到底部的逻辑
                            console.log("Scroll to bottom");
                            // 同时标记消息为已读
                            markConversationAsRead(activeConversationId!);
                          }}
                          className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white text-sm rounded-full shadow-lg hover:bg-blue-600 transition-colors"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                          </svg>
                          {
                            unreadMessages.filter(
                              (m) => m.senderId !== currentUserId
                            ).length
                          }
                          条新消息
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 消息输入框 - 固定在底部，提升可见性 */}
                  <div className="flex-shrink-0 border-t border-gray-200 bg-white">
                    <MessageInput
                      onSend={handleSendMessage}
                      placeholder="输入消息..."
                    />
                  </div>
                </div>

                {/* 群设置面板 */}
                {showSettings &&
                  activeConversation &&
                  (activeConversation.type === "group" ||
                    activeConversation.type === "activity") && (
                    <div className="w-80 border-l border-gray-200 bg-gray-50 overflow-y-auto">
                      <GroupSettings
                        conversation={activeConversation}
                        currentUserId={currentUserId}
                        onToggleInvitePermission={handleToggleInvitePermission}
                        onToggleFileSharing={handleToggleFileSharing}
                        onToggleNotifications={handleToggleNotifications}
                        onMemberRoleChange={handleMemberRoleChange}
                        onRemoveMember={handleRemoveMember}
                        onLeaveGroup={() => console.log("Leave group")}
                        onDismissGroup={() => console.log("Dismiss group")}
                      />
                    </div>
                  )}
              </div>
            </>
          ) : (
            /* 空状态 */
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  选择一个会话
                </h3>
                <p className="text-gray-500">从左侧选择一个会话开始聊天</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

ChatContainer.displayName = "ChatContainer";

export default ChatContainer;
