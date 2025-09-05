import React from "react";
import { BaseCard } from "../../BaseCard";
import { cn } from "@/shared/utils/cn";
import { getLayoutClasses } from "../../BaseCard/variants";
import { ImageCarousel } from "@/components/common";
import {
  getActivityParticipationInfo,
  CURRENT_USER_ID,
} from "@/shared/utils/activityUtils";
import type { Activity } from "@/shared/types";
import type { ActivityCardProps } from "./types";

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  layout = "default",
  variant = "default",
  size = "md",
  className,

  // 回调函数
  onJoin,
  onLeave,
  onEdit,
  onNotify,
  onShare,
  onBookmark,
  onViewDetail,
  onClick,

  // 显示控制
  showPrice = true,
  showParticipants = true,
  showOrganizer = true,
  showDate = true,
  showLocation = true,
  showDescription = true,
  showImages = true,
  showActions = true,

  // 状态
  isBookmarked = false,
  ...baseProps
}) => {
  // 适配不同的Activity类型格式
  const adaptedActivity = {
    ...activity,
    maxParticipants:
      "maxParticipants" in activity
        ? activity.maxParticipants
        : "capacity" in activity
        ? (activity as unknown as { capacity: number }).capacity
        : 0,
    organizer:
      "username" in activity.organizer
        ? activity.organizer
        : {
            username:
              (activity.organizer as unknown as { name?: string })?.name ||
              "未知用户",
            avatar: (activity.organizer as unknown as { avatar?: string })
              ?.avatar,
          },
    isJoined: "isJoined" in activity ? activity.isJoined : false,
  };

  const {
    title,
    description,
    category,
    date,
    time,
    location,
    maxParticipants,
    currentParticipants,
    organizer,
    images,
    price,
    isFree = false,
    status = "published",
  } = adaptedActivity;

  const isJoined = adaptedActivity.isJoined;

  const getCategoryConfig = (category: string) => {
    switch (category) {
      case "music":
        return {
          icon: "🎵",
          label: "音乐",
          color: "bg-purple-50 text-purple-600",
          border: "border-purple-200",
        };
      case "food":
        return {
          icon: "🍴",
          label: "美食",
          color: "bg-orange-50 text-orange-600",
          border: "border-orange-200",
        };
      case "learning":
        return {
          icon: "📚",
          label: "学习",
          color: "bg-blue-50 text-blue-600",
          border: "border-blue-200",
        };
      case "reading":
        return {
          icon: "📖",
          label: "阅读",
          color: "bg-green-50 text-green-600",
          border: "border-green-200",
        };
      default:
        return {
          icon: "📅",
          label: "活动",
          color: "bg-gray-50 text-gray-600",
          border: "border-gray-200",
        };
    }
  };

  const getStatusDisplay = () => {
    // 使用统一的活动状态判断逻辑
    const hasCompleteActivityData =
      "startTime" in activity &&
      "endTime" in activity &&
      "organizer" in activity;

    if (hasCompleteActivityData) {
      const fullActivity = activity as Activity;
      const participationInfo = getActivityParticipationInfo(
        fullActivity,
        CURRENT_USER_ID
      );
      const { ended, isOrganizer, isJoined } = participationInfo;

      // 已结束状态的优先级最高
      if (ended) {
        if (isOrganizer) {
          return {
            text: "已结束",
            bgColor: "bg-gray-50",
            textColor: "text-gray-500",
            secondaryText: "已组织",
            secondaryBgColor: "bg-green-50",
            secondaryTextColor: "text-green-600",
            showAsLabel: true, // 标记为标签显示
          };
        } else {
          return {
            text: "已结束",
            bgColor: "bg-gray-50",
            textColor: "text-gray-500",
            showAsLabel: true, // 标记为标签显示
          };
        }
      }

      if (isOrganizer) {
        return {
          text: "已组织",
          bgColor: "bg-green-50",
          textColor: "text-green-600",
          showAsLabel: true, // 标记为标签显示
        };
      }

      if (isJoined) {
        return {
          text: "已报名",
          bgColor: "bg-blue-50",
          textColor: "text-blue-600",
          showAsLabel: true, // 标记为标签显示
        };
      }

      return {
        text: "可报名",
        bgColor: "bg-green-50",
        textColor: "text-green-600",
        showAsLabel: false, // 可报名状态不显示标签
      };
    }

    // 后备方案：基于简单的status字段
    switch (status) {
      case "registered":
        return {
          text: "已报名",
          bgColor: "bg-blue-50",
          textColor: "text-blue-600",
          showAsLabel: true,
        };
      case "organized":
        return {
          text: "已组织",
          bgColor: "bg-green-50",
          textColor: "text-green-600",
          showAsLabel: true,
        };
      case "ongoing":
        return {
          text: "进行中",
          bgColor: "bg-yellow-50",
          textColor: "text-yellow-600",
          showAsLabel: true,
        };
      case "ended":
      case "completed":
        return {
          text: "已结束",
          bgColor: "bg-gray-50",
          textColor: "text-gray-500",
          showAsLabel: true,
        };
      case "cancelled":
        return {
          text: "已取消",
          bgColor: "bg-red-50",
          textColor: "text-red-600",
          showAsLabel: true,
        };
      case "draft":
        return {
          text: "草稿",
          bgColor: "bg-gray-50",
          textColor: "text-gray-500",
          showAsLabel: true,
        };
      default:
        return {
          text: "可报名",
          bgColor: "bg-green-50",
          textColor: "text-green-600",
          showAsLabel: false,
        };
    }
  };

  const categoryConfig = getCategoryConfig(category);
  const statusConfig = getStatusDisplay();
  const layoutClass = getLayoutClasses(layout);

  // 使用统一的活动状态判断逻辑
  const hasCompleteActivityData =
    "startTime" in activity && "endTime" in activity && "organizer" in activity;

  // 计算活动状态
  let canJoin = false;
  let isOrganizer = false;
  let ended = false;

  if (hasCompleteActivityData) {
    const fullActivity = activity as Activity;
    const participationInfo = getActivityParticipationInfo(
      fullActivity,
      CURRENT_USER_ID
    );
    canJoin = participationInfo.canJoin;
    isOrganizer = participationInfo.isOrganizer;
    ended = participationInfo.ended;
  } else {
    // 后备逻辑：基于简单的status字段
    canJoin =
      status === "published" &&
      !isJoined &&
      currentParticipants < maxParticipants;
    isOrganizer = status === "organized";
    ended = status === "ended" || status === "completed";
  }

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else if (onViewDetail) {
      onViewDetail();
    }
  };

  const renderImages = () => {
    if (!showImages || !images || images.length === 0) return null;

    if (layout === "compact") {
      return (
        <div className="flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden bg-gray-100 relative">
          <ImageCarousel
            images={images}
            alt={title}
            height="80px"
            showIndicators={false}
            showArrows={false}
            showCounter={images.length > 1}
            rounded={false}
            className="rounded-lg"
          />
        </div>
      );
    }

    if (layout === "minimal") {
      return (
        <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden relative">
          <ImageCarousel
            images={images}
            alt={title}
            height="64px"
            showIndicators={false}
            showArrows={false}
            showCounter={images.length > 1}
            rounded={false}
            className="rounded-lg"
          />
        </div>
      );
    }

    return (
      <div className="relative w-full h-48 rounded-lg overflow-hidden">
        <ImageCarousel
          images={images}
          alt={title}
          height="192px"
          showIndicators={images.length > 1}
          showArrows={images.length > 1}
          showCounter={images.length > 1}
          className="rounded-none"
          rounded={false}
        />

        {/* 分类标签 */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className={cn(
              "px-2 py-1 rounded text-xs font-medium",
              categoryConfig.color
            )}
          >
            {categoryConfig.icon} {categoryConfig.label}
          </span>
        </div>

        {/* 状态标签 */}
        {statusConfig.showAsLabel && (
          <div className="absolute top-3 right-3 z-10 flex flex-col gap-1">
            <span
              className={cn(
                "px-2 py-1 rounded text-xs font-medium",
                statusConfig.bgColor,
                statusConfig.textColor
              )}
            >
              {statusConfig.text}
            </span>
            {/* 显示次要状态标签（如已组织+已结束） */}
            {statusConfig.secondaryText && (
              <span
                className={cn(
                  "px-2 py-1 rounded text-xs font-medium",
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
    );
  };

  const renderHeader = () => {
    if (!showOrganizer) return null;

    return (
      <div className="flex items-center justify-between">
        {showOrganizer && (
          <div className="flex items-center space-x-2">
            {organizer.avatar ? (
              <img
                src={organizer.avatar}
                alt={organizer.username}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                {organizer.username.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="text-sm font-medium text-gray-900">
              {organizer.username}
            </span>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <span
            className={cn(
              "px-2 py-1 rounded text-xs font-medium",
              categoryConfig.color
            )}
          >
            {categoryConfig.icon} {categoryConfig.label}
          </span>
          {statusConfig.showAsLabel && (
            <span
              className={cn(
                "px-2 py-1 rounded text-xs font-medium",
                statusConfig.bgColor,
                statusConfig.textColor
              )}
            >
              {statusConfig.text}
            </span>
          )}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    const isCompactLayout = layout === "compact" || layout === "minimal";

    return (
      <div
        className={cn("flex-1 flex flex-col", isCompactLayout ? "min-w-0" : "")}
      >
        {/* 紧凑布局专用的顶部信息 */}
        {layout === "compact" && (
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
                {/* 显示次要状态标签 */}
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
        )}

        {/* 水平布局统一的顶部标签行 - 所有布局都显示 */}
        {(layout === "horizontal" || layout === "list") && (
          <div className="flex items-center justify-between mb-2 w-full">
            <div className="flex-shrink-0">
              <span
                className={cn(
                  "px-2 py-1 rounded text-xs font-medium",
                  categoryConfig.color
                )}
              >
                {categoryConfig.icon} {categoryConfig.label}
              </span>
            </div>
            {/* 右侧标签容器使用固定位置，确保一致性 */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* 状态标签 */}
              {statusConfig.showAsLabel && (
                <div className="flex items-center gap-1">
                  <span
                    className={cn(
                      "px-2 py-1 rounded text-xs font-medium",
                      statusConfig.bgColor,
                      statusConfig.textColor
                    )}
                  >
                    {statusConfig.text}
                  </span>
                  {/* 显示次要状态标签 */}
                  {statusConfig.secondaryText && (
                    <span
                      className={cn(
                        "px-2 py-1 rounded text-xs font-medium",
                        statusConfig.secondaryBgColor,
                        statusConfig.secondaryTextColor
                      )}
                    >
                      {statusConfig.secondaryText}
                    </span>
                  )}
                </div>
              )}
              {/* 价格标签 */}
              {showPrice && (
                <span
                  className={cn(
                    "px-2 py-1 rounded text-xs font-medium",
                    isFree
                      ? "bg-green-50 text-green-600"
                      : "bg-gray-50 text-gray-900"
                  )}
                >
                  {isFree ? "免费" : `¥${price}`}
                </span>
              )}
            </div>
          </div>
        )}

        {/* 内容区域 - 使用 flex-1 确保标题和描述占据剩余空间 */}
        <div className="flex-1">
          <h3
            className={cn(
              "font-semibold text-gray-900 line-clamp-2",
              isCompactLayout ? "text-sm mb-1" : "text-lg"
            )}
          >
            {title}
          </h3>

          {showDescription && description && !isCompactLayout && (
            <p className="text-gray-600 text-sm line-clamp-2 mt-2">
              {description}
            </p>
          )}

          {/* 紧凑布局的时间地点信息 */}
          {layout === "compact" && (
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
          )}

          {/* 普通布局的时间地点信息 */}
          {layout !== "compact" && (showDate || showLocation) && (
            <div className="text-sm text-gray-500 mt-2">
              {showDate && (
                <div className="flex items-center space-x-1">
                  <span>📅</span>
                  <span>
                    {date} {time}
                  </span>
                </div>
              )}
              {showLocation && (
                <div className="flex items-center space-x-1 mt-1">
                  <span>📍</span>
                  <span className="line-clamp-1">{location}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 固定底部的参与者信息 - 只在非水平布局显示（水平布局已在顶部显示价格） */}
        {layout !== "horizontal" && layout !== "list" && showParticipants && (
          <div
            className={cn(
              "flex items-center justify-between mt-2 pt-2 border-t border-gray-100",
              layout === "compact" ? "text-xs" : "text-sm"
            )}
          >
            <div className="flex items-center space-x-1 text-gray-600">
              <span>👥</span>
              <span>
                {currentParticipants}/{maxParticipants}
              </span>
            </div>
            {showPrice && layout === "compact" && (
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

        {/* 水平布局的固定底部参与者信息 */}
        {(layout === "horizontal" || layout === "list") && showParticipants && (
          <div className="mt-auto pt-2">
            <div className="flex items-center space-x-1 text-gray-600 text-sm">
              <span>👥</span>
              <span>
                {currentParticipants}/{maxParticipants}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderActions = () => {
    if (!showActions) return null;

    // 使用已计算的状态变量
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

  return (
    <BaseCard
      {...baseProps}
      variant={variant}
      size={layout === "compact" ? "sm" : size}
      clickable={Boolean(onClick || onViewDetail)}
      onClick={handleCardClick}
      className={cn(
        // 水平布局不使用 layoutClass，避免双重 flex 冲突
        layout === "horizontal" || layout === "list" || layout === "compact"
          ? ""
          : layoutClass,
        className
      )}
    >
      {layout === "horizontal" || layout === "list" || layout === "compact" ? (
        <div
          className={cn("flex space-x-4", layout === "compact" && "space-x-3")}
        >
          {renderImages()}
          <div className="flex-1 min-w-0">
            {renderHeader()}
            {renderContent()}
            {layout !== "compact" && renderActions()}
          </div>
          {layout === "compact" && (
            <div className="flex-shrink-0">{renderActions()}</div>
          )}
        </div>
      ) : (
        // 默认布局 - 简化版本以匹配原版
        <div className="space-y-4">
          {renderImages()}

          <div className="p-4 space-y-3">
            {/* 标题和描述 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {title}
              </h3>
              {showDescription && description && (
                <p className="text-gray-600 mt-1 line-clamp-2">{description}</p>
              )}
            </div>

            {/* 时间和地点 */}
            <div className="space-y-2">
              {showDate && (
                <div className="flex items-center gap-2 text-gray-600">
                  <span>📅</span>
                  <span>
                    {date} {time}
                  </span>
                </div>
              )}
              {showLocation && (
                <div className="flex items-center gap-2 text-gray-600">
                  <span>📍</span>
                  <span className="line-clamp-1">{location}</span>
                </div>
              )}
            </div>

            {/* 组织者和参与人数 */}
            <div className="flex items-center justify-between">
              {showOrganizer && (
                <div className="flex items-center gap-2">
                  {organizer.avatar ? (
                    <img
                      src={organizer.avatar}
                      alt={organizer.username}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                      {organizer.username.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span className="text-gray-600">{organizer.username}</span>
                </div>
              )}
              {showParticipants && (
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <span>👥</span>
                  <span
                    className={
                      currentParticipants / maxParticipants >= 0.8
                        ? "text-orange-500"
                        : ""
                    }
                  >
                    {currentParticipants}/{maxParticipants}
                  </span>
                </div>
              )}
            </div>

            {/* 价格和按钮 */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              {showPrice && (
                <div className="text-lg font-semibold text-blue-600">
                  {isFree ? "免费" : `¥${price}`}
                </div>
              )}
              <div className="flex items-center gap-2">
                {onViewDetail && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDetail();
                    }}
                    className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    详情
                  </button>
                )}
                {onJoin && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (canJoin && !ended) {
                        onJoin();
                      }
                    }}
                    disabled={!canJoin || ended || isOrganizer}
                    className={cn(
                      "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      ended
                        ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                        : isOrganizer
                        ? "bg-green-100 text-green-600 cursor-default"
                        : isJoined
                        ? "bg-blue-100 text-blue-600 cursor-default"
                        : currentParticipants >= maxParticipants
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : canJoin
                        ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    )}
                  >
                    {ended
                      ? "已结束"
                      : isOrganizer
                      ? "已组织"
                      : isJoined
                      ? "已参加"
                      : currentParticipants >= maxParticipants
                      ? "已满员"
                      : canJoin
                      ? "立即参加"
                      : "无法参加"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </BaseCard>
  );
};
