import React from "react";
import { NotificationItem } from "./NotificationItem";
import type { Notification } from "../types";

interface NotificationListProps {
  notifications: Notification[];
  loading: boolean;
  onMarkAsRead: (id: string) => void;
  onDelete?: (id: string) => void;
  emptyMessage?: string;
  // 多选模式相关属性
  isSelectionMode?: boolean;
  selectedIds?: string[];
  onToggleSelection?: (id: string) => void;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  loading,
  onMarkAsRead,
  onDelete,
  emptyMessage = "暂无通知",
  isSelectionMode = false,
  selectedIds = [],
  onToggleSelection,
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mt-6">
        <div className="p-12 text-center">
          <div className="inline-flex items-center gap-3 text-text-tertiary">
            <div className="w-5 h-5 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-body">加载中...</span>
          </div>
        </div>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden mt-6">
        <div className="p-12 text-center text-text-tertiary">
          <div className="text-6xl mb-4">🔔</div>
          <h3 className="text-subtitle font-medium mb-2 text-text-secondary">
            {emptyMessage}
          </h3>
          <p className="text-body">所有通知都会在这里显示</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden mt-6">
      <div className="divide-y divide-gray-100">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onMarkAsRead={onMarkAsRead}
            onDelete={onDelete}
            isSelectionMode={isSelectionMode}
            isSelected={selectedIds.includes(notification.id)}
            onToggleSelection={onToggleSelection}
          />
        ))}
      </div>
    </div>
  );
};
