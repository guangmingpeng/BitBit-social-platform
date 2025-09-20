import React from "react";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import GroupDismissedNotice from "./GroupDismissedNotice";
import type { Message, Conversation } from "@/features/chat/types";
import type { User } from "@/types";

interface ChatMainProps {
  messages: Message[];
  users: Record<string, User>;
  currentUserId: string;
  conversation?: Conversation;
  lastReadMessageId?: string;
  shouldHideUnreadDivider?: boolean;
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
  conversation,
  lastReadMessageId,
  shouldHideUnreadDivider,
  firstNewMessageId,
  presetMessage,
  onSendMessage,
  onScrollStateChange,
  shouldScrollToUnread,
  onScrollToUnreadComplete,
  className,
}) => {
  // 判断是否为已解散的群聊
  const isGroupDismissed =
    conversation?.isDismissed && conversation?.type !== "private";

  // 获取解散人的姓名
  const dismissedByUser = conversation?.dismissedBy
    ? users[conversation.dismissedBy]
    : null;
  const dismissedByName = dismissedByUser
    ? dismissedByUser.name ||
      dismissedByUser.username ||
      dismissedByUser.email.split("@")[0]
    : undefined;
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
          shouldHideUnreadDivider={shouldHideUnreadDivider}
          firstNewMessageId={firstNewMessageId}
          onScrollStateChange={onScrollStateChange}
          shouldScrollToUnread={shouldScrollToUnread}
          onScrollToUnreadComplete={onScrollToUnreadComplete}
          className="h-full p-4"
        />
      </div>

      {/* 群聊解散提示 - 如果群聊已解散则显示 */}
      {isGroupDismissed && (
        <div className="flex-shrink-0">
          <GroupDismissedNotice
            dismissedAt={conversation?.dismissedAt}
            dismissedBy={conversation?.dismissedBy}
            dismissedByName={dismissedByName}
          />
        </div>
      )}

      {/* 消息输入框 - 固定在底部，在导航栏上方 */}
      <div className="flex-shrink-0">
        <MessageInput
          onSend={onSendMessage}
          placeholder={
            isGroupDismissed ? "群聊已解散，无法发送消息" : "输入消息..."
          }
          presetMessage={presetMessage}
          disabled={isGroupDismissed}
        />
      </div>
    </div>
  );
};

export default ChatMain;
