import React from "react";
import type { Conversation } from "@/features/chat/types";

interface UnreadMessagesBadgeProps {
  activeConversation: Conversation | undefined;
  onScrollToBottom: () => void;
  isUserAtBottom?: boolean; // 用户是否在聊天底部
  hasNewMessages?: boolean; // 是否有新消息到达（不是历史未读消息）
  unreadMessagesCount?: number; // 新消息数量
  className?: string;
}

const UnreadMessagesBadge: React.FC<UnreadMessagesBadgeProps> = ({
  activeConversation,
  onScrollToBottom,
  isUserAtBottom = true,
  hasNewMessages = false,
  unreadMessagesCount = 0,
  className,
}) => {
  console.log("🔔 UnreadMessagesBadge render:", {
    activeConversation: activeConversation?.id,
    isUserAtBottom,
    hasNewMessages,
    unreadMessagesCount,
    shouldShow:
      activeConversation &&
      hasNewMessages &&
      !isUserAtBottom &&
      unreadMessagesCount > 0,
  });

  // 只在以下情况显示：
  // 1. 有活跃会话
  // 2. 有实时新消息到达（不是历史未读消息）
  // 3. 用户不在底部
  // 4. 有未读消息数量
  if (
    !activeConversation ||
    !hasNewMessages ||
    isUserAtBottom ||
    unreadMessagesCount <= 0
  ) {
    return null;
  }

  return (
    <div
      className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 ${
        className || ""
      }`}
    >
      <button
        onClick={onScrollToBottom}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm rounded-full shadow-lg hover:bg-blue-600 transition-all duration-200 hover:scale-105"
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
        <span>{unreadMessagesCount}条新消息</span>
      </button>
    </div>
  );
};

export default UnreadMessagesBadge;
