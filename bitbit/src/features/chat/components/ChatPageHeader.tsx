import React from "react";
import { cn } from "@/shared/utils/cn";

interface ChatPageHeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  className?: string;
}

const ChatPageHeader: React.FC<ChatPageHeaderProps> = ({
  title = "消息",
  showBackButton = true,
  onBack,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center h-16 px-4 border-b border-gray-200 bg-white",
        className
      )}
    >
      {/* 返回按钮 */}
      {showBackButton && (
        <button
          onClick={onBack}
          className="p-2 mr-3 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="返回"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}

      {/* 标题 */}
      <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
    </div>
  );
};

export default ChatPageHeader;
