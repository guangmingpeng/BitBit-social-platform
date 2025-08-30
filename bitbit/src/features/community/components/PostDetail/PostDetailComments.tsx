import { type FC, useState } from "react";
import { Avatar, Button } from "@/components/ui";

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  publishTime: string;
  likes: number;
  isLiked: boolean;
}

interface PostDetailCommentsProps {
  comments: Comment[];
  totalComments?: number;
  showAllComments?: boolean;
  onSubmitComment: (comment: string) => void;
  onShowMoreComments?: () => void;
  onScrollToCommentInput?: () => void;
}

const PostDetailComments: FC<PostDetailCommentsProps> = ({
  comments,
  totalComments,
  showAllComments = false,
  onShowMoreComments,
  onScrollToCommentInput,
}) => {
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");

  const displayedCommentsCount = totalComments || comments.length;

  return (
    <div className="space-y-6">
      {/* 评论标题和排序 */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">
          评论 ({displayedCommentsCount})
        </h3>
        <div className="flex items-center space-x-2">
          <Button
            variant={sortBy === "latest" ? "primary" : "outline"}
            size="sm"
            onClick={() => setSortBy("latest")}
            className="text-sm"
          >
            最新
          </Button>
          <Button
            variant={sortBy === "popular" ? "primary" : "outline"}
            size="sm"
            onClick={() => setSortBy("popular")}
            className="text-sm"
          >
            最热
          </Button>
          {/* 发布评论按钮 */}
          <Button
            variant="outline"
            size="sm"
            onClick={onScrollToCommentInput}
            className="text-sm ml-2"
          >
            💬 发布评论
          </Button>
        </div>
      </div>

      {/* 评论列表 */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-3">
            <Avatar
              src={comment.author.avatar}
              alt={comment.author.name}
              size="md"
              className="w-12 h-12 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="text-base font-semibold text-gray-900">
                  {comment.author.name}
                </h4>
                <span className="text-sm text-gray-500">
                  {comment.publishTime}
                </span>
              </div>
              <p className="text-base text-gray-900 mb-2 leading-relaxed">
                {comment.content}
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <button
                  className={`
                    flex items-center space-x-1 hover:text-red-500 transition-colors
                    ${comment.isLiked ? "text-red-500" : ""}
                  `}
                >
                  <span>回复</span>
                </button>
                <button
                  className={`
                    flex items-center space-x-1 hover:text-red-500 transition-colors
                    ${comment.isLiked ? "text-red-500" : ""}
                  `}
                >
                  <span>赞</span>
                  <span>{comment.likes}</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* 展开更多评论按钮 */}
        {!showAllComments &&
          totalComments &&
          totalComments > comments.length && (
            <div className="text-center pt-4">
              <Button
                variant="outline"
                size="lg"
                onClick={onShowMoreComments}
                className="w-full"
              >
                展开更多评论 ({totalComments - comments.length} 条)
              </Button>
            </div>
          )}
      </div>
    </div>
  );
};

export default PostDetailComments;
