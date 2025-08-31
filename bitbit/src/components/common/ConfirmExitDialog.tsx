import React from "react";
import { Button } from "@/components/ui";
import { cn } from "@/shared/utils/cn";

interface ConfirmExitDialogProps {
  /**
   * 是否显示对话框
   */
  isOpen: boolean;
  /**
   * 关闭对话框
   */
  onClose: () => void;
  /**
   * 确认退出（不保存）
   */
  onConfirmExit: () => void;
  /**
   * 保存并退出
   */
  onSaveAndExit: () => void;
  /**
   * 对话框标题
   */
  title?: string;
  /**
   * 对话框内容
   */
  content?: string;
  /**
   * 是否正在保存
   */
  isSaving?: boolean;
}

const ConfirmExitDialog: React.FC<ConfirmExitDialogProps> = ({
  isOpen,
  onClose,
  onConfirmExit,
  onSaveAndExit,
  title = "确认退出",
  content = "您有未保存的内容，是否要保存为草稿？",
  isSaving = false,
}) => {
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
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
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
          <p className="text-gray-600 leading-relaxed">{content}</p>
        </div>

        {/* 按钮区域 */}
        <div className="flex flex-col-reverse sm:flex-row gap-3">
          {/* 不保存，直接退出 */}
          <Button
            variant="outline"
            onClick={onConfirmExit}
            disabled={isSaving}
            className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
          >
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
            不保存退出
          </Button>

          {/* 保存并退出 */}
          <Button
            variant="primary"
            onClick={onSaveAndExit}
            disabled={isSaving}
            className="flex-1"
          >
            {isSaving ? (
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
                保存中...
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
                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                  />
                </svg>
                保存草稿并退出
              </>
            )}
          </Button>
        </div>

        {/* 取消按钮 */}
        <Button
          variant="ghost"
          onClick={onClose}
          disabled={isSaving}
          className="w-full mt-3 text-gray-500 hover:text-gray-700"
        >
          继续编辑
        </Button>
      </div>
    </div>
  );
};

export default ConfirmExitDialog;
