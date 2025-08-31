import React from "react";
import { PostCard } from "@/components/ui/cards";
import { useSmartNavigation } from "@/shared/hooks/useSmartNavigation";

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    isVerified: boolean;
  };
  content: string;
  images?: string[];
  category: "learning" | "food" | "music" | "reading";
  tags?: string[]; // 添加标签字段
  publishTime: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
}

interface PostListProps {
  posts: Post[];
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  className?: string;
  onTagClick?: (tag: string) => void; // 添加标签点击回调
}

const PostList: React.FC<PostListProps> = ({
  posts,
  loading = false,
  onLoadMore,
  hasMore = false,
  className,
  onTagClick,
}) => {
  const { navigateWithSource } = useSmartNavigation();

  const handlePostClick = (postId: string) => {
    const navigateToPost = navigateWithSource("community");
    navigateToPost(`/community/${postId}`);
  };

  const handleLike = (postId: string) => {
    console.log(`点赞帖子: ${postId}`);
  };

  const handleComment = (postId: string) => {
    console.log(`评论帖子: ${postId}`);
  };

  const handleShare = (postId: string) => {
    console.log(`分享帖子: ${postId}`);
  };

  const handleBookmark = (postId: string) => {
    console.log(`收藏帖子: ${postId}`);
  };

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-4 animate-pulse"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/6"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className={`text-center py-12 bg-white rounded-lg ${className}`}>
        <div className="text-6xl mb-4">💬</div>
        <h3 className="text-xl font-medium text-text-primary mb-2">
          没有找到相关话题
        </h3>
        <p className="text-text-secondary">试试调整筛选条件或发布新的帖子</p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 帖子列表 */}
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onClick={() => handlePostClick(post.id)}
          onLike={() => handleLike(post.id)}
          onComment={() => handleComment(post.id)}
          onShare={() => handleShare(post.id)}
          onBookmark={() => handleBookmark(post.id)}
          onTagClick={onTagClick}
        />
      ))}

      {/* 分页器 */}
      {posts.length > 0 && (
        <div className="flex justify-center">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              上一页
            </button>
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              1
            </button>
            <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              下一页
            </button>
          </nav>
        </div>
      )}

      {/* 加载更多 */}
      {hasMore && onLoadMore && (
        <div className="flex justify-center">
          <button
            onClick={onLoadMore}
            className="px-6 py-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors"
          >
            加载更多
          </button>
        </div>
      )}
    </div>
  );
};

export default PostList;
