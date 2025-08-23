import React from "react";
import Card, { CardContent } from "../Card";
import Avatar from "../Avatar";
import { cn } from "@/shared/utils/cn";

export interface CommunityPostProps {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  timeAgo: string;
  likes: number;
  comments: number;
  isLiked?: boolean;
  onClick?: () => void;
  onLike?: () => void;
  onComment?: () => void;
  className?: string;
}

const CommunityPost: React.FC<CommunityPostProps> = ({
  author,
  content,
  timeAgo,
  likes,
  comments,
  isLiked = false,
  onClick,
  onLike,
  onComment,
  className,
}) => {
  return (
    <Card
      className={cn("hover:shadow-md transition-all duration-300", className)}
      hover
      onClick={onClick}
    >
      <CardContent className="p-4 space-y-4">
        {/* 用户信息 */}
        <div className="flex items-center space-x-3">
          <Avatar
            src={author.avatar}
            fallback={author.name.charAt(0)}
            size="md"
          />
          <div>
            <p className="font-semibold text-text-primary">{author.name}</p>
            <p className="text-text-tertiary text-sm">{timeAgo}</p>
          </div>
        </div>

        {/* 内容 */}
        <p className="text-text-secondary leading-relaxed">{content}</p>

        {/* 互动按钮 */}
        <div className="flex items-center space-x-6 pt-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike?.();
            }}
            className={cn(
              "flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors",
              "border border-gray-200 hover:bg-gray-50",
              isLiked
                ? "text-coral-500 border-coral-200 bg-coral-50"
                : "text-text-tertiary"
            )}
          >
            <span>{isLiked ? "❤️" : "🤍"}</span>
            <span>赞 {likes}</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onComment?.();
            }}
            className="flex items-center space-x-1 px-3 py-1 rounded-full text-sm transition-colors border border-gray-200 hover:bg-gray-50 text-text-tertiary"
          >
            <span>💬</span>
            <span>评论 {comments}</span>
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommunityPost;
