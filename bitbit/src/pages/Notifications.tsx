import { type FC, useState } from "react";
import { Container } from "@/components/ui";
import {
  FloatingBackButton,
  ConfirmClearDialog,
  ConfirmBatchDeleteDialog,
} from "@/components/common";
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
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  // 多选模式相关状态
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showBatchDeleteDialog, setShowBatchDeleteDialog] = useState(false);
  const [isBatchDeleting, setIsBatchDeleting] = useState(false);

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
    setShowClearDialog(true);
  };

  // 确认清空通知
  const handleConfirmClear = async () => {
    setIsClearing(true);
    try {
      await clearAllNotifications();
      setShowClearDialog(false);
    } catch (error) {
      console.error("清空通知失败:", error);
    } finally {
      setIsClearing(false);
    }
  };

  // 关闭清空确认弹窗
  const handleCloseClearDialog = () => {
    if (!isClearing) {
      setShowClearDialog(false);
    }
  };

  // 处理标记所有为已读
  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  // 多选模式相关处理函数
  const handleToggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    setSelectedIds([]); // 清空选择
  };

  const handleToggleSelection = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds(notifications.map((n) => n.id));
  };

  const handleClearSelection = () => {
    setSelectedIds([]);
    setIsSelectionMode(false);
  };

  const handleDeleteSelected = () => {
    setShowBatchDeleteDialog(true);
  };

  const handleConfirmBatchDelete = async () => {
    setIsBatchDeleting(true);
    try {
      // 批量删除选中的通知
      for (const id of selectedIds) {
        await deleteNotification(id);
      }
      setSelectedIds([]);
      setIsSelectionMode(false);
      setShowBatchDeleteDialog(false);
    } catch (error) {
      console.error("批量删除通知失败:", error);
    } finally {
      setIsBatchDeleting(false);
    }
  };

  const handleCloseBatchDeleteDialog = () => {
    if (!isBatchDeleting) {
      setShowBatchDeleteDialog(false);
    }
  };

  return (
    <>
      <Container size="lg" className="py-6 space-y-6">
        {/* 头部 */}
        <NotificationHeader
          unreadCount={stats.unread}
          onMarkAllAsRead={handleMarkAllAsRead}
          onClearAll={handleClearAll}
          isSelectionMode={isSelectionMode}
          selectedCount={selectedIds.length}
          onToggleSelectionMode={handleToggleSelectionMode}
          onDeleteSelected={handleDeleteSelected}
          onSelectAll={handleSelectAll}
          onClearSelection={handleClearSelection}
        />

        {/* 筛选标签 - 在选择模式下隐藏 */}
        {!isSelectionMode && (
          <NotificationTabs
            activeType={activeType}
            onTypeChange={setActiveType}
            stats={stats}
          />
        )}

        {/* 通知列表 */}
        <div data-section="notifications">
          <NotificationList
            notifications={notifications}
            loading={loading}
            onMarkAsRead={markAsRead}
            onDelete={deleteNotification}
            isSelectionMode={isSelectionMode}
            selectedIds={selectedIds}
            onToggleSelection={handleToggleSelection}
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
        </div>
      </Container>

      {/* 悬浮返回按钮 */}
      <FloatingBackButton
        onClick={smartGoBack}
        text="返回"
        variant="elegant"
        size="md"
      />

      {/* 清空通知确认弹窗 */}
      <ConfirmClearDialog
        isOpen={showClearDialog}
        onClose={handleCloseClearDialog}
        onConfirm={handleConfirmClear}
        title="确认清空通知"
        content="您确定要清空所有通知吗？此操作不可恢复，所有通知记录将被永久删除。"
        confirmText="确认清空"
        cancelText="取消"
        isLoading={isClearing}
      />

      {/* 批量删除确认弹窗 */}
      <ConfirmBatchDeleteDialog
        isOpen={showBatchDeleteDialog}
        onClose={handleCloseBatchDeleteDialog}
        onConfirm={handleConfirmBatchDelete}
        selectedCount={selectedIds.length}
        isLoading={isBatchDeleting}
      />
    </>
  );
};

export default Notifications;
