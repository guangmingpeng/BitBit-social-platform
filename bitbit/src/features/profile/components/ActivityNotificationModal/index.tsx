import React, { useState } from "react";
import { cn } from "@/shared/utils/cn";

interface ActivityNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (title: string, content: string) => void;
  activityTitle: string;
  participantCount: number;
}

export const ActivityNotificationModal: React.FC<
  ActivityNotificationModalProps
> = ({ isOpen, onClose, onSend, activityTitle, participantCount }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!title.trim() || !content.trim()) {
      alert("请填写标题和内容");
      return;
    }

    setIsLoading(true);
    try {
      await onSend(title, content);
      setTitle("");
      setContent("");
      onClose();
    } catch (error) {
      console.error("发送通知失败:", error);
      alert("发送失败，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 背景遮罩 */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* 弹窗内容 */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* 标题 */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              发布活动通知
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
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

          {/* 活动信息 */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-blue-900 mb-2">{activityTitle}</h3>
            <p className="text-sm text-blue-700">
              将向 <span className="font-medium">{participantCount}</span>{" "}
              位参与者发送通知
            </p>
          </div>

          {/* 表单 */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                通知标题 *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="请输入通知标题"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                maxLength={50}
              />
              <div className="text-xs text-gray-500 mt-1">
                {title.length}/50
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                通知内容 *
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="请输入通知内容，如活动时间变更、地点调整、注意事项等"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                maxLength={500}
              />
              <div className="text-xs text-gray-500 mt-1">
                {content.length}/500
              </div>
            </div>
          </div>

          {/* 注意事项 */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4">
            <p className="text-sm text-amber-800">
              💡 <strong>温馨提示：</strong>
              通知将发送到所有已报名参与者的消息中心，请确保内容准确清晰。
            </p>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isLoading}
            >
              取消
            </button>
            <button
              onClick={handleSend}
              disabled={!title.trim() || !content.trim() || isLoading}
              className={cn(
                "flex-1 px-4 py-2 rounded-lg transition-colors",
                !title.trim() || !content.trim() || isLoading
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              )}
            >
              {isLoading ? "发送中..." : "发送通知"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
