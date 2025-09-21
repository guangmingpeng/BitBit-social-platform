import { useState } from "react";

export interface ExchangeItem {
  id: string;
  title: string;
  status?: "available" | "sold" | "hidden" | "deleted";
  [key: string]: unknown;
}

export interface UseExchangeActionsProps {
  onToggleStatus?: (
    itemId: string,
    newStatus: "available" | "hidden"
  ) => Promise<void>;
  onSuccess?: (action: "toggle-status", itemId: string) => void;
  onError?: (action: "toggle-status", error: string) => void;
}

export interface UseExchangeActionsReturn {
  // 状态
  isLoading: boolean;
  error: string | null;

  // 弹窗状态
  confirmDialog: {
    isOpen: boolean;
    type: "toggle-status" | null;
    itemId: string | null;
    itemTitle: string | null;
    currentStatus?: "available" | "hidden";
  };

  // 操作函数
  showToggleStatusDialog: (
    itemId: string,
    itemTitle: string,
    currentStatus?: "available" | "hidden"
  ) => void;
  closeDialog: () => void;
  confirmAction: () => Promise<void>;

  // 快捷操作函数（直接执行，不显示确认弹窗）
  toggleStatusDirectly: (
    itemId: string,
    currentStatus?: "available" | "hidden"
  ) => Promise<void>;
}

export const useExchangeActions = ({
  onToggleStatus,
  onSuccess,
  onError,
}: UseExchangeActionsProps = {}): UseExchangeActionsReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    type: "toggle-status" | null;
    itemId: string | null;
    itemTitle: string | null;
    currentStatus?: "available" | "hidden";
  }>({
    isOpen: false,
    type: null,
    itemId: null,
    itemTitle: null,
    currentStatus: undefined,
  });

  const showToggleStatusDialog = (
    itemId: string,
    itemTitle: string,
    currentStatus: "available" | "hidden" = "available"
  ) => {
    setConfirmDialog({
      isOpen: true,
      type: "toggle-status",
      itemId,
      itemTitle,
      currentStatus,
    });
    setError(null);
  };

  const closeDialog = () => {
    if (isLoading) return; // 加载中不允许关闭
    setConfirmDialog({
      isOpen: false,
      type: null,
      itemId: null,
      itemTitle: null,
      currentStatus: undefined,
    });
    setError(null);
  };

  const toggleStatusDirectly = async (
    itemId: string,
    currentStatus: "available" | "hidden" = "available"
  ) => {
    if (!onToggleStatus) {
      console.error("onToggleStatus handler not provided");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 根据当前状态切换到相反状态
      const newStatus = currentStatus === "available" ? "hidden" : "available";
      await onToggleStatus(itemId, newStatus);
      onSuccess?.("toggle-status", itemId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "操作失败";
      setError(errorMessage);
      onError?.("toggle-status", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmAction = async () => {
    if (!confirmDialog.itemId || !confirmDialog.type) {
      return;
    }

    const { itemId, currentStatus } = confirmDialog;

    setIsLoading(true);
    setError(null);

    try {
      if (onToggleStatus) {
        // 根据当前状态切换到相反状态
        const newStatus =
          (currentStatus || "available") === "available"
            ? "hidden"
            : "available";
        await onToggleStatus(itemId, newStatus);
        onSuccess?.("toggle-status", itemId);
      }

      // 成功后关闭弹窗
      setConfirmDialog({
        isOpen: false,
        type: null,
        itemId: null,
        itemTitle: null,
        currentStatus: undefined,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "操作失败";
      setError(errorMessage);
      onError?.("toggle-status", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    confirmDialog,
    showToggleStatusDialog,
    closeDialog,
    confirmAction,
    toggleStatusDirectly,
  };
};

export default useExchangeActions;
