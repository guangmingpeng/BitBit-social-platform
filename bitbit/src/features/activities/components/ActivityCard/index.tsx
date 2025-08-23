import React from "react";
import { Card, CardContent, Tag, Avatar } from "@/components/ui";
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
    name: string;
    avatar?: string;
  };
  images?: string[];
  price?: number;
  isFree?: boolean;
  isJoined?: boolean;
  className?: string;
  onJoin?: () => void;
  onClick?: () => void;
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
  className,
  onJoin,
  onClick,
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

  const handleCardClick = () => {
    onClick?.();
  };

  return (
    <Card
      className={cn("group cursor-pointer overflow-hidden", className)}
      hover
      onClick={handleCardClick}
    >
      {/* 活动图片 */}
      {images && images.length > 0 && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={images[0]}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* 图片上的标签 */}
          <div className="absolute top-3 left-3">
            <Tag variant={categoryConfig[category].variant} size="sm">
              {categoryConfig[category].emoji} {categoryConfig[category].label}
            </Tag>
          </div>
          {/* 参与状态标识 */}
          {isJoined && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-caption font-medium bg-success text-white">
                已参加
              </span>
            </div>
          )}
          {isFull && !isJoined && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-caption font-medium bg-error text-white">
                已满
              </span>
            </div>
          )}
        </div>
      )}

      <CardContent className="p-4 space-y-3">
        {/* 标题和描述 */}
        <div>
          <h3 className="text-subtitle font-semibold text-text-primary line-clamp-2 group-hover:text-primary-500 transition-colors">
            {title}
          </h3>
          <p className="text-body text-text-secondary mt-1 line-clamp-2">
            {description}
          </p>
        </div>

        {/* 时间和地点 */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-body text-text-secondary">
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              {date} {time}
            </span>
          </div>
          <div className="flex items-center gap-2 text-body text-text-secondary">
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="line-clamp-1">{location}</span>
          </div>
        </div>

        {/* 组织者和参与人数 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar
              src={organizer.avatar}
              fallback={organizer.name}
              size="sm"
            />
            <span className="text-body text-text-secondary">
              {organizer.name}
            </span>
          </div>
          <div className="flex items-center gap-1 text-caption text-text-tertiary">
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
            <span className={isAlmostFull ? "text-warning" : ""}>
              {currentParticipants}/{maxParticipants}
            </span>
          </div>
        </div>

        {/* 价格和操作按钮 */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="text-subtitle font-semibold text-primary-500">
            {isFree ? "免费" : `¥${price}`}
          </div>
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
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
