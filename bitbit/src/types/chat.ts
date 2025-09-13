export interface User {
  id: string;
  username: string;
  avatar?: string;
  displayName: string;
  isOnline: boolean;
  lastSeen?: Date;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  type: "text" | "image" | "file" | "system";
  timestamp: Date;
  isRead: boolean;
  replyTo?: string; // 回复的消息ID
  editedAt?: Date;
}

export interface Conversation {
  id: string;
  type: "private" | "group";
  participants: string[]; // 用户ID数组
  name?: string; // 群聊名称
  avatar?: string; // 群聊头像
  lastMessage?: Message;
  unreadCount: number;
  isPinned: boolean;
  isMuted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TypingIndicator {
  userId: string;
  conversationId: string;
  timestamp: Date;
}

export interface ChatState {
  // 当前用户
  currentUserId: string | null;

  // 会话列表
  conversations: Record<string, Conversation>;
  conversationList: string[]; // 按最新消息排序的会话ID列表

  // 消息数据
  messages: Record<string, Message>;
  messagesByConversation: Record<string, string[]>; // 按会话分组的消息ID列表

  // 当前活跃的会话
  activeConversationId: string | null;

  // 用户信息
  users: Record<string, User>;

  // 正在输入的用户
  typingUsers: TypingIndicator[];

  // UI 状态
  isLoading: boolean;
  isConnected: boolean;

  // 搜索和过滤
  searchQuery: string;
  filteredConversations: string[];

  // 错误状态
  error: string | null;
}

export interface SendMessagePayload {
  conversationId: string;
  content: string;
  type?: Message["type"];
  replyTo?: string;
}

export interface CreateConversationPayload {
  type: "private" | "group";
  participantIds: string[];
  name?: string;
}

export interface MarkAsReadPayload {
  conversationId: string;
  messageId?: string; // 如果提供，标记到这条消息为止都已读
}
