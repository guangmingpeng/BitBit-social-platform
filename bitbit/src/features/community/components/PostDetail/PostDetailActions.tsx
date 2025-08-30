import { type FC } from "react";
import { Button } from "@/components/ui";

interface PostDetailActionsProps {
  likes: number;
  comments: number;
  views: number;
  isLiked: boolean;
  isBookmarked: boolean;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
  onBookmark: () => void;
}

const PostDetailActions: FC<PostDetailActionsProps> = ({
  likes,
  comments,
  views,
  isLiked,
  isBookmarked,
  onLike,
  onComment,
  onShare,
  onBookmark,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      {/* 互动按钮 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            variant={isLiked ? "primary" : "outline"}
            size="lg"
            onClick={onLike}
            className={`
              flex items-center space-x-2 px-4 py-3 rounded-full
              ${
                isLiked
                  ? "bg-red-50 border-red-200 text-red-600 hover:bg-red-100"
                  : "border-gray-200 hover:bg-gray-50"
              }
            `}
          >
            <span className="text-xl">❤</span>
            <span className="font-medium">{likes}</span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={onComment}
            className="flex items-center space-x-2 px-4 py-3 rounded-full border-gray-200 hover:bg-gray-50"
          >
            <span className="text-xl">💬</span>
            <span className="font-medium">{comments}</span>
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={onShare}
            className="flex items-center space-x-2 px-4 py-3 rounded-full border-gray-200 hover:bg-gray-50"
          >
            <span className="text-xl">🔗</span>
            <span className="font-medium">分享</span>
          </Button>

          <Button
            variant={isBookmarked ? "primary" : "outline"}
            size="lg"
            onClick={onBookmark}
            className={`
              flex items-center space-x-2 px-4 py-3 rounded-full
              ${
                isBookmarked
                  ? "bg-yellow-50 border-yellow-200 text-yellow-600 hover:bg-yellow-100"
                  : "border-gray-200 hover:bg-gray-50"
              }
            `}
          >
            <span className="text-xl">⭐</span>
            <span className="font-medium">收藏</span>
          </Button>
        </div>

        {/* 浏览量 */}
        <div className="flex items-center text-sm text-gray-500">
          <span className="text-base mr-1">👁</span>
          <span>{views}次浏览</span>
        </div>
      </div>
    </div>
  );
};

export default PostDetailActions;
