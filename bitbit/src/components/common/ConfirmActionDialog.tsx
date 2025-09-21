import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui";
import { cn } from "@/shared/utils/cn";

export type ActionType = "toggle-status" | "warning" | "info";

interface ActionConfig {
  title: string;
  content: string;
  confirmText: string;
  cancelText?: string;
  icon?: React.ReactNode;
  variant?: "warning" | "info";
}

interface ConfirmActionDialogProps {
  /**
   * 是否显示对话框
   */
  isOpen: boolean;
  /**
   * 关闭对话框
   */
  onClose: () => void;
  /**
   * 确认操作
   */
  onConfirm: () => void;
  /**
   * 操作类型，用于自动配置样式和文本
   */
  actionType?: ActionType;
  /**
   * 自定义配置，会覆盖actionType的默认配置
   */
  config?: Partial<ActionConfig>;
  /**
   * 是否正在执行操作
   */
  isLoading?: boolean;
  /**
   * 自定义类名
   */
  className?: string;
}

// 预定义的操作配置
const ACTION_CONFIGS: Record<ActionType, ActionConfig> = {
  "toggle-status": {
    title: "切换商品状态",
    content: "您可以下架商品使其不在市场显示，或重新上架已下架的商品。",
    confirmText: "确认操作",
    cancelText: "取消",
    variant: "warning",
    icon: (
      <svg
        className="w-5 h-5 text-orange-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
          clipRule="evenodd"
        />
        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
      </svg>
    ),
  },
  warning: {
    title: "确认操作",
    content: "此操作可能会影响您的数据，请确认是否继续？",
    confirmText: "确认",
    cancelText: "取消",
    variant: "warning",
    icon: (
      <svg
        className="w-5 h-5 text-yellow-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  info: {
    title: "确认操作",
    content: "请确认是否继续此操作？",
    confirmText: "确认",
    cancelText: "取消",
    variant: "info",
    icon: (
      <svg
        className="w-5 h-5 text-blue-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
};

const ConfirmActionDialog: React.FC<ConfirmActionDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  actionType = "warning",
  config = {},
  isLoading = false,
  className,
}) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  // 键盘事件处理
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isLoading) {
        onClose();
      }
    };

    // 设置默认焦点到取消按钮
    const timer = setTimeout(() => {
      cancelButtonRef.current?.focus();
    }, 100);

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, onClose, isLoading]);

  if (!isOpen) return null;

  // 合并配置
  const finalConfig = {
    ...ACTION_CONFIGS[actionType],
    ...config,
  };

  const getVariantStyles = (variant: ActionConfig["variant"]) => {
    switch (variant) {
      case "warning":
        return {
          confirmButton:
            "bg-orange-600 hover:bg-orange-700 text-white border-orange-600",
          cancelButton:
            "border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300",
          background: "bg-orange-50",
          border: "border-orange-200",
        };
      case "info":
        return {
          confirmButton:
            "bg-blue-600 hover:bg-blue-700 text-white border-blue-600",
          cancelButton:
            "border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300",
          background: "bg-blue-50",
          border: "border-blue-200",
        };
      default:
        return {
          confirmButton:
            "bg-gray-600 hover:bg-gray-700 text-white border-gray-600",
          cancelButton:
            "border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300",
          background: "bg-gray-50",
          border: "border-gray-200",
        };
    }
  };

  const styles = getVariantStyles(finalConfig.variant);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 遮罩层 */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* 对话框内容 */}
      <div
        className={cn(
          "relative bg-white rounded-2xl shadow-2xl border border-gray-200",
          "w-full max-w-md mx-4 p-6",
          "transform transition-all duration-300 ease-out",
          "animate-in fade-in zoom-in-95",
          className
        )}
      >
        {/* 头部 */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            {finalConfig.icon && (
              <div
                className={cn(
                  "p-2 rounded-full",
                  styles.background,
                  styles.border
                )}
              >
                {finalConfig.icon}
              </div>
            )}
            <h3 className="text-lg font-semibold text-gray-900">
              {finalConfig.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 disabled:opacity-50"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* 内容 */}
        <div className="mb-6">
          <p className="text-gray-600 leading-relaxed">{finalConfig.content}</p>
        </div>

        {/* 按钮区域 */}
        <div className="flex flex-col-reverse sm:flex-row gap-3">
          {/* 取消按钮 */}
          <Button
            ref={cancelButtonRef}
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className={cn("flex-1", styles.cancelButton)}
          >
            {finalConfig.cancelText}
          </Button>

          {/* 确认按钮 */}
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className={cn("flex-1", styles.confirmButton)}
          >
            {isLoading ? (
              <>
                <svg
                  className="w-4 h-4 mr-2 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                执行中...
              </>
            ) : (
              finalConfig.confirmText
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmActionDialog;
