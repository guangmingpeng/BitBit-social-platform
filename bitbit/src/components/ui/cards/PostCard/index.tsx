import React, { useState } from "react";
import { BaseCard } from "../../BaseCard";
import { cn } from "@/shared/utils/cn";
import { getLayoutClasses } from "../../BaseCard/variants";
import { ImageCarousel } from "@/components/common";
import type { PostCardProps } from "./types";

export const PostCard: React.FC<PostCardProps> = ({
  post,
  layout = "default",
  variant = "default",
  size = "md",
  className,

  // 回调函数
  onLike,
  onComment,
  onShare,
  onBookmark,
  onTagClick,
  onViewDetail,
  onClick,

  // 显示控制
  showAuthor = true,
  showImages = true,
  showCategory = true,
  showTags = true,
  showPublishTime = true,
  showInteractionStats = true,
  showActions = true,

  ...baseProps
}) => {
  const [showFullContent, setShowFullContent] = useState(false);

  const {
    author,
    content,
    images,
    category,
    tags = [],
    publishTime,
    likes,
    comments,
    shares,
    isLiked = false,
    isBookmarked = false,
  } = post;

  const getCategoryConfig = (category?: string) => {
    switch (category) {
      case "music":
        return { icon: "🎵", color: "bg-purple-50 text-purple-600" };
      case "food":
        return { icon: "🍴", color: "bg-orange-50 text-orange-600" };
      case "learning":
        return { icon: "📚", color: "bg-blue-50 text-blue-600" };
      case "reading":
        return { icon: "📖", color: "bg-green-50 text-green-600" };
      default:
        return { icon: "📝", color: "bg-gray-50 text-gray-600" };
    }
  };

  const categoryConfig = getCategoryConfig(category);
  const layoutClass = getLayoutClasses(layout);
  const isCompactLayout = layout === "compact" || layout === "minimal";

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else if (onViewDetail) {
      onViewDetail();
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  const renderAuthor = () => {
    if (!showAuthor) return null;

    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {author.avatar ? (
            <img
              src={author.avatar}
              alt={author.name}
              className={cn(
                "rounded-full",
                isCompactLayout ? "w-6 h-6" : "w-10 h-10"
              )}
            />
          ) : (
            <div
              className={cn(
                "rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium",
                isCompactLayout ? "w-6 h-6 text-xs" : "w-10 h-10 text-sm"
              )}
            >
              {author.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <div className="flex items-center space-x-1">
              <span
                className={cn(
                  "font-medium text-gray-900",
                  isCompactLayout ? "text-sm" : "text-base"
                )}
              >
                {author.name}
              </span>
              {author.isVerified && (
                <span className="text-blue-500 text-sm">✓</span>
              )}
            </div>
            {showPublishTime && (
              <span className="text-xs text-gray-500">{publishTime}</span>
            )}
          </div>
        </div>

        {showCategory && category && (
          <span
            className={cn(
              "px-2 py-1 rounded text-xs font-medium",
              categoryConfig.color
            )}
          >
            {categoryConfig.icon} {category}
          </span>
        )}
      </div>
    );
  };

  const renderContent = () => {
    const shouldTruncateContent =
      layout === "compact" ? content.length > 100 : content.length > 200;
    const truncateLength = layout === "compact" ? 100 : 200;
    const displayContent =
      shouldTruncateContent && !showFullContent
        ? content.slice(0, truncateLength) + "..."
        : content;

    return (
      <div className={cn("", isCompactLayout ? "space-y-2" : "space-y-3")}>
        <div>
          <p
            className={cn(
              "text-gray-900 leading-relaxed",
              isCompactLayout ? "text-sm" : "text-base",
              shouldTruncateContent && !showFullContent ? "" : ""
            )}
          >
            {displayContent}
            {shouldTruncateContent && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFullContent(!showFullContent);
                }}
                className={cn(
                  "ml-2 font-medium transition-colors text-blue-600 hover:text-blue-700",
                  isCompactLayout ? "text-xs" : "text-sm"
                )}
              >
                {showFullContent ? "收起" : "展开"}
              </button>
            )}
          </p>
        </div>

        {showTags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, isCompactLayout ? 3 : 5).map((tag, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  onTagClick?.(tag);
                }}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200 transition-colors"
              >
                #{tag}
              </button>
            ))}
            {tags.length > (isCompactLayout ? 3 : 5) && (
              <span className="text-xs text-gray-500">
                +{tags.length - (isCompactLayout ? 3 : 5)}
              </span>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderImages = () => {
    if (!showImages || !images || images.length === 0) return null;

    if (isCompactLayout) {
      return (
        <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
          <ImageCarousel
            images={images}
            alt="Post image"
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
      <div className="aspect-video">
        <ImageCarousel
          images={images}
          alt="帖子图片"
          height="100%"
          showIndicators={images.length > 1}
          showArrows={images.length > 1}
          showCounter={images.length > 1}
          onImageClick={(index, image) => {
            console.log("点击图片:", index, image);
          }}
        />
      </div>
    );
  };

  const renderStats = () => {
    if (!showInteractionStats) return null;

    return (
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          <span>{formatNumber(likes)} 点赞</span>
          <span>{formatNumber(comments)} 评论</span>
          <span>{formatNumber(shares)} 分享</span>
        </div>
      </div>
    );
  };

  const renderActions = () => {
    if (!showActions) return null;

    return (
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike?.();
            }}
            className={cn(
              "flex items-center space-x-1 text-sm transition-colors",
              isLiked
                ? "text-red-500 hover:text-red-600"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            <span>{isLiked ? "❤️" : "🤍"}</span>
            <span>{formatNumber(likes)}</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onComment?.();
            }}
            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <span>💬</span>
            <span>{formatNumber(comments)}</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onShare?.();
            }}
            className="flex items-center space-x-1 text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            <span>📤</span>
            <span>{formatNumber(shares)}</span>
          </button>
        </div>

        {onBookmark && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBookmark();
            }}
            className={cn(
              "text-sm transition-colors",
              isBookmarked
                ? "text-yellow-500 hover:text-yellow-600"
                : "text-gray-500 hover:text-gray-700"
            )}
            title={isBookmarked ? "取消收藏" : "收藏"}
          >
            {isBookmarked ? "⭐" : "☆"}
          </button>
        )}
      </div>
    );
  };

  return (
    <BaseCard
      {...baseProps}
      variant={variant}
      size={size}
      clickable={Boolean(onClick || onViewDetail)}
      onClick={handleCardClick}
      className={cn(layoutClass, className)}
    >
      {layout === "horizontal" || layout === "list" ? (
        <div className="flex space-x-4">
          {renderImages()}
          <div className="flex-1 min-w-0 space-y-2">
            {renderAuthor()}
            {renderContent()}
            {renderStats()}
            {renderActions()}
          </div>
        </div>
      ) : (
        <div className={layoutClass}>
          {renderAuthor()}
          {renderContent()}
          {renderImages()}
          {renderStats()}
          {renderActions()}
        </div>
      )}
    </BaseCard>
  );
};
