import React, { useRef, useEffect } from "react";
import Button from "../ui/Button";
import { cn } from "@/shared/utils/cn";

interface ConfirmBatchDeleteDialogProps {
  /**
   * 是否显示对话框
   */
  isOpen: boolean;
  /**
   * 关闭对话框
   */
  onClose: () => void;
  /**
   * 确认删除
   */
  onConfirm: () => void;
  /**
   * 选中的数量
   */
  selectedCount: number;
  /**
   * 是否正在处理
   */
  isLoading?: boolean;
}

const ConfirmBatchDeleteDialog: React.FC<ConfirmBatchDeleteDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  selectedCount,
  isLoading = false,
}) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && cancelButtonRef.current) {
      // 使用 setTimeout 确保对话框渲染完成后再设置焦点
      setTimeout(() => {
        cancelButtonRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

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
          "animate-in fade-in zoom-in-95"
        )}
      >
        {/* 头部 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {/* 警告图标 */}
            <div className="flex-shrink-0 w-8 h-8 bg-coral-50 rounded-full flex items-center justify-center">
              <svg
                className="w-5 h-5 text-coral-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              确认删除通知
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            disabled={isLoading}
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
          <p className="text-gray-600 leading-relaxed">
            您确定要删除选中的{" "}
            <span className="font-semibold text-coral-600">
              {selectedCount}
            </span>{" "}
            条通知吗？
          </p>
          <p className="text-sm text-gray-500 mt-2">
            此操作不可恢复，删除后将无法找回这些通知记录。
          </p>
        </div>

        {/* 按钮区域 */}
        <div className="flex flex-col-reverse sm:flex-row gap-3">
          {/* 确认删除按钮 - 使用低调的样式 */}
          <Button
            variant="outline"
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 border-coral-200 text-coral-600 hover:bg-coral-50 hover:border-coral-300"
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
                删除中...
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4 mr-2"
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
                确认删除
              </>
            )}
          </Button>

          {/* 取消按钮 - 使用主要样式，成为默认选项 */}
          <Button
            ref={cancelButtonRef}
            variant="primary"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1"
          >
            取消
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBatchDeleteDialog;
