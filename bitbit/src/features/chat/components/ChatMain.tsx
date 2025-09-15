import React from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import type { Message } from "@/features/chat/types";
import type { User } from "@/types";

interface ChatMainProps {
  messages: Message[];
  users: Record<string, User>;
  currentUserId: string;
  lastReadMessageId?: string;
  firstNewMessageId?: string; // 实时新消息的第一条消息ID
  presetMessage?: string;
  onSendMessage: (
    content: string,
    type?: "text" | "image" | "emoji",
    imageFile?: File
  ) => void;
  onScrollStateChange?: (isAtBottom: boolean) => void;
  shouldScrollToUnread?: boolean;
  onScrollToUnreadComplete?: () => void;
  className?: string;
}

const ChatMain: React.FC<ChatMainProps> = ({
  messages,
  users,
  currentUserId,
  lastReadMessageId,
  firstNewMessageId,
  presetMessage,
  onSendMessage,
  onScrollStateChange,
  shouldScrollToUnread,
  onScrollToUnreadComplete,
  className,
}) => {
  return (
    <div
      className={`flex-1 flex flex-col min-h-0 h-full relative ${
        className || ""
      }`}
    >
      {/* 消息列表容器 - 独立滚动区域 */}
      <div className="flex-1 min-h-0">
        <MessageList
          messages={messages}
          users={users}
          currentUserId={currentUserId}
          lastReadMessageId={lastReadMessageId}
          firstNewMessageId={firstNewMessageId}
          onScrollStateChange={onScrollStateChange}
          shouldScrollToUnread={shouldScrollToUnread}
          onScrollToUnreadComplete={onScrollToUnreadComplete}
          className="h-full p-4"
        />
      </div>

      {/* 消息输入框 - 固定在底部，在导航栏上方 */}
      <div className="flex-shrink-0">
        <MessageInput
          onSend={onSendMessage}
          placeholder="输入消息..."
          presetMessage={presetMessage}
        />
      </div>
    </div>
  );
};

export default ChatMain;
