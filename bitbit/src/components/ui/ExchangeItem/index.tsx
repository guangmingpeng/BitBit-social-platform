import React from "react";
import Card, { CardContent } from "../Card";
import Button from "../Button";
import Icon from "../Icon";
import { cn } from "@/shared/utils/cn";

export interface ExchangeItemProps {
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

const ExchangeItem: React.FC<ExchangeItemProps> = ({
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
  timeAgo,
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

  // 侧边栏布局 (100%x120px) - 专门为侧边栏设计
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

  // 网格布局 - 响应式宽度，确保内容完整显示
  if (layout === "grid") {
    return (
      <Card
        className={cn(
          "w-full h-[440px] overflow-hidden hover:shadow-modal hover:-translate-y-1 transition-all duration-250 cursor-pointer",
          className
        )}
        onClick={onClick}
      >
        <CardContent className="p-0 h-full flex flex-col">
          {/* 图片区域 - 调整高度比例 */}
          <div className="relative p-4 pb-0">
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

          {/* 商品信息 - 优化间距和字体大小，增加底部padding */}
          <div className="flex-1 flex flex-col p-4 pt-3 pb-5">
            <h3 className="text-sm font-semibold text-text-primary line-clamp-1 mb-1.5">
              {title}
            </h3>
            <p className="text-xs text-text-secondary mb-2.5">
              {condition} | {category}
            </p>

            {/* 价格 */}
            <div className="flex items-baseline gap-2 mb-2.5">
              <span className="text-lg font-bold text-primary-500">
                ¥{price.toLocaleString()}
              </span>
              {originalPrice && (
                <span className="text-xs text-text-tertiary line-through">
                  ¥{originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* 发布者信息 */}
            {seller && (
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-5 h-5 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-[8px] font-medium text-white">
                    {seller.initials || seller.name.charAt(0)}
                  </span>
                </div>
                <span className="text-[10px] text-text-secondary truncate">
                  {seller.name} · {timeAgo}
                </span>
              </div>
            )}

            {/* 互动信息 */}
            {stats && (
              <div className="flex items-center gap-3 text-[9px] text-text-tertiary mb-4">
                <div className="flex items-center gap-1">
                  <Icon name="view" size="xs" />
                  <span>{stats.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="heart-outline" size="xs" />
                  <span>{stats.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="comment" size="xs" />
                  <span>{stats.comments}</span>
                </div>
              </div>
            )}

            {/* 操作按钮 - 确保在最底部有足够空间 */}
            <div className="flex gap-2 mt-auto">
              <Button
                variant={isDisabled ? "secondary" : "primary"}
                size="sm"
                className="flex-1 text-xs h-9 font-medium"
                disabled={isDisabled}
                onClick={(e) => {
                  e.stopPropagation();
                  onExchange?.();
                }}
              >
                {isDisabled ? statusStyle.label : "立即交换"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs h-9 font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  onClick?.();
                }}
              >
                详情
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // 列表布局 (100%x140px) - 增加高度确保所有内容适合
  if (layout === "list") {
    return (
      <Card
        className={cn(
          "w-full h-[140px] overflow-hidden hover:shadow-modal transition-all duration-250 cursor-pointer",
          className
        )}
        onClick={onClick}
      >
        <CardContent className="p-4 h-full flex gap-4">
          {/* 图片区域 */}
          <div className="w-[100px] h-[100px] bg-gray-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden self-center">
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

          {/* 商品信息 */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-text-primary line-clamp-1 mb-1">
              {title}
            </h3>
            <p className="text-xs text-text-secondary mb-1">
              {condition} | {category}
            </p>
            <p className="text-xs text-text-tertiary mb-2 line-clamp-1">
              详细描述信息...
            </p>

            {/* 价格和互动信息 */}
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-xl font-bold text-primary-500">
                ¥{price.toLocaleString()}
              </span>
              {originalPrice && (
                <span className="text-sm text-text-tertiary line-through">
                  ¥{originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {stats && (
              <div className="flex items-center gap-3 text-[10px] text-text-tertiary">
                <div className="flex items-center gap-1">
                  <Icon name="view" size="xs" />
                  <span>{stats.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="heart-outline" size="xs" />
                  <span>{stats.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="comment" size="xs" />
                  <span>{stats.comments}</span>
                </div>
                <span>· 🕒 {timeAgo}</span>
              </div>
            )}
          </div>

          {/* 发布者信息区域 */}
          {seller && (
            <div className="w-[120px] flex-shrink-0">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-[10px] font-medium text-white">
                    {seller.initials || seller.name.charAt(0)}
                  </span>
                </div>
                <span className="text-sm font-medium text-text-primary truncate">
                  {seller.name}
                </span>
              </div>
              {seller.rating && (
                <p className="text-[10px] text-text-secondary mb-2">
                  信用: ⭐⭐⭐⭐⭐ {seller.rating} · 已卖{seller.soldCount}件
                </p>
              )}

              {/* 状态标签 */}
              <div
                className={cn(
                  "inline-block px-2 py-1 rounded-lg text-[9px] font-medium mb-2",
                  statusStyle.color
                )}
              >
                {statusStyle.label}
              </div>
            </div>
          )}

          {/* 操作按钮区域 */}
          <div className="w-[90px] flex flex-col gap-1 flex-shrink-0 justify-center">
            <Button
              variant={isDisabled ? "secondary" : "primary"}
              size="sm"
              className="text-xs h-7 font-medium"
              disabled={isDisabled}
              onClick={(e) => {
                e.stopPropagation();
                onExchange?.();
              }}
            >
              {isDisabled ? statusStyle.label : "立即交换"}
            </Button>

            {onContact && (
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-7 font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                  onContact();
                }}
              >
                私信
              </Button>
            )}

            {/* 收藏按钮 */}
            <button
              className={cn(
                "w-6 h-6 rounded-full flex items-center justify-center transition-all duration-250 self-center mt-1",
                isLiked ? "bg-coral-100" : "bg-gray-100"
              )}
              onClick={(e) => {
                e.stopPropagation();
                onLike?.();
              }}
            >
              <Icon
                name={isLiked ? "heart-filled" : "heart-outline"}
                size="xs"
                className={cn(
                  isLiked ? "text-coral-500" : "text-text-tertiary"
                )}
              />
            </button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // 紧凑布局 (240x320px) - 首页推荐卡片，增加高度确保按钮完整显示
  return (
    <Card
      className={cn(
        "w-[240px] h-[320px] overflow-hidden hover:shadow-modal hover:-translate-y-1 transition-all duration-250 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <CardContent className="p-0 h-full flex flex-col">
        {/* 图片区域 - 采用顶部图片布局 */}
        <div className="relative p-3 pb-0">
          <div className="w-full h-[120px] bg-gray-100 rounded-lg flex items-center justify-center text-2xl overflow-hidden">
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
            className="absolute top-5 right-5 w-6 h-6 bg-white/90 rounded-full flex items-center justify-center shadow-light hover:shadow-card transition-all duration-250"
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

          {/* 状态标签 */}
          <div
            className={cn(
              "absolute top-5 left-5 px-2 py-1 rounded-lg text-[10px] font-medium",
              statusStyle.color
            )}
          >
            {statusStyle.label}
          </div>
        </div>

        {/* 商品信息区域 - 增加底部padding确保按钮有空间 */}
        <div className="flex-1 flex flex-col p-3 pt-2 pb-4">
          <h3 className="text-sm font-semibold text-text-primary line-clamp-2 mb-1">
            {title}
          </h3>
          <p className="text-xs text-text-secondary mb-2">
            {condition} | {category}
          </p>

          {/* 价格 */}
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-base font-bold text-primary-500">
              ¥{price.toLocaleString()}
            </span>
            {originalPrice && (
              <span className="text-xs text-text-tertiary line-through">
                ¥{originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* 发布者信息 */}
          {seller && (
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-4 bg-primary-500 rounded-full flex items-center justify-center">
                <span className="text-[8px] font-medium text-white">
                  {seller.initials || seller.name.charAt(0)}
                </span>
              </div>
              <span className="text-xs text-text-secondary truncate">
                {seller.name} · {timeAgo}
              </span>
            </div>
          )}

          {/* 操作按钮 - 确保在最底部有足够空间 */}
          <div className="flex gap-2 mt-auto">
            <Button
              variant={isDisabled ? "secondary" : "primary"}
              size="sm"
              className="flex-1 text-xs h-8 font-medium"
              disabled={isDisabled}
              onClick={(e) => {
                e.stopPropagation();
                onExchange?.();
              }}
            >
              {isDisabled ? statusStyle.label : "交换"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs h-8 font-medium"
              onClick={(e) => {
                e.stopPropagation();
                onClick?.();
              }}
            >
              详情
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExchangeItem;
