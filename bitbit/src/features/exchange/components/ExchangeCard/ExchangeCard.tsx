import React from "react";
import { Card, CardContent, Button, Icon, Avatar } from "@/components/ui";
import { cn } from "@/shared/utils/cn";

export interface ExchangeCardProps {
  id: string;
  title: string;
  condition: string;
  category: string;
  price: number;
  originalPrice?: number;
  image?: string;
  icon?: string;
  status?: "available" | "reserved" | "sold" | "hot" | "urgent" | "new";
  seller?: {
    name: string;
    avatar?: string;
    initials?: string;
    rating?: number;
    soldCount?: number;
  };
  stats?: {
    views: number;
    likes: number;
    comments: number;
  };
  timeAgo?: string;
  location?: string;
  isLiked?: boolean;
  layout?: "grid" | "list" | "compact" | "sidebar";
  onClick?: () => void;
  onExchange?: () => void;
  onContact?: () => void;
  onLike?: () => void;
  className?: string;
}

const statusConfig = {
  available: { label: "在售", color: "bg-primary-100 text-primary-500" },
  reserved: { label: "已预定", color: "bg-coral-100 text-coral-500" },
  sold: { label: "已售出", color: "bg-gray-200 text-text-tertiary" },
  hot: { label: "火热", color: "bg-sunflower-100 text-sunflower-500" },
  urgent: { label: "急售", color: "bg-lavender-100 text-lavender-500" },
  new: { label: "新品", color: "bg-mint-100 text-mint-500" },
};

export const ExchangeCard: React.FC<ExchangeCardProps> = ({
  title,
  condition,
  category,
  price,
  originalPrice,
  image,
  icon = "📦",
  status = "available",
  seller,
  stats,
  location,
  isLiked = false,
  layout = "grid",
  onClick,
  onExchange,
  onContact,
  onLike,
  className,
}) => {
  const statusStyle = statusConfig[status];
  const isDisabled = status === "reserved" || status === "sold";

  // 侧边栏布局 (用于详情页侧边栏推荐)
  if (layout === "sidebar") {
    return (
      <Card
        className={cn(
          "w-full h-[120px] overflow-hidden hover:shadow-modal transition-all duration-250 cursor-pointer",
          className
        )}
        onClick={onClick}
      >
        <CardContent className="p-3 h-full flex gap-3">
          {/* 左侧图片区域 */}
          <div className="w-16 h-16 flex-shrink-0 relative">
            <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-xl overflow-hidden">
              {image ? (
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-300">{icon}</span>
              )}
            </div>
            {/* 状态标签 */}
            <div
              className={cn(
                "absolute -top-1 -left-1 px-1.5 py-0.5 rounded text-[8px] font-medium",
                statusStyle.color
              )}
            >
              {statusStyle.label}
            </div>
          </div>

          {/* 右侧信息区域 */}
          <div className="flex-1 flex flex-col min-w-0">
            <h3 className="text-sm font-semibold text-text-primary line-clamp-2 mb-1">
              {title}
            </h3>
            <p className="text-xs text-text-secondary mb-2">
              {condition} | {category}
            </p>
            <div className="text-sm font-bold text-primary-500 mb-2">
              ¥{price.toLocaleString()}
            </div>

            {/* 发布者信息 */}
            {seller && (
              <div className="flex items-center gap-1 text-xs text-text-tertiary mt-auto">
                <div className="w-3 h-3 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-[6px] font-medium text-white">
                    {seller.initials || seller.name.charAt(0)}
                  </span>
                </div>
                <span className="truncate">{seller.name}</span>
              </div>
            )}
          </div>

          {/* 收藏按钮 */}
          <button
            className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0 self-start"
            onClick={(e) => {
              e.stopPropagation();
              onLike?.();
            }}
          >
            <Icon
              name={isLiked ? "heart-filled" : "heart-outline"}
              size="xs"
              className={cn(isLiked ? "text-coral-500" : "text-text-tertiary")}
            />
          </button>
        </CardContent>
      </Card>
    );
  }

  // 紧凑布局 (用于首页横向滚动)
  if (layout === "compact") {
    return (
      <Card
        className={cn(
          "w-[280px] h-[395px] overflow-hidden hover:shadow-modal hover:-translate-y-1 transition-all duration-250 cursor-pointer flex-shrink-0",
          className
        )}
        onClick={onClick}
      >
        <CardContent className="p-0 h-full flex flex-col">
          {/* 图片区域 */}
          <div className="relative p-4 pb-0 flex-shrink-0">
            <div className="w-full h-[150px] bg-gray-100 rounded-lg flex items-center justify-center text-2xl overflow-hidden">
              {image ? (
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-gray-300">{icon}</span>
              )}
            </div>

            {/* 收藏按钮 */}
            <button
              className="absolute top-6 right-6 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow-light hover:shadow-card transition-all duration-250"
              onClick={(e) => {
                e.stopPropagation();
                onLike?.();
              }}
            >
              <Icon
                name={isLiked ? "heart-filled" : "heart-outline"}
                size="sm"
                className={cn(
                  isLiked ? "text-coral-500" : "text-text-tertiary"
                )}
              />
            </button>

            {/* 状态标签 */}
            <div
              className={cn(
                "absolute top-6 left-6 px-2 py-1 rounded-lg text-[10px] font-medium",
                statusStyle.color
              )}
            >
              {statusStyle.label}
            </div>
          </div>

          {/* 内容区域 - 使用flex-1和justify-between确保底部对齐 */}
          <div className="p-4 flex-1 flex flex-col justify-between min-h-0">
            {/* 上半部分内容 */}
            <div>
              <h3 className="text-base font-semibold text-text-primary line-clamp-2 mb-2 leading-[1.3] min-h-[2.6rem] flex items-start">
                <span className="block">{title}</span>
              </h3>
              <p className="text-sm text-text-secondary mb-2">
                {condition} | {category}
              </p>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-primary-500">
                  ¥{price.toLocaleString()}
                </span>
                {originalPrice && originalPrice > price && (
                  <span className="text-sm text-text-tertiary line-through">
                    ¥{originalPrice.toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            {/* 底部区域 */}
            <div className="space-y-3 flex-shrink-0">
              {seller && (
                <div className="flex items-center gap-2">
                  <Avatar
                    src={seller.avatar}
                    alt={seller.name}
                    fallback={seller.initials || seller.name.charAt(0)}
                    size="sm"
                  />
                  <span className="text-sm text-text-secondary truncate">
                    {seller.name}
                  </span>
                  {seller.rating && (
                    <div className="flex items-center gap-1 ml-auto">
                      <span className="text-xs text-sunflower-500">⭐</span>
                      <span className="text-xs text-text-tertiary">
                        {seller.rating.toFixed(1)}
                      </span>
                    </div>
                  )}
                </div>
              )}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="primary"
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    onExchange?.();
                  }}
                  disabled={isDisabled}
                >
                  立即交换
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick?.();
                  }}
                >
                  详情
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // 列表布局
  if (layout === "list") {
    return (
      <Card
        className={cn(
          "w-full overflow-hidden hover:shadow-modal transition-all duration-250 cursor-pointer",
          className
        )}
        onClick={onClick}
      >
        <CardContent className="p-6">
          <div className="flex gap-6">
            {/* 左侧图片 */}
            <div className="w-32 h-32 flex-shrink-0 relative">
              <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-2xl overflow-hidden">
                {image ? (
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-300">{icon}</span>
                )}
              </div>
              {/* 状态标签 */}
              <div
                className={cn(
                  "absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium",
                  statusStyle.color
                )}
              >
                {statusStyle.label}
              </div>
            </div>

            {/* 中间内容 */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-text-primary line-clamp-2">
                  {title}
                </h3>
                <button
                  className="ml-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onLike?.();
                  }}
                >
                  <Icon
                    name={isLiked ? "heart-filled" : "heart-outline"}
                    size="sm"
                    className={cn(
                      isLiked ? "text-coral-500" : "text-text-tertiary"
                    )}
                  />
                </button>
              </div>

              <p className="text-text-secondary mb-3">
                {condition} | {category}
                {location && ` | ${location}`}
              </p>

              {/* 价格和统计 */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-primary-500">
                    ¥{price.toLocaleString()}
                  </span>
                  {originalPrice && originalPrice > price && (
                    <span className="text-sm text-text-tertiary line-through">
                      ¥{originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                {stats && (
                  <div className="flex items-center gap-4 text-sm text-text-tertiary">
                    <span className="flex items-center gap-1">
                      👁 {stats.views}
                    </span>
                    <span className="flex items-center gap-1">
                      ❤ {stats.likes}
                    </span>
                  </div>
                )}
              </div>

              {/* 底部信息和操作 */}
              <div className="flex items-center justify-between">
                {seller && (
                  <div className="flex items-center gap-2">
                    <Avatar
                      src={seller.avatar}
                      alt={seller.name}
                      fallback={seller.initials || seller.name.charAt(0)}
                      size="sm"
                    />
                    <div>
                      <span className="text-sm font-medium text-text-primary">
                        {seller.name}
                      </span>
                      {seller.rating && (
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-sunflower-500">⭐</span>
                          <span className="text-xs text-text-tertiary">
                            {seller.rating.toFixed(1)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      onContact?.();
                    }}
                  >
                    联系卖家
                  </Button>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      onExchange?.();
                    }}
                    disabled={isDisabled}
                  >
                    立即交换
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // 网格布局 (默认)
  return (
    <Card
      className={cn(
        "w-full min-h-[460px] overflow-hidden hover:shadow-modal hover:-translate-y-1 transition-all duration-250 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-0 h-full flex flex-col">
        {/* 图片区域 */}
        <div className="relative p-4 pb-0 flex-shrink-0">
          <div className="w-full h-[200px] bg-gray-100 rounded-lg flex items-center justify-center text-3xl overflow-hidden">
            {image ? (
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-300">{icon}</span>
            )}
          </div>

          {/* 收藏按钮 */}
          <button
            className="absolute top-6 right-6 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center shadow-light hover:shadow-card transition-all duration-250"
            onClick={(e) => {
              e.stopPropagation();
              onLike?.();
            }}
          >
            <Icon
              name={isLiked ? "heart-filled" : "heart-outline"}
              size="sm"
              className={cn(isLiked ? "text-coral-500" : "text-text-tertiary")}
            />
          </button>

          {/* 状态标签 */}
          <div
            className={cn(
              "absolute top-6 left-6 px-2 py-1 rounded-lg text-[10px] font-medium",
              statusStyle.color
            )}
          >
            {statusStyle.label}
          </div>
        </div>

        {/* 内容区域 */}
        <div className="p-4 flex-1 flex flex-col min-h-0">
          <h3 className="text-lg font-semibold text-text-primary line-clamp-2 mb-2 leading-tight">
            {title}
          </h3>
          <p className="text-sm text-text-secondary mb-3 flex-shrink-0">
            {condition} | {category}
          </p>

          {/* 价格区域 */}
          <div className="flex items-baseline gap-2 mb-4 flex-shrink-0">
            <span className="text-xl font-bold text-primary-500">
              ¥{price.toLocaleString()}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-text-tertiary line-through">
                ¥{originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* 统计信息 */}
          {stats && (
            <div className="flex items-center gap-4 mb-4 text-sm text-text-tertiary flex-shrink-0">
              <span className="flex items-center gap-1">👁 {stats.views}</span>
              <span className="flex items-center gap-1">❤ {stats.likes}</span>
              <span className="flex items-center gap-1">
                💬 {stats.comments}
              </span>
            </div>
          )}

          {/* 发布者和操作按钮 */}
          <div className="mt-auto space-y-3 flex-shrink-0">
            {seller && (
              <div className="flex items-center gap-2">
                <Avatar
                  src={seller.avatar}
                  alt={seller.name}
                  fallback={seller.initials || seller.name.charAt(0)}
                  size="sm"
                />
                <span className="text-sm text-text-secondary truncate">
                  {seller.name}
                </span>
                {seller.rating && (
                  <div className="flex items-center gap-1 ml-auto">
                    <span className="text-xs text-sunflower-500">⭐</span>
                    <span className="text-xs text-text-tertiary">
                      {seller.rating.toFixed(1)}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* 操作按钮 */}
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onContact?.();
                }}
              >
                联系
              </Button>
              <Button
                size="sm"
                variant="primary"
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation();
                  onExchange?.();
                }}
                disabled={isDisabled}
              >
                交换
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExchangeCard;
