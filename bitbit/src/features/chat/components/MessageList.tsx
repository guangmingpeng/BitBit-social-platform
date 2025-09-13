import React, { useEffect, useRef, useCallback } from "react";
import type { Message } from "@/features/chat/types";
import type { User } from "@/types";
import MessageBubble from "./MessageBubble";
import { cn } from "@/shared/utils/cn";

interface MessageListProps {
  messages: Message[];
  users: Record<string, User>;
  currentUserId: string;
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
  lastReadMessageId?: string; // 最后阅读的消息ID
  className?: string;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  users,
  currentUserId,
  isLoading = false,
  hasMore = false,
  onLoadMore,
  lastReadMessageId,
  className,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const isUserScrolling = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 自动滚动到底部
  const scrollToBottom = useCallback((force = false) => {
    if (!scrollContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } =
      scrollContainerRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

    if (force || (!isUserScrolling.current && isNearBottom)) {
      scrollContainerRef.current.scrollTo({
        top: scrollHeight,
        behavior: force ? "auto" : "smooth",
      });
    }
  }, []);

  // 处理滚动事件
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const { scrollTop } = scrollContainerRef.current;

    // 检测用户是否在滚动
    isUserScrolling.current = true;

    // 清除之前的定时器
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // 设置定时器，500ms后认为用户停止滚动
    scrollTimeoutRef.current = setTimeout(() => {
      isUserScrolling.current = false;
    }, 500);

    // 检测是否滚动到顶部，触发加载更多
    if (scrollTop === 0 && hasMore && onLoadMore && !isLoading) {
      onLoadMore();
    }
  }, [hasMore, onLoadMore, isLoading]);

  // 新消息时自动滚动到底部
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      // 如果是当前用户发送的消息，强制滚动到底部
      if (lastMessage.senderId === currentUserId) {
        scrollToBottom(true);
      } else {
        scrollToBottom();
      }
    }
  }, [messages, currentUserId, scrollToBottom]);

  // 组件挂载时滚动到底部
  useEffect(() => {
    scrollToBottom(true);
  }, [scrollToBottom]);

  // 判断是否应该显示头像
  const shouldShowAvatar = useCallback(
    (message: Message, index: number) => {
      if (index === 0) return true;

      const prevMessage = messages[index - 1];
      if (!prevMessage) return true;

      // 如果发送者不同，显示头像
      if (prevMessage.senderId !== message.senderId) return true;

      // 如果时间间隔超过5分钟，显示头像
      const timeDiff =
        new Date(message.timestamp).getTime() -
        new Date(prevMessage.timestamp).getTime();
      return timeDiff > 5 * 60 * 1000; // 5分钟
    },
    [messages]
  );

  // 判断是否应该显示时间戳
  const shouldShowTimestamp = useCallback(
    (message: Message, index: number) => {
      if (index === messages.length - 1) return true; // 最后一条消息总是显示时间戳

      const nextMessage = messages[index + 1];
      if (!nextMessage) return true;

      // 如果下一条消息的发送者不同，显示时间戳
      if (nextMessage.senderId !== message.senderId) return true;

      // 如果时间间隔超过5分钟，显示时间戳
      const timeDiff =
        new Date(nextMessage.timestamp).getTime() -
        new Date(message.timestamp).getTime();
      return timeDiff > 5 * 60 * 1000; // 5分钟
    },
    [messages]
  );

  // 按日期分组消息
  const groupedMessages = React.useMemo(() => {
    const groups: { date: string; messages: Message[] }[] = [];

    messages.forEach((message) => {
      const messageDate = new Date(message.timestamp).toDateString();
      const lastGroup = groups[groups.length - 1];

      if (lastGroup && lastGroup.date === messageDate) {
        lastGroup.messages.push(message);
      } else {
        groups.push({
          date: messageDate,
          messages: [message],
        });
      }
    });

    return groups;
  }, [messages]);

  // 格式化日期显示
  const formatDateHeader = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "今天";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "昨天";
    } else {
      return date.toLocaleDateString("zh-CN", {
        month: "long",
        day: "numeric",
        weekday: "long",
      });
    }
  };

  if (messages.length === 0) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center h-full p-8 text-center",
          className
        )}
      >
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
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
        <h3 className="text-lg font-medium text-gray-900 mb-2">开始对话</h3>
        <p className="text-gray-500">发送第一条消息开始对话吧</p>
      </div>
    );
  }

  return (
    <div
      ref={scrollContainerRef}
      onScroll={handleScroll}
      className={cn("flex-1 overflow-y-auto scroll-smooth", className)}
    >
      {/* 加载更多指示器 */}
      {isLoading && (
        <div className="flex justify-center py-4">
          <div className="w-6 h-6 border-2 border-gray-300 border-t-primary-500 rounded-full animate-spin" />
        </div>
      )}

      {/* 消息列表 */}
      {groupedMessages.map((group) => (
        <div key={group.date}>
          {/* 日期分隔符 */}
          <div className="flex justify-center py-4">
            <div className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
              {formatDateHeader(group.date)}
            </div>
          </div>

          {/* 该日期的消息 */}
          {group.messages.map((message) => {
            const globalIndex = messages.indexOf(message);
            const sender = users[message.senderId];
            const isOwn = message.senderId === currentUserId;

            if (!sender) {
              console.warn(`找不到发送者信息: ${message.senderId}`);
              return null;
            }

            // 检查是否需要显示新消息分隔线
            // 只有在不是当前用户发送的消息时才显示新消息分隔线
            const showNewMessagesDivider =
              lastReadMessageId &&
              globalIndex > 0 &&
              messages[globalIndex - 1].id === lastReadMessageId &&
              message.senderId !== currentUserId; // 自己发的消息不显示新消息分隔线

            return (
              <div key={message.id}>
                {/* 新消息分隔线 - 简洁现代设计 */}
                {showNewMessagesDivider && (
                  <div className="relative flex items-center justify-center py-6 my-6 animate-fade-in">
                    {/* 背景光晕效果 */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/60 to-transparent"></div>

                    {/* 分隔线 */}
                    <div className="relative flex items-center w-full">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-300/50 to-blue-400/50"></div>

                      {/* 中央标签 */}
                      <div className="relative mx-6">
                        <div className="relative bg-white border border-blue-200/80 shadow-sm rounded-full px-4 py-2 flex items-center gap-2">
                          {/* 简单的指示点 */}
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>

                          <span className="text-sm font-medium text-blue-700">
                            新消息
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-blue-300/50 to-blue-400/50"></div>
                    </div>
                  </div>
                )}

                <div
                  ref={
                    globalIndex === messages.length - 1
                      ? lastMessageRef
                      : undefined
                  }
                >
                  <MessageBubble
                    message={message}
                    sender={sender}
                    isOwn={isOwn}
                    showAvatar={shouldShowAvatar(message, globalIndex)}
                    showTimestamp={shouldShowTimestamp(message, globalIndex)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default MessageList;
