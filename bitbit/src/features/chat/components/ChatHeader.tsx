import React from "react";
import type { Conversation } from "@/features/chat/types";
import { cn } from "@/shared/utils/cn";
import { useIsSmallAndDown } from "@/shared/hooks/useMediaQuery";

interface ChatHeaderProps {
  activeConversation: Conversation | undefined;
  currentUserId: string;
  hasUnreadMessages: boolean;
  unreadMessagesCount: number;
  showSettings: boolean;
  onToggleSettings: () => void;
  onSimulateMessages?: (count: number) => void;
  onTestNewMessageButton?: () => void; // 新增：测试新消息按钮的回调
  onBackToList?: () => void; // 新增：移动端返回列表的回调
  className?: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  activeConversation,
  currentUserId,
  hasUnreadMessages,
  unreadMessagesCount,
  showSettings,
  onToggleSettings,
  onSimulateMessages,
  onTestNewMessageButton,
  onBackToList,
  className,
}) => {
  const isMobile = useIsSmallAndDown(); // 检测是否为移动端
  if (!activeConversation) return null;

  // 获取对方用户信息（私聊时）
  const getOtherUser = () => {
    if (activeConversation.type === "private") {
      return activeConversation.participants.find(
        (p) => p.userId !== currentUserId
      );
    }
    return null;
  };

  const otherUser = getOtherUser();

  // 显示的头像
  const displayAvatar = (() => {
    if (activeConversation.type === "private" && otherUser?.user.avatar) {
      return otherUser.user.avatar;
    }
    return activeConversation.avatar;
  })();

  // 显示的标题
  const displayTitle = (() => {
    if (activeConversation.type === "private" && otherUser?.user.name) {
      return otherUser.user.name;
    }
    return activeConversation.title;
  })();

  // 显示的描述
  const displayDescription = (() => {
    if (activeConversation.type === "private") {
      return otherUser?.user.bio || "";
    }
    return activeConversation.description || "";
  })();

  return (
    <div
      className={cn("flex-shrink-0 p-4 border-b border-gray-200", className)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* 移动端返回按钮 */}
          {isMobile && onBackToList && (
            <button
              onClick={onBackToList}
              className="flex-shrink-0 p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="返回消息列表"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}

          {/* 头像 */}
          <div className="relative flex-shrink-0">
            <img
              src={displayAvatar || "https://picsum.photos/48/48"}
              alt={displayTitle || "聊天头像"}
              className="w-12 h-12 rounded-full object-cover"
            />
            {/* 在线状态指示器 - 仅私聊显示 */}
            {activeConversation.type === "private" &&
              otherUser?.user.isOnline && (
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              )}
          </div>

          {/* 标题和描述 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-semibold text-gray-900 truncate">
                {displayTitle}
              </h2>

              {/* 参与者数量 - 仅群聊显示 */}
              {(activeConversation.type === "group" ||
                activeConversation.type === "activity") && (
                <span className="text-sm text-gray-500">
                  ({activeConversation.participants.length}人)
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              {/* 私聊时显示描述或在线状态 */}
              {activeConversation.type === "private" && (
                <>
                  {displayDescription && (
                    <span className="truncate">{displayDescription}</span>
                  )}
                  {otherUser?.user.isOnline && (
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      在线
                    </span>
                  )}
                </>
              )}

              {/* 群聊时显示描述 */}
              {(activeConversation.type === "group" ||
                activeConversation.type === "activity") && (
                <span className="truncate">{displayDescription}</span>
              )}

              {/* 只在群聊或活动聊天中显示新消息提示，私聊不显示 */}
              {hasUnreadMessages &&
                (activeConversation.type === "group" ||
                  activeConversation.type === "activity") && (
                  <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs rounded-full">
                    {unreadMessagesCount}条新消息
                  </span>
                )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* 测试新消息分割线的按钮 - 仅开发环境显示 */}
          {process.env.NODE_ENV === "development" && onSimulateMessages && (
            <>
              <button
                onClick={() => onSimulateMessages(1)}
                className="px-3 py-1 text-xs bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                title="发送1条测试消息"
              >
                发送1条
              </button>

              <button
                onClick={() => onSimulateMessages(5)}
                className="px-3 py-1 text-xs bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors"
                title="模拟新消息（测试分割线）"
              >
                发送5条
              </button>

              {onTestNewMessageButton && (
                <button
                  onClick={onTestNewMessageButton}
                  className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                  title="强制显示新消息按钮"
                >
                  显示按钮
                </button>
              )}
            </>
          )}

          {/* 设置按钮 - 仅群聊显示 */}
          {(activeConversation.type === "group" ||
            activeConversation.type === "activity") && (
            <button
              onClick={onToggleSettings}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
