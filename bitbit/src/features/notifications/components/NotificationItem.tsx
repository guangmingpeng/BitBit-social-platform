import React from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/shared/utils/cn";
import type { Notification } from "../types";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete?: (id: string) => void;
  // 多选模式相关属性
  isSelectionMode?: boolean;
  isSelected?: boolean;
  onToggleSelection?: (id: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
  onDelete,
  isSelectionMode = false,
  isSelected = false,
  onToggleSelection,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // 如果是选择模式，切换选择状态
    if (isSelectionMode && onToggleSelection) {
      onToggleSelection(notification.id);
      return;
    }

    // 如果未读，先标记为已读
    if (!notification.isRead) {
      onMarkAsRead(notification.id);
    }

    // 如果有跳转链接，进行导航
    if (notification.actionUrl) {
      navigate(notification.actionUrl, {
        state: {
          fromSource: "notifications",
        },
      });
    }
  };

  const getTypeIcon = () => {
    switch (notification.type) {
      case "activity":
        return "🎯";
      case "social":
        return "👥";
      case "message":
        return "💬";
      case "system":
        return "⚙️";
      default:
        return "📢";
    }
  };

  const getTypeColor = () => {
    switch (notification.type) {
      case "activity":
        return "text-coral-500";
      case "social":
        return "text-mint-500";
      case "message":
        return "text-sunflower-500";
      case "system":
        return "text-lavender-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "p-6 hover:bg-gray-50 transition-colors cursor-pointer group relative",
        !notification.isRead && "bg-primary-50/30",
        isSelectionMode && "hover:bg-blue-50",
        isSelected && "bg-blue-100"
      )}
    >
      <div className="flex items-start gap-4">
        {/* 多选模式的复选框 */}
        {isSelectionMode && (
          <div className="flex-shrink-0 pt-1">
            <div
              className={cn(
                "w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200",
                isSelected
                  ? "bg-primary-500 border-primary-500"
                  : "border-gray-300 hover:border-primary-400"
              )}
            >
              {isSelected && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </div>
        )}

        {/* 头像/图标 */}
        <div className="flex-shrink-0 relative">
          {notification.avatar?.startsWith("http") ? (
            <img
              src={notification.avatar}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg">
              {notification.avatar || getTypeIcon()}
            </div>
          )}

          {/* 类型指示器 */}
          <div
            className={cn(
              "absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white flex items-center justify-center text-xs shadow-sm",
              getTypeColor()
            )}
          >
            {getTypeIcon()}
          </div>
        </div>

        {/* 内容 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h4
                className={cn(
                  "text-body font-medium mb-1 line-clamp-1",
                  !notification.isRead
                    ? "text-text-primary"
                    : "text-text-secondary"
                )}
              >
                {notification.title}
              </h4>
              <p className="text-body text-text-tertiary mb-2 line-clamp-2">
                {notification.content}
              </p>
              <div className="flex items-center gap-3">
                <span className="text-caption text-text-tertiary">
                  {notification.time}
                </span>
                {!notification.isRead && (
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                    <span className="text-caption text-primary-600 font-medium">
                      未读
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        {!isSelectionMode && (
          <div className="flex-shrink-0 opacity-30 group-hover:opacity-100 transition-all duration-200">
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(notification.id);
                }}
                className="p-2 hover:bg-coral-50 rounded-full transition-all duration-200 text-gray-400 hover:text-coral-500 hover:scale-110 hover:shadow-md"
                aria-label="删除通知"
                title="删除这条通知"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* 箭头指示器 */}
        {!isSelectionMode && notification.actionUrl && (
          <div className="flex-shrink-0 text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity">
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};
