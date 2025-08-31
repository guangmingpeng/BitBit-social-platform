import React from "react";
import { cn } from "@/shared/utils/cn";
import type { PostCardProps } from "@/components/ui/cards";

interface CompactPostCardProps extends Omit<PostCardProps, "layout"> {
  className?: string;
}

export const CompactPostCard: React.FC<CompactPostCardProps> = ({
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
  className,
  onLike,
  onComment,
  onShare,
  onBookmark,
  onClick,
  onTagClick,
}) => {
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

  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200 p-4 cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="flex gap-3">
        {/* 头像和用户信息 */}
        <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
          {author.avatar ? (
            <img
              src={author.avatar}
              alt={author.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <span className="text-sm">👤</span>
            </div>
          )}
        </div>

        {/* 内容区域 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900">
                {author.name}
              </span>
              {author.isVerified && (
                <span className="text-blue-500 text-sm">✓</span>
              )}
            </div>
            <span className="text-xs text-gray-500">{publishTime}</span>
          </div>

          {/* 分类和标签 */}
          <div className="flex items-center gap-2 mb-2">
            {category && (
              <span
                className={`px-2 py-0.5 rounded text-xs font-medium ${categoryConfig.color}`}
              >
                {categoryConfig.icon} {category}
              </span>
            )}
            {tags.length > 0 && (
              <div className="flex gap-1">
                {tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded cursor-pointer hover:bg-gray-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      onTagClick?.(tag);
                    }}
                  >
                    #{tag}
                  </span>
                ))}
                {tags.length > 2 && (
                  <span className="text-xs text-gray-500">
                    +{tags.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* 内容预览 */}
          <p className="text-sm text-gray-900 line-clamp-2 mb-2">{content}</p>

          {/* 图片预览 */}
          {images && images.length > 0 && (
            <div className="flex gap-1 mb-2">
              {images.slice(0, 3).map((image, index) => (
                <div
                  key={index}
                  className="w-12 h-12 rounded bg-gray-100 overflow-hidden"
                >
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {images.length > 3 && (
                <div className="w-12 h-12 rounded bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                  +{images.length - 3}
                </div>
              )}
            </div>
          )}

          {/* 互动按钮 */}
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLike?.();
              }}
              className={cn(
                "flex items-center gap-1 hover:text-red-500 transition-colors",
                isLiked && "text-red-500"
              )}
            >
              <span>{isLiked ? "❤️" : "🤍"}</span>
              <span>{likes}</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onComment?.();
              }}
              className="flex items-center gap-1 hover:text-blue-500 transition-colors"
            >
              <span>💬</span>
              <span>{comments}</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onShare?.();
              }}
              className="flex items-center gap-1 hover:text-green-500 transition-colors"
            >
              <span>🔄</span>
              <span>{shares}</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookmark?.();
              }}
              className={cn(
                "flex items-center gap-1 hover:text-yellow-500 transition-colors ml-auto",
                isBookmarked && "text-yellow-500"
              )}
            >
              <span>{isBookmarked ? "⭐" : "☆"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
