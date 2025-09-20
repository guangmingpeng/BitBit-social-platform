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
  shouldHideUnreadDivider?: boolean; // 是否应该隐藏未读分隔线（用于"标为未读"操作后）
  firstNewMessageId?: string; // 实时新消息的第一条消息ID
  onScrollStateChange?: (isAtBottom: boolean) => void; // 滚动状态变化回调
  shouldScrollToUnread?: boolean; // 是否应该滚动到未读消息
  onScrollToUnreadComplete?: () => void; // 滚动到未读消息完成的回调
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
  shouldHideUnreadDivider,
  firstNewMessageId,
  onScrollStateChange,
  shouldScrollToUnread,
  onScrollToUnreadComplete,
  className,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const firstUnreadMessageRef = useRef<HTMLDivElement>(null);
  const firstNewMessageRef = useRef<HTMLDivElement>(null); // 实时新消息的ref
  const isUserScrolling = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasScrolledToUnread = useRef(false);

  // 自动滚动到底部
  const scrollToBottom = useCallback((force = false) => {
    if (!scrollContainerRef.current) return;

    if (force) {
      // 强制滚动时（用户发送消息），立即滚动到底部
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    } else {
      // 非强制滚动时，考虑用户滚动状态和位置
      const { scrollTop, scrollHeight, clientHeight } =
        scrollContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

      if (!isUserScrolling.current && isNearBottom) {
        scrollContainerRef.current.scrollTo({
          top: scrollHeight,
          behavior: "smooth",
        });
      }
    }
  }, []);

  // 滚动到第一条未读消息
  const scrollToFirstUnreadMessage = useCallback(() => {
    if (!firstUnreadMessageRef.current || !scrollContainerRef.current) return;

    // 使用更精确的滚动位置计算
    const container = scrollContainerRef.current;
    const firstUnreadElement = firstUnreadMessageRef.current;

    const containerRect = container.getBoundingClientRect();
    const elementRect = firstUnreadElement.getBoundingClientRect();

    // 计算元素相对于容器的位置
    const elementTop =
      elementRect.top - containerRect.top + container.scrollTop;

    // 滚动到元素位置，留出一些顶部边距让分隔线更明显
    const offsetTop = Math.max(0, elementTop - 100);

    container.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });

    hasScrolledToUnread.current = true;
  }, []);

  // 滚动到第一条实时新消息
  const scrollToFirstNewMessage = useCallback(() => {
    if (!firstNewMessageRef.current || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const firstNewElement = firstNewMessageRef.current;

    const containerRect = container.getBoundingClientRect();
    const elementRect = firstNewElement.getBoundingClientRect();

    // 计算元素相对于容器的位置
    const elementTop =
      elementRect.top - containerRect.top + container.scrollTop;

    // 滚动到元素位置，留出一些顶部边距
    const offsetTop = Math.max(0, elementTop - 100);

    container.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }, []);

  // 智能滚动：根据未读消息状态决定滚动位置
  const smartScroll = useCallback(() => {
    // 如果没有未读消息，滚动到底部
    if (!lastReadMessageId) {
      setTimeout(() => {
        scrollToBottom(true);
      }, 100);
      return;
    }

    // 如果有未读消息且还没滚动过，滚动到第一条未读消息
    if (!hasScrolledToUnread.current) {
      setTimeout(() => {
        scrollToFirstUnreadMessage();
      }, 200); // 稍微延长延迟确保DOM完全渲染
    }
  }, [lastReadMessageId, scrollToBottom, scrollToFirstUnreadMessage]);

  // 处理滚动事件
  const handleScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } =
      scrollContainerRef.current;

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

    // 检测用户是否在底部
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
    if (onScrollStateChange) {
      onScrollStateChange(isAtBottom);
    }
  }, [hasMore, onLoadMore, isLoading, onScrollStateChange]);

  // 使用ref跟踪消息数量变化
  const previousMessageCountRef = useRef(messages.length);

  // 新消息时自动滚动到底部（仅在新增消息时触发，且考虑用户滚动状态）
  useEffect(() => {
    const currentMessageCount = messages.length;
    const hasNewMessages =
      currentMessageCount > previousMessageCountRef.current;

    if (hasNewMessages && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];

      // 如果是当前用户发送的消息，总是强制滚动到底部
      if (lastMessage.senderId === currentUserId) {
        // 暂时重置用户滚动状态，确保能够滚动
        const wasUserScrolling = isUserScrolling.current;
        isUserScrolling.current = false;

        // 延迟一点时间确保消息已经渲染
        setTimeout(() => {
          scrollToBottom(true);
          // 短暂延迟后恢复滚动状态
          setTimeout(() => {
            isUserScrolling.current = wasUserScrolling;
          }, 100);
        }, 50);
      } else {
        // 如果是其他用户的消息，延迟检查用户是否在底部附近
        setTimeout(() => {
          if (scrollContainerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } =
              scrollContainerRef.current;
            const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

            // 如果用户在底部附近（100px内）且没有在主动滚动，则自动滚动
            if (distanceFromBottom <= 100 && !isUserScrolling.current) {
              console.log("📨 自动滚动到新消息");
              scrollToBottom(true);
            } else {
              console.log("📨 不自动滚动 (距离:", distanceFromBottom + "px)");
            }
          }
        }, 100); // 延迟确保DOM已更新
      }
    }

    // 更新消息数量记录
    previousMessageCountRef.current = currentMessageCount;
  }, [messages, currentUserId, scrollToBottom]);

  // 组件挂载时或会话切换时智能滚动
  useEffect(() => {
    // 重置滚动状态
    hasScrolledToUnread.current = false;
    smartScroll();
  }, [smartScroll, lastReadMessageId]);

  // 处理滚动到未读消息的触发
  useEffect(() => {
    if (shouldScrollToUnread) {
      // 如果有实时新消息ID，优先滚动到实时新消息
      if (firstNewMessageId && firstNewMessageRef.current) {
        console.log("🎯 滚动到新消息:", firstNewMessageId);
        scrollToFirstNewMessage();
      } else if (firstUnreadMessageRef.current) {
        console.log("🎯 滚动到未读消息");
        scrollToFirstUnreadMessage();
      }
      onScrollToUnreadComplete?.();
    }
  }, [
    shouldScrollToUnread,
    firstNewMessageId,
    messages,
    onScrollToUnreadComplete,
    scrollToFirstNewMessage,
    scrollToFirstUnreadMessage,
  ]);

  // 当lastReadMessageId改变时重置滚动状态
  useEffect(() => {
    hasScrolledToUnread.current = false;
  }, [lastReadMessageId]);

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // 判断是否应该显示头像
  const shouldShowAvatar = useCallback(() => {
    // 总是显示头像
    return true;
  }, []);

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
      className={cn("overflow-y-auto scroll-smooth", className)}
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
            // 只在第一个未读的非自己消息前显示一次
            const showNewMessagesDivider = (() => {
              if (!lastReadMessageId) return false;

              // 如果当前消息是自己发送的，不显示分隔线
              if (message.senderId === currentUserId) return false;

              // 如果被标记为应该隐藏分隔线（通常在"标为未读"操作后），不显示分隔线
              // 分隔线只应该在真正的新消息到达或切换到有历史未读消息的会话时显示
              if (shouldHideUnreadDivider) return false;

              // 找到最后阅读消息的索引
              const lastReadIndex = messages.findIndex(
                (m) => m.id === lastReadMessageId
              );

              if (lastReadIndex === -1) return false;

              // 找到第一条未读的非自己消息
              let firstUnreadNonSelfIndex = -1;
              for (let i = lastReadIndex + 1; i < messages.length; i++) {
                if (messages[i].senderId !== currentUserId) {
                  firstUnreadNonSelfIndex = i;
                  break;
                }
              }

              const shouldShow = globalIndex === firstUnreadNonSelfIndex;

              if (shouldShow) {
                console.log(
                  `🔹 显示未读分隔线在消息: ${message.content.slice(0, 20)}...`
                );
              }

              return shouldShow;
            })();

            // 判断是否是第一条未读的非自己消息（用于滚动定位）
            const isFirstUnreadMessage = (() => {
              if (!lastReadMessageId) return false;
              if (message.senderId === currentUserId) return false;

              const lastReadIndex = messages.findIndex(
                (m) => m.id === lastReadMessageId
              );
              if (lastReadIndex === -1) return false;

              // 找到第一条未读的非自己消息
              for (let i = lastReadIndex + 1; i < messages.length; i++) {
                if (messages[i].senderId !== currentUserId) {
                  return globalIndex === i;
                }
              }

              return false;
            })();

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
                  ref={(() => {
                    if (message.id === firstNewMessageId) {
                      return firstNewMessageRef;
                    } else if (isFirstUnreadMessage) {
                      return firstUnreadMessageRef;
                    } else if (globalIndex === messages.length - 1) {
                      return lastMessageRef;
                    }
                    return undefined;
                  })()}
                >
                  <MessageBubble
                    message={message}
                    sender={sender}
                    isOwn={isOwn}
                    showAvatar={shouldShowAvatar()}
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
