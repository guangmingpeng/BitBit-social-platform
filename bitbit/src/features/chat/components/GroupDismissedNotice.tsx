import React from "react";
import { cn } from "@/shared/utils/cn";

interface GroupDismissedNoticeProps {
  dismissedAt?: Date;
  dismissedBy?: string;
  dismissedByName?: string;
  className?: string;
}

const GroupDismissedNotice: React.FC<GroupDismissedNoticeProps> = ({
  dismissedAt,
  dismissedByName,
  className,
}) => {
  const formatDismissedTime = () => {
    if (!dismissedAt) return "";

    const now = new Date();
    const diffMs = now.getTime() - dismissedAt.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 1) {
      return "刚刚";
    } else if (diffMinutes < 60) {
      return `${diffMinutes}分钟前`;
    } else if (diffHours < 24) {
      return `${diffHours}小时前`;
    } else if (diffDays < 7) {
      return `${diffDays}天前`;
    } else {
      return dismissedAt.toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  };

  return (
    <div
      className={cn("px-4 py-3 bg-gray-50 border-t border-gray-200", className)}
    >
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          {/* 解散图标 */}
          <div className="flex-shrink-0 w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center">
            <svg
              className="w-3 h-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"
              />
            </svg>
          </div>

          <div className="text-center">
            <div className="font-medium text-gray-600">群聊已解散</div>
            <div className="text-xs text-gray-400 mt-0.5">
              {dismissedByName && <span>由 {dismissedByName} </span>}
              {dismissedAt && <span>于 {formatDismissedTime()} </span>}
              解散，消息仅供查看
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDismissedNotice;
