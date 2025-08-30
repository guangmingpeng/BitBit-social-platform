import React from "react";
import { Card, CardContent, Tag, Avatar, Icon } from "@/components/ui";
import { ImageCarousel } from "@/components/common";
import { cn } from "@/shared/utils/cn";

export interface ActivityCardProps {
  id: string;
  title: string;
  description: string;
  category: "music" | "food" | "learning" | "reading";
  date: string;
  time: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  organizer: {
    username: string;
    avatar?: string;
  };
  images?: string[];
  price?: number;
  isFree?: boolean;
  isJoined?: boolean;
  layout?: "default" | "compact" | "horizontal" | "minimal";
  className?: string;
  onJoin?: () => void;
  onClick?: () => void;
  onViewDetail?: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
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
  isJoined = false,
  layout = "default",
  className,
  onJoin,
  onClick,
  onViewDetail,
}) => {
  const categoryConfig = {
    music: { variant: "music" as const, label: "音乐", emoji: "🎵" },
    food: { variant: "food" as const, label: "美食", emoji: "🍽️" },
    learning: { variant: "learning" as const, label: "学习", emoji: "📚" },
    reading: { variant: "reading" as const, label: "阅读", emoji: "📖" },
  };

  const participationRate = (currentParticipants / maxParticipants) * 100;
  const isAlmostFull = participationRate >= 80;
  const isFull = currentParticipants >= maxParticipants;

  const handleJoinClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onJoin?.();
  };

  const handleDetailClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onViewDetail?.();
  };

  const handleCardClick = () => {
    onClick?.();
  };

  // 紧凑布局（用于首页横向滚动）
  if (layout === "compact") {
    return (
      <Card
        className={cn(
          "group cursor-pointer overflow-hidden w-72 flex-shrink-0",
          className
        )}
        hover
        onClick={handleCardClick}
      >
        {images && images.length > 0 && (
          <div className="relative h-32 overflow-hidden">
            <ImageCarousel
              images={images}
              alt={title}
              height="128px"
              showIndicators={images.length > 1}
              showArrows={false}
              showCounter={images.length > 1}
              className="rounded-none"
            />
            <div className="absolute top-2 left-2">
              <Tag variant={categoryConfig[category].variant} size="sm">
                {categoryConfig[category].emoji}
              </Tag>
            </div>
            {isJoined && (
              <div className="absolute top-2 right-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success text-white">
                  已参加
                </span>
              </div>
            )}
          </div>
        )}
        <CardContent className="p-3 space-y-2">
          <div>
            <h3 className="text-sm font-semibold text-text-primary line-clamp-2 group-hover:text-primary-500 transition-colors">
              {title}
            </h3>
          </div>
          <div className="flex items-center gap-1 text-xs text-text-secondary">
            <Icon name="calendar" size="sm" />
            <span>{date}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-primary-500">
              {isFree ? "免费" : `¥${price}`}
            </div>
            <div className="flex items-center gap-1 text-caption text-text-tertiary">
              <Icon name="users" size="sm" />
              <span className={isAlmostFull ? "text-warning" : ""}>
                {currentParticipants}/{maxParticipants}
              </span>
            </div>
          </div>
          {/* 紧凑布局的按钮组 */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={handleDetailClick}
              className="flex-1 px-2 py-1 rounded text-xs font-medium border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              详情
            </button>
            <button
              onClick={handleJoinClick}
              disabled={isFull}
              className={cn(
                "flex-1 px-2 py-1 rounded text-xs font-medium transition-colors",
                isJoined
                  ? "bg-gray-100 text-text-secondary cursor-default"
                  : isFull
                  ? "bg-gray-100 text-text-tertiary cursor-not-allowed"
                  : "bg-primary-500 text-white hover:bg-primary-600"
              )}
            >
              {isJoined ? "已参加" : isFull ? "已满员" : "立即参加"}
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // 默认布局
  return (
    <Card
      className={cn("group cursor-pointer overflow-hidden", className)}
      hover
      onClick={handleCardClick}
    >
      {images && images.length > 0 && (
        <div className="relative h-48 overflow-hidden">
          <ImageCarousel
            images={images}
            alt={title}
            height="192px"
            showIndicators={images.length > 1}
            showArrows={images.length > 1}
            showCounter={images.length > 1}
            className="rounded-none"
          />
          <div className="absolute top-3 left-3 z-10">
            <Tag variant={categoryConfig[category].variant} size="sm">
              {categoryConfig[category].emoji} {categoryConfig[category].label}
            </Tag>
          </div>
          {isJoined && (
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-caption font-medium bg-success text-white">
                已参加
              </span>
            </div>
          )}
          {isFull && !isJoined && (
            <div className="absolute top-3 right-3 z-10">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-caption font-medium bg-error text-white">
                已满
              </span>
            </div>
          )}
        </div>
      )}

      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="text-subtitle font-semibold text-text-primary line-clamp-2 group-hover:text-primary-500 transition-colors">
            {title}
          </h3>
          <p className="text-body text-text-secondary mt-1 line-clamp-2">
            {description}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-body text-text-secondary">
            <Icon name="calendar" size="sm" />
            <span>
              {date} {time}
            </span>
          </div>
          <div className="flex items-center gap-2 text-body text-text-secondary">
            <Icon name="location" size="sm" />
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar
              src={organizer.avatar}
              fallback={organizer.username}
              size="sm"
            />
            <span className="text-body text-text-secondary">
              {organizer.username}
            </span>
          </div>
          <div className="flex items-center gap-1 text-caption text-text-tertiary">
            <Icon name="users" size="sm" />
            <span className={isAlmostFull ? "text-warning" : ""}>
              {currentParticipants}/{maxParticipants}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="text-subtitle font-semibold text-primary-500">
            {isFree ? "免费" : `¥${price}`}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDetailClick}
              className="px-3 py-1.5 rounded-lg text-body font-medium border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              详情
            </button>
            <button
              onClick={handleJoinClick}
              disabled={isFull}
              className={cn(
                "px-4 py-2 rounded-lg text-body font-medium transition-all duration-250",
                isJoined
                  ? "bg-gray-100 text-text-secondary cursor-default"
                  : isFull
                  ? "bg-gray-100 text-text-tertiary cursor-not-allowed"
                  : "bg-primary-500 text-white hover:bg-primary-600 active:scale-95"
              )}
            >
              {isJoined ? "已参加" : isFull ? "已满员" : "立即参加"}
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
