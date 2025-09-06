import React from "react";
import { cn } from "@/shared/utils/cn";

interface ActivityActionsProps {
  layout: "default" | "horizontal" | "list" | "compact" | "minimal";
  showActions: boolean;
  canJoin: boolean;
  isOrganizer: boolean;
  ended: boolean;
  isJoined: boolean;
  isBookmarked: boolean;
  onJoin?: () => void;
  onLeave?: () => void;
  onEdit?: () => void;
  onNotify?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
}

export const ActivityActions: React.FC<ActivityActionsProps> = ({
  layout,
  showActions,
  canJoin,
  isOrganizer,
  ended,
  isJoined,
  isBookmarked,
  onJoin,
  onLeave,
  onEdit,
  onNotify,
  onShare,
  onBookmark,
}) => {
  if (!showActions) return null;

  const canNotify = isOrganizer && !ended && !!onNotify;
  const canEdit = isOrganizer && !!onEdit;
  const canActuallyLeave = isJoined && !ended && !isOrganizer;

  if (layout === "compact") {
    return (
      <div className="flex flex-col justify-center space-y-1">
        {canEdit && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.();
            }}
            className="text-blue-600 hover:text-blue-700 text-xs font-medium px-2 py-1 rounded hover:bg-blue-50 whitespace-nowrap"
          >
            编辑
          </button>
        )}
        {canNotify && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNotify?.();
            }}
            className="text-orange-600 hover:text-orange-700 text-xs font-medium px-2 py-1 rounded hover:bg-orange-50 whitespace-nowrap"
          >
            通知更新
          </button>
        )}
      </div>
    );
  }

  if (layout === "minimal") {
    return (
      <div className="flex items-center space-x-2">
        {canEdit && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.();
            }}
            className="text-blue-600 hover:text-blue-700 text-sm"
          >
            编辑
          </button>
        )}
        {canNotify && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNotify?.();
            }}
            className="text-orange-600 hover:text-orange-700 text-sm"
          >
            发送更新
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
      <div className="flex items-center space-x-3">
        {canJoin && onJoin && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onJoin();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
          >
            报名参加
          </button>
        )}
        {canActuallyLeave && onLeave && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLeave();
            }}
            className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 text-sm font-medium"
          >
            取消报名
          </button>
        )}
        {canEdit && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.();
            }}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium"
          >
            编辑
          </button>
        )}
        {canNotify && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNotify?.();
            }}
            className="px-4 py-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 text-sm font-medium"
          >
            发送活动更新
          </button>
        )}
      </div>

      <div className="flex items-center space-x-2">
        {onShare && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onShare();
            }}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            title="分享"
          >
            📤
          </button>
        )}
        {onBookmark && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBookmark();
            }}
            className={cn(
              "p-2 rounded-lg hover:bg-gray-100",
              isBookmarked
                ? "text-yellow-500"
                : "text-gray-400 hover:text-gray-600"
            )}
            title={isBookmarked ? "取消收藏" : "收藏"}
          >
            {isBookmarked ? "⭐" : "☆"}
          </button>
        )}
      </div>
    </div>
  );
};
