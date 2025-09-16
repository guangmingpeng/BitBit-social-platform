import type { User } from "@/types";

// 消息类型定义
export interface Message {
  id: string;
  content: string;
  senderId: string;
  conversationId: string;
  timestamp: Date;
  type: MessageType;
  status: MessageStatus;
  replyTo?: string; // 回复的消息ID
  attachments?: MessageAttachment[];
  reactions?: MessageReaction[];
  imageUrl?: string; // 图片消息的URL
}

export type MessageType = "text" | "image" | "file" | "system";

export type MessageStatus =
  | "sending"
  | "sent"
  | "delivered"
  | "read"
  | "failed";

// 消息附件
export interface MessageAttachment {
  id: string;
  type: "image" | "file";
  url: string;
  name: string;
  size: number;
  mimeType: string;
}

// 消息反应
export interface MessageReaction {
  id: string;
  userId: string;
  emoji: string;
  timestamp: Date;
}

// 会话类型定义
export interface Conversation {
  id: string;
  type: ConversationType;
  participants: ConversationParticipant[];
  lastMessage?: Message;
  lastActivity: Date;
  unreadCount: number;
  title?: string; // 群聊标题
  avatar?: string; // 群聊头像
  description?: string; // 群聊描述
  isArchived: boolean;
  isMuted: boolean;
  isPinned?: boolean; // 是否置顶
  pinnedAt?: Date; // 置顶时间，用于排序
  isDismissed?: boolean; // 群聊是否已解散
  dismissedAt?: Date; // 解散时间
  dismissedBy?: string; // 解散人的用户ID
  activityId?: string; // 关联的活动ID（仅活动群聊）
  settings: ConversationSettings;
}

export type ConversationType = "private" | "group" | "activity"; // 活动群聊

// 会话参与者
export interface ConversationParticipant {
  userId: string;
  user: User;
  role: ParticipantRole;
  joinedAt: Date;
  lastReadAt?: Date;
  isTyping: boolean;
}

export type ParticipantRole = "member" | "admin" | "owner";

// 会话设置
export interface ConversationSettings {
  allowInvites: boolean;
  allowFileSharing: boolean;
  allowReactions: boolean;
  muteNotifications: boolean;
}

// 在线状态
export interface OnlineStatus {
  userId: string;
  status: "online" | "offline" | "away" | "busy";
  lastSeen?: Date;
}

// 正在输入状态
export interface TypingStatus {
  conversationId: string;
  userId: string;
  isTyping: boolean;
  timestamp: Date;
}

// 聊天列表项
export interface ChatListItem {
  conversation: Conversation;
  lastMessage?: Message;
  unreadCount: number;
  onlineStatus?: OnlineStatus;
}

// 消息草稿
export interface MessageDraft {
  conversationId: string;
  content: string;
  timestamp: Date;
  attachments?: File[];
}

// Socket事件类型
export interface SocketEvents {
  // 连接事件
  connect: () => void;
  disconnect: () => void;
  error: (error: Error) => void;

  // 消息事件
  "message:send": (
    message: Omit<Message, "id" | "timestamp" | "status">
  ) => void;
  "message:receive": (message: Message) => void;
  "message:status": (data: {
    messageId: string;
    status: MessageStatus;
  }) => void;
  "message:typing": (data: TypingStatus) => void;

  // 会话事件
  "conversation:join": (conversationId: string) => void;
  "conversation:leave": (conversationId: string) => void;
  "conversation:update": (conversation: Conversation) => void;

  // 在线状态事件
  "user:online": (status: OnlineStatus) => void;
  "user:offline": (userId: string) => void;
}

// API响应类型
export interface ChatApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// 聊天功能配置
export interface ChatConfig {
  maxMessageLength: number;
  maxFileSize: number;
  allowedFileTypes: string[];
  typingTimeout: number;
  reconnectAttempts: number;
  messagePageSize: number;
}
