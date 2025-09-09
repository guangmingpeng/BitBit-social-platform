import { type FC, useState } from "react";
import { Container } from "@/components/ui";
import { FloatingBackButton } from "@/components/common";
import { useSmartNavigation } from "@/shared/hooks/useSmartNavigation";
import {
  NotificationHeader,
  NotificationTabs,
  NotificationList,
  useNotifications,
  useNotificationsByType,
  useNotificationActions,
  type NotificationType,
} from "@/features/notifications";

const Notifications: FC = () => {
  const { smartGoBack } = useSmartNavigation();
  const [activeType, setActiveType] = useState<NotificationType>("all");

  // 获取通知数据
  const { stats } = useNotifications();
  const { notifications, loading } = useNotificationsByType(activeType);
  const {
    markAsRead,
    markAllAsRead,
    clearAllNotifications,
    deleteNotification,
  } = useNotificationActions();

  // 处理清空通知
  const handleClearAll = () => {
    if (window.confirm("确定要清空所有通知吗？此操作不可恢复。")) {
      clearAllNotifications();
    }
  };

  // 处理标记所有为已读
  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  return (
    <>
      <Container size="lg" className="py-6">
        {/* 头部 */}
        <NotificationHeader
          unreadCount={stats.unread}
          onMarkAllAsRead={handleMarkAllAsRead}
          onClearAll={handleClearAll}
        />

        {/* 筛选标签 */}
        <NotificationTabs
          activeType={activeType}
          onTypeChange={setActiveType}
          stats={stats}
        />

        {/* 通知列表 */}
        <NotificationList
          notifications={notifications}
          loading={loading}
          onMarkAsRead={markAsRead}
          onDelete={deleteNotification}
          emptyMessage={
            activeType === "all"
              ? "暂无通知"
              : `暂无${
                  activeType === "activity"
                    ? "活动"
                    : activeType === "social"
                    ? "社交"
                    : "系统"
                }通知`
          }
        />
      </Container>

      {/* 悬浮返回按钮 */}
      <FloatingBackButton
        onClick={smartGoBack}
        text="返回"
        variant="elegant"
        size="md"
      />
    </>
  );
};

export default Notifications;
