import React from "react";
import { Card, CardContent, Tag, Button } from "@/components/ui";
import { cn } from "@/shared/utils/cn";
import type { FavoriteItem } from "@/shared/data/profileMockData";

interface FavoriteCardProps {
  favorite: FavoriteItem;
  onClick?: () => void;
  onRemove?: () => void;
  className?: string;
  // 多选模式相关属性
  isSelectionMode?: boolean;
  isSelected?: boolean;
  onToggleSelection?: (id: string, type: string) => void;
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({
  favorite,
  onClick,
  onRemove,
  className,
  isSelectionMode = false,
  isSelected = false,
  onToggleSelection,
}) => {
  const getTypeConfig = (type: FavoriteItem["type"]) => {
    switch (type) {
      case "activity":
        return {
          label: "活动",
          color: "bg-blue-100 text-blue-600",
          icon: "🎯",
        };
      case "post":
        return {
          label: "帖子",
          color: "bg-green-100 text-green-600",
          icon: "📝",
        };
      case "exchange":
        return {
          label: "商品",
          color: "bg-purple-100 text-purple-600",
          icon: "🛍️",
        };
      default:
        return {
          label: "内容",
          color: "bg-gray-100 text-gray-600",
          icon: "📄",
        };
    }
  };

  const typeConfig = getTypeConfig(favorite.type);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // 如果是选择模式，切换选择状态
    if (isSelectionMode) {
      onToggleSelection?.(favorite.id, favorite.type);
      return;
    }
    // 普通模式下的点击
    onClick?.();
  };

  return (
    <Card
      className={cn(
        "cursor-pointer hover:shadow-md transition-all duration-200 group",
        isSelectionMode && isSelected && "ring-2 ring-blue-500 bg-blue-50",
        className
      )}
      onClick={handleClick}
    >
      <CardContent className="p-3">
        <div className="flex gap-3">
          {/* 多选模式下的选择框 */}
          {isSelectionMode && (
            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-4">
              <div
                className={cn(
                  "w-5 h-5 border-2 rounded flex items-center justify-center transition-colors",
                  isSelected
                    ? "bg-blue-500 border-blue-500 text-white"
                    : "border-gray-300 hover:border-blue-400"
                )}
              >
                {isSelected && (
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            </div>
          )}

          {/* 内容图片 */}
          <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
            {favorite.image ? (
              <img
                src={favorite.image}
                alt={favorite.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-xl text-gray-300">{typeConfig.icon}</span>
            )}
          </div>

          {/* 收藏信息 */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <Tag className={cn(typeConfig.color, "text-xs")}>
                {typeConfig.label}
              </Tag>
              {/* 在选择模式下隐藏取消收藏按钮 */}
              {!isSelectionMode && (
                <Button
                  size="sm"
                  variant="outline"
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-600 border-red-200 hover:border-red-300 h-6 px-2 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove?.();
                  }}
                >
                  取消收藏
                </Button>
              )}
            </div>

            <h3 className="font-medium text-gray-900 line-clamp-2 mb-2 text-sm leading-tight">
              {favorite.title}
            </h3>

            {/* 作者和基本信息 */}
            <div className="flex items-center gap-1 text-xs text-gray-500 mb-1 flex-wrap">
              <span>{favorite.author.name}</span>
              {favorite.price && (
                <>
                  <span>•</span>
                  <span className="font-medium text-orange-600">
                    ¥{favorite.price}
                  </span>
                </>
              )}
              {favorite.date && favorite.location && (
                <>
                  <span>•</span>
                  <span className="truncate">
                    {favorite.date} · {favorite.location}
                  </span>
                </>
              )}
            </div>

            {/* 收藏时间 */}
            <div className="text-xs text-gray-400">
              收藏于 {favorite.favoriteTime}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FavoriteCard;
