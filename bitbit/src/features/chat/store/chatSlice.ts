import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  Conversation,
  Message,
  TypingStatus,
  OnlineStatus,
  MessageDraft,
} from "../types";

// 异步操作
export const fetchConversations = createAsyncThunk(
  "chat/fetchConversations",
  async (userId: string) => {
    // TODO: 实现API调用
    const response = await fetch(`/api/conversations?userId=${userId}`);
    return response.json();
  }
);

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async ({
    conversationId,
    page = 1,
  }: {
    conversationId: string;
    page?: number;
  }) => {
    // TODO: 实现API调用
    const response = await fetch(
      `/api/conversations/${conversationId}/messages?page=${page}`
    );
    return response.json();
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async (messageData: Omit<Message, "id" | "timestamp" | "status">) => {
    // TODO: 实现API调用
    const response = await fetch("/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(messageData),
    });
    return response.json();
  }
);

// 聊天状态接口
export interface ChatState {
  // 会话相关
  conversations: Record<string, Conversation>;
  conversationsList: string[]; // 排序后的会话ID列表
  activeConversationId: string | null;

  // 消息相关
  messages: Record<string, Message[]>; // conversationId -> messages
  messagesPagination: Record<
    string,
    { hasMore: boolean; loading: boolean; page: number }
  >;

  // 用户状态
  onlineUsers: Record<string, OnlineStatus>;
  typingUsers: Record<string, TypingStatus[]>; // conversationId -> typing users

  // UI状态
  isChatListOpen: boolean;
  isEmojiPickerOpen: boolean;

  // 草稿
  drafts: Record<string, MessageDraft>;

  // 加载状态
  loading: {
    conversations: boolean;
    messages: boolean;
    sending: boolean;
  };

  // 错误状态
  error: string | null;
}

const initialState: ChatState = {
  conversations: {},
  conversationsList: [],
  activeConversationId: null,
  messages: {},
  messagesPagination: {},
  onlineUsers: {},
  typingUsers: {},
  isChatListOpen: true,
  isEmojiPickerOpen: false,
  drafts: {},
  loading: {
    conversations: false,
    messages: false,
    sending: false,
  },
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // 设置当前活跃会话
    setActiveConversation: (state, action: PayloadAction<string | null>) => {
      state.activeConversationId = action.payload;
      state.error = null;
    },

    // 添加对话
    addConversation: (state, action: PayloadAction<Conversation>) => {
      const conversation = action.payload;
      state.conversations[conversation.id] = conversation;

      // 添加到对话列表中，如果不存在的话
      if (!state.conversationsList.includes(conversation.id)) {
        state.conversationsList.unshift(conversation.id);
      }
    },

    // 添加新消息
    addMessage: (state, action: PayloadAction<Message>) => {
      const message = action.payload;
      const conversationId = message.conversationId;

      if (!state.messages[conversationId]) {
        state.messages[conversationId] = [];
      }

      state.messages[conversationId].push(message);

      // 更新会话的最后消息
      if (state.conversations[conversationId]) {
        state.conversations[conversationId].lastMessage = message;
        state.conversations[conversationId].lastActivity = message.timestamp;

        // 如果不是当前用户发送的消息，增加未读数
        // TODO: 获取当前用户ID
        // if (message.senderId !== currentUserId) {
        //   state.conversations[conversationId].unreadCount += 1;
        // }
      }
    },

    // 更新消息状态
    updateMessageStatus: (
      state,
      action: PayloadAction<{ messageId: string; status: Message["status"] }>
    ) => {
      const { messageId, status } = action.payload;

      Object.values(state.messages).forEach((messages) => {
        const message = messages.find((m) => m.id === messageId);
        if (message) {
          message.status = status;
        }
      });
    },

    // 标记会话为已读
    markConversationAsRead: (state, action: PayloadAction<string>) => {
      const conversationId = action.payload;
      if (state.conversations[conversationId]) {
        state.conversations[conversationId].unreadCount = 0;
      }
    },

    // 设置用户在线状态
    setUserOnlineStatus: (state, action: PayloadAction<OnlineStatus>) => {
      const status = action.payload;
      state.onlineUsers[status.userId] = status;
    },

    // 设置用户正在输入状态
    setUserTyping: (state, action: PayloadAction<TypingStatus>) => {
      const typingStatus = action.payload;
      const conversationId = typingStatus.conversationId;

      if (!state.typingUsers[conversationId]) {
        state.typingUsers[conversationId] = [];
      }

      const existingIndex = state.typingUsers[conversationId].findIndex(
        (t) => t.userId === typingStatus.userId
      );

      if (typingStatus.isTyping) {
        if (existingIndex >= 0) {
          state.typingUsers[conversationId][existingIndex] = typingStatus;
        } else {
          state.typingUsers[conversationId].push(typingStatus);
        }
      } else {
        if (existingIndex >= 0) {
          state.typingUsers[conversationId].splice(existingIndex, 1);
        }
      }
    },

    // 切换聊天列表显示
    toggleChatList: (state) => {
      state.isChatListOpen = !state.isChatListOpen;
    },

    // 切换表情选择器
    toggleEmojiPicker: (state) => {
      state.isEmojiPickerOpen = !state.isEmojiPickerOpen;
    },

    // 保存消息草稿
    saveDraft: (state, action: PayloadAction<MessageDraft>) => {
      const draft = action.payload;
      state.drafts[draft.conversationId] = draft;
    },

    // 清除消息草稿
    clearDraft: (state, action: PayloadAction<string>) => {
      const conversationId = action.payload;
      delete state.drafts[conversationId];
    },

    // 清除错误
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // 获取会话列表
    builder
      .addCase(fetchConversations.pending, (state) => {
        state.loading.conversations = true;
        state.error = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading.conversations = false;
        const conversations = action.payload.data || [];

        conversations.forEach((conversation: Conversation) => {
          state.conversations[conversation.id] = conversation;
        });

        state.conversationsList = conversations
          .sort(
            (a: Conversation, b: Conversation) =>
              new Date(b.lastActivity).getTime() -
              new Date(a.lastActivity).getTime()
          )
          .map((c: Conversation) => c.id);
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading.conversations = false;
        state.error = action.error.message || "获取会话列表失败";
      });

    // 获取消息
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading.messages = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading.messages = false;
        const { conversationId, messages, hasMore, page } =
          action.payload.data || {};

        if (!state.messages[conversationId]) {
          state.messages[conversationId] = [];
        }

        if (page === 1) {
          state.messages[conversationId] = messages || [];
        } else {
          state.messages[conversationId] = [
            ...(messages || []),
            ...state.messages[conversationId],
          ];
        }

        state.messagesPagination[conversationId] = {
          hasMore: hasMore || false,
          loading: false,
          page: page || 1,
        };
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading.messages = false;
        state.error = action.error.message || "获取消息失败";
      });

    // 发送消息
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading.sending = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading.sending = false;
        const message = action.payload.data;
        if (message) {
          // 消息已通过 addMessage reducer 添加
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading.sending = false;
        state.error = action.error.message || "发送消息失败";
      });
  },
});

export const {
  setActiveConversation,
  addConversation,
  addMessage,
  updateMessageStatus,
  markConversationAsRead,
  setUserOnlineStatus,
  setUserTyping,
  toggleChatList,
  toggleEmojiPicker,
  saveDraft,
  clearDraft,
  clearError,
} = chatSlice.actions;

export const chatReducer = chatSlice.reducer;

// 选择器
export const selectActiveConversation = (state: { chat: ChatState }) =>
  state.chat.activeConversationId
    ? state.chat.conversations[state.chat.activeConversationId]
    : null;

export const selectConversationMessages = (
  state: { chat: ChatState },
  conversationId: string
) => state.chat.messages[conversationId] || [];

export const selectConversationsList = (state: { chat: ChatState }) =>
  state.chat.conversationsList
    .map((id) => state.chat.conversations[id])
    .filter(Boolean);

export const selectTypingUsers = (
  state: { chat: ChatState },
  conversationId: string
) => state.chat.typingUsers[conversationId] || [];

export const selectUserOnlineStatus = (
  state: { chat: ChatState },
  userId: string
) => state.chat.onlineUsers[userId];

export const selectDraft = (
  state: { chat: ChatState },
  conversationId: string
) => state.chat.drafts[conversationId];
