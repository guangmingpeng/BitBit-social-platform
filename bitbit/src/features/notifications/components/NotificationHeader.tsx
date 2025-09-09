import React from "react";
import { Button } from "@/components/ui";

interface NotificationHeaderProps {
  unreadCount: number;
  onMarkAllAsRead: () => void;
  onClearAll: () => void;
  // 多选模式相关属性
  isSelectionMode?: boolean;
  selectedCount?: number;
  onToggleSelectionMode?: () => void;
  onDeleteSelected?: () => void;
  onSelectAll?: () => void;
  onClearSelection?: () => void;
}

export const NotificationHeader: React.FC<NotificationHeaderProps> = ({
  unreadCount,
  onMarkAllAsRead,
  onClearAll,
  isSelectionMode = false,
  selectedCount = 0,
  onToggleSelectionMode,
  onDeleteSelected,
  onSelectAll,
  onClearSelection,
}) => {
  // 如果是选择模式，显示选择相关的操作
  if (isSelectionMode) {
    return (
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h1 className="text-title-3 font-semibold text-text-primary">
              已选择 {selectedCount} 项
            </h1>
            <p className="text-caption text-text-secondary mt-1">
              选择要删除的通知
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onSelectAll}
              className="text-body font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50"
            >
              <span className="flex items-center gap-1">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                全选
              </span>
            </Button>
            {selectedCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onDeleteSelected}
                className="text-body font-medium text-coral-500 hover:text-coral-600 hover:bg-coral-50 hover:shadow-sm transition-all duration-200"
              >
                <span className="flex items-center gap-1">
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  删除选中
                </span>
              </Button>
            )}
            {/* 取消选择按钮 - 与其他按钮保持一致的设计 */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
              className="text-body font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50"
            >
              <span className="flex items-center gap-1">
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                取消
              </span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 普通模式的头部
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <div>
          <h1 className="text-title-3 font-semibold text-text-primary">
            通知中心
          </h1>
          {unreadCount > 0 && (
            <p className="text-caption text-text-secondary mt-1">
              {unreadCount} 条未读消息
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* 选择模式按钮 */}
          {onToggleSelectionMode && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleSelectionMode}
              className="text-body font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50"
            >
              <span className="flex items-center gap-1">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                选择
              </span>
            </Button>
          )}

          {unreadCount > 0 && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onMarkAllAsRead}
              className="text-body font-medium bg-primary-50 text-primary-600 hover:bg-primary-100 border-primary-200 hover:shadow-sm transition-all duration-200"
            >
              <span className="flex items-center gap-1">
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                全部已读
              </span>
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAll}
            className="text-body font-medium text-coral-500 hover:text-coral-600 hover:bg-coral-50 hover:shadow-sm transition-all duration-200"
          >
            <span className="flex items-center gap-1">
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              清空通知
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};
