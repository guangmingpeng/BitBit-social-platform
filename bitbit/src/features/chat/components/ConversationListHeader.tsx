import React from "react";
import { cn } from "@/shared/utils/cn";

interface ConversationListHeaderProps {
  title?: string;
  className?: string;
  unreadCount?: number;
  onMarkAllAsRead?: () => void;
}

const ConversationListHeader: React.FC<ConversationListHeaderProps> = ({
  title = "消息",
  className,
  unreadCount = 0,
  onMarkAllAsRead,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white",
        className
      )}
    >
      {/* 左侧：标题 */}
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
        {unreadCount > 0 && (
          <div className="ml-3 px-2 py-0.5 bg-red-500 text-white text-xs font-medium rounded-full min-w-[20px] text-center">
            {unreadCount > 99 ? "99+" : unreadCount}
          </div>
        )}
      </div>

      {/* 右侧：一键已读按钮 */}
      {unreadCount > 0 && onMarkAllAsRead && (
        <button
          onClick={onMarkAllAsRead}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
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
              strokeWidth={1.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
          全部已读
        </button>
      )}
    </div>
  );
};

export default ConversationListHeader;
