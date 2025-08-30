import { type FC } from "react";
import PostCard from "@/features/community/components/PostCard";

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
}

const PostDetailRecommendations: FC<PostDetailRecommendationsProps> = ({
  recommendations,
  onRecommendationClick,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900">相关动态推荐</h3>

      <div className="space-y-3">
        {recommendations.map((item) => (
          <PostCard
            key={item.id}
            id={item.id}
            author={item.author}
            content={item.content}
            images={item.images}
            category={item.category}
            publishTime={item.publishTime}
            likes={item.likes}
            comments={item.comments}
            shares={item.shares}
            isLiked={item.isLiked}
            isBookmarked={item.isBookmarked}
            layout="compact"
            onClick={() => {
              console.log("相关推荐卡片被点击，ID:", item.id);
              onRecommendationClick(item.id);
            }}
            onLike={() => console.log(`点赞推荐: ${item.id}`)}
            onComment={() => console.log(`评论推荐: ${item.id}`)}
            onShare={() => console.log(`分享推荐: ${item.id}`)}
            onBookmark={() => console.log(`收藏推荐: ${item.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default PostDetailRecommendations;
