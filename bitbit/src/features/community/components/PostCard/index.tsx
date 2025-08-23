import React, { useState } from "react";
import { Card, CardContent, Avatar, Tag } from "@/components/ui";
import { cn } from "@/shared/utils/cn";

export interface PostCardProps {
  id: string;
  author: {
    name: string;
    avatar?: string;
    isVerified?: boolean;
  };
  content: string;
  images?: string[];
  category?: "music" | "food" | "learning" | "reading";
  publishTime: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  className?: string;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onBookmark?: () => void;
  onClick?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({
  author,
  content,
  images,
  category,
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
}) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categoryConfig = {
    music: { variant: "music" as const, label: "音乐", emoji: "🎵" },
    food: { variant: "food" as const, label: "美食", emoji: "🍽️" },
    learning: { variant: "learning" as const, label: "学习", emoji: "📚" },
    reading: { variant: "reading" as const, label: "阅读", emoji: "📖" },
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike?.();
  };

  const handleCommentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onComment?.();
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare?.();
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onBookmark?.();
  };

  const handleCardClick = () => {
    onClick?.();
  };

  const shouldTruncateContent = content.length > 200;
  const displayContent =
    shouldTruncateContent && !showFullContent
      ? content.slice(0, 200) + "..."
      : content;

  return (
    <Card
      className={cn("group cursor-pointer", className)}
      hover
      onClick={handleCardClick}
    >
      <CardContent className="p-4 space-y-4">
        {/* 作者信息 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar src={author.avatar} fallback={author.name} size="md" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-body font-medium text-text-primary">
                  {author.name}
                </span>
                {author.isVerified && (
                  <svg
                    className="w-4 h-4 text-primary-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
              <span className="text-caption text-text-tertiary">
                {publishTime}
              </span>
            </div>
          </div>
          {category && (
            <Tag variant={categoryConfig[category].variant} size="sm">
              {categoryConfig[category].emoji} {categoryConfig[category].label}
            </Tag>
          )}
        </div>

        {/* 内容 */}
        <div className="space-y-3">
          <div className="text-body text-text-primary">
            {displayContent}
            {shouldTruncateContent && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFullContent(!showFullContent);
                }}
                className="ml-2 text-primary-500 hover:text-primary-600 font-medium"
              >
                {showFullContent ? "收起" : "展开"}
              </button>
            )}
          </div>

          {/* 图片轮播 */}
          {images && images.length > 0 && (
            <div className="relative rounded-lg overflow-hidden bg-gray-100">
              {images.length === 1 ? (
                // 单张图片
                <div className="aspect-video">
                  <img
                    src={images[0]}
                    alt="图片"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : (
                // 多张图片轮播
                <div className="aspect-video relative">
                  <img
                    src={images[currentImageIndex]}
                    alt={`图片 ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* 图片指示器 */}
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                        className={cn(
                          "w-2 h-2 rounded-full transition-all",
                          index === currentImageIndex
                            ? "bg-white"
                            : "bg-white/50"
                        )}
                      />
                    ))}
                  </div>

                  {/* 左右切换按钮 */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex((prev) =>
                            prev === 0 ? images.length - 1 : prev - 1
                          );
                        }}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex((prev) =>
                            prev === images.length - 1 ? 0 : prev + 1
                          );
                        }}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </>
                  )}

                  {/* 图片计数 */}
                  {images.length > 1 && (
                    <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
                      {currentImageIndex + 1}/{images.length}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 互动按钮 */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-6">
            <button
              onClick={handleLikeClick}
              className={cn(
                "flex items-center gap-2 text-body transition-colors",
                isLiked
                  ? "text-red-500 hover:text-red-600"
                  : "text-text-tertiary hover:text-red-500"
              )}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill={isLiked ? "currentColor" : "none"}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <span>{likes}</span>
            </button>

            <button
              onClick={handleCommentClick}
              className="flex items-center gap-2 text-body text-text-tertiary hover:text-primary-500 transition-colors"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span>{comments}</span>
            </button>

            <button
              onClick={handleShareClick}
              className="flex items-center gap-2 text-body text-text-tertiary hover:text-primary-500 transition-colors"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              <span>{shares}</span>
            </button>
          </div>

          <button
            onClick={handleBookmarkClick}
            className={cn(
              "p-2 rounded-lg transition-colors",
              isBookmarked
                ? "text-warning bg-sunflower-100"
                : "text-text-tertiary hover:text-warning hover:bg-sunflower-100"
            )}
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 20 20"
              fill={isBookmarked ? "currentColor" : "none"}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M5 5a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 19V5z"
              />
            </svg>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
