import React from "react";
import { Card, CardContent, Tag, Button } from "@/components/ui";
import { cn } from "@/shared/utils/cn";
import type { FavoriteItem } from "@/shared/data/profileMockData";

interface FavoriteCardProps {
  favorite: FavoriteItem;
  onClick?: () => void;
  onRemove?: () => void;
  className?: string;
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({
  favorite,
  onClick,
  onRemove,
  className,
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

  return (
    <Card
      className={cn(
        "cursor-pointer hover:shadow-md transition-all duration-200 group",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-3">
        <div className="flex gap-3">
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
