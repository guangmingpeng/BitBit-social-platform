import { type FC } from "react";
import { PostCard } from "@/components/ui/cards";

interface Recommendation {
  id: string;
  author: {
    name: string;
    avatar?: string;
    isVerified?: boolean;
  };
  content: string;
  images?: string[];
  category?: "music" | "food" | "learning" | "reading";
  tags?: string[]; // 添加标签字段
  publishTime: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
}

interface PostDetailRecommendationsProps {
  recommendations: Recommendation[];
  onRecommendationClick: (id: string) => void;
  onTagClick?: (tag: string) => void; // 添加标签点击回调
}

const PostDetailRecommendations: FC<PostDetailRecommendationsProps> = ({
  recommendations,
  onRecommendationClick,
  onTagClick,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900">相关动态推荐</h3>

      <div className="space-y-3">
        {recommendations.map((item) => (
          <PostCard
            key={item.id}
            post={item}
            layout="compact"
            onClick={() => {
              console.log("相关推荐卡片被点击，ID:", item.id);
              onRecommendationClick(item.id);
            }}
            onLike={() => console.log(`点赞推荐: ${item.id}`)}
            onComment={() => console.log(`评论推荐: ${item.id}`)}
            onShare={() => console.log(`分享推荐: ${item.id}`)}
            onBookmark={() => console.log(`收藏推荐: ${item.id}`)}
            onTagClick={onTagClick} // 添加标签点击回调
          />
        ))}
      </div>
    </div>
  );
};

export default PostDetailRecommendations;
