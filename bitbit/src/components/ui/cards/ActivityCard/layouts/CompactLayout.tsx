import React from "react";
import { cn } from "@/shared/utils/cn";
import { ActivityImages } from "../ActivityImages";
import { ActivityActions } from "../ActivityActions";

interface CompactLayoutProps {
  adaptedActivity: Record<string, any>;
  categoryConfig: Record<string, any>;
  statusConfig: Record<string, any>;
  showImages: boolean;
  showDate: boolean;
  showLocation: boolean;
  showParticipants: boolean;
  showPrice: boolean;
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

export const CompactLayout: React.FC<CompactLayoutProps> = ({
  adaptedActivity,
  categoryConfig,
  statusConfig,
  showImages,
  showDate,
  showLocation,
  showParticipants,
  showPrice,
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
  const {
    title,
    date,
    time,
    location,
    images,
    price,
    isFree,
    currentParticipants,
    maxParticipants,
  } = adaptedActivity;

  return (
    <div className="flex space-x-3">
      <ActivityImages
        images={images}
        title={title}
        layout="compact"
        categoryConfig={categoryConfig}
        statusConfig={statusConfig}
        showImages={showImages}
      />

      <div className="flex-1 min-w-0">
        {/* 顶部标签 */}
        <div className="flex items-center justify-between mb-1">
          <span
            className={cn(
              "px-2 py-0.5 rounded-full text-xs font-medium",
              categoryConfig.color
            )}
          >
            {categoryConfig.icon} {categoryConfig.label}
          </span>
          {statusConfig.showAsLabel && (
            <div className="flex items-center gap-1">
              <span
                className={cn(
                  "px-2 py-0.5 rounded-full text-xs",
                  statusConfig.bgColor,
                  statusConfig.textColor
                )}
              >
                {statusConfig.text}
              </span>
              {statusConfig.secondaryText && (
                <span
                  className={cn(
                    "px-2 py-0.5 rounded-full text-xs",
                    statusConfig.secondaryBgColor,
                    statusConfig.secondaryTextColor
                  )}
                >
                  {statusConfig.secondaryText}
                </span>
              )}
            </div>
          )}
        </div>

        {/* 标题 */}
        <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm mb-1">
          {title}
        </h3>

        {/* 时间地点信息 */}
        <div className="text-xs text-gray-500 space-y-0.5 mt-1">
          {showDate && (
            <div className="flex items-center space-x-1">
              <span>📅</span>
              <span>
                {date} {time}
              </span>
            </div>
          )}
          {showLocation && (
            <div className="flex items-center space-x-1">
              <span>📍</span>
              <span className="line-clamp-1">{location}</span>
            </div>
          )}
        </div>

        {/* 参与者信息 */}
        {showParticipants && (
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 text-xs">
            <div className="flex items-center space-x-1 text-gray-600">
              <span>👥</span>
              <span>
                {currentParticipants}/{maxParticipants}
              </span>
            </div>
            {showPrice && (
              <div className="font-medium text-xs">
                {isFree ? (
                  <span className="text-green-600">免费</span>
                ) : (
                  <span className="text-gray-900">¥{price}</span>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* 操作按钮 */}
      <div className="flex-shrink-0">
        <ActivityActions
          layout="compact"
          showActions={showActions}
          canJoin={canJoin}
          isOrganizer={isOrganizer}
          ended={ended}
          isJoined={isJoined}
          isBookmarked={isBookmarked}
          onJoin={onJoin}
          onLeave={onLeave}
          onEdit={onEdit}
          onNotify={onNotify}
          onShare={onShare}
          onBookmark={onBookmark}
        />
      </div>
    </div>
  );
};
