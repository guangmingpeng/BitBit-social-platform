import { type FC, useState } from "react";
import { Avatar, Tag, Button, Card, CardContent } from "@/components/ui";
import ImageGallery from "./ImageGallery";

interface PostDetailContentProps {
  post: {
    author: {
      name: string;
      avatar: string;
      isVerified: boolean;
      isFollowing: boolean;
    };
    content: string;
    images?: string[];
    category: string;
    publishTime: string;
    location: string;
    likes?: number;
    comments?: number;
    shares?: number;
    views?: number;
    activity?: {
      title: string;
      time: string;
      location: string;
      participants: string;
      fee: string;
    };
  };
  onFollow: () => void;
  onJoinActivity?: () => void;
}

const PostDetailContent: FC<PostDetailContentProps> = ({
  post,
  onFollow,
  onJoinActivity,
}) => {
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          {/* 发布者信息 */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Avatar
                src={post.author.avatar}
                alt={post.author.name}
                size="lg"
                className="w-16 h-16"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {post.author.name}
                  </h3>
                  {post.author.isVerified && (
                    <svg
                      className="w-5 h-5 text-blue-500"
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
                <p className="text-sm text-gray-500">
                  {post.publishTime} · {post.location}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Tag variant="secondary" className="bg-blue-50 text-blue-600">
                {post.category}
              </Tag>
              <Button
                variant={post.author.isFollowing ? "outline" : "primary"}
                size="sm"
                onClick={onFollow}
                className="px-6"
              >
                {post.author.isFollowing ? "已关注" : "+ 关注"}
              </Button>
            </div>
          </div>

          {/* 动态内容 */}
          <div className="mb-6">
            <p className="text-lg leading-relaxed text-gray-900 whitespace-pre-line">
              {post.content}
            </p>
          </div>

          {/* 图片网格 - 最多显示两排 (6张) */}
          {post.images && post.images.length > 0 && (
            <div className="mb-6">
              <div className="grid grid-cols-3 gap-3">
                {post.images.slice(0, 6).map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-xl overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setShowImageGallery(true);
                    }}
                  >
                    <img
                      src={image}
                      alt={`图片 ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {/* 显示剩余图片数量 */}
                    {index === 5 && post.images && post.images.length > 6 && (
                      <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                        <span className="text-white font-medium text-sm">
                          +{post.images.length - 6}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {post.images.length > 6 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCurrentImageIndex(0);
                    setShowImageGallery(true);
                  }}
                  className="mt-3"
                >
                  查看全部 {post.images.length} 张图片
                </Button>
              )}
            </div>
          )}

          {/* 互动统计区域 */}
          <div className="mb-6 py-4 border-t border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-gray-600">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium">{post.likes || 0}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium">
                    {post.comments || 0}
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                  <span className="text-sm font-medium">
                    {post.shares || 0}
                  </span>
                </div>
              </div>

              <div className="flex items-center text-sm text-gray-500">
                <svg
                  className="w-4 h-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {post.views || 0}次浏览
              </div>
            </div>
          </div>

          {/* 活动信息卡片 */}
          {post.activity && (
            <Card className="bg-gray-50 border border-gray-200">
              <CardContent className="p-4">
                <h4 className="text-base font-semibold text-gray-900 mb-3">
                  {post.activity.title}
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm text-gray-600 mb-4">
                  <div>时间: {post.activity.time}</div>
                  <div>地点: {post.activity.location}</div>
                  <div>已报名: {post.activity.participants}</div>
                  <div>费用: {post.activity.fee}</div>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={onJoinActivity}
                  className="w-32"
                >
                  立即报名
                </Button>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* 图片预览模态框 */}
      {showImageGallery && post.images && (
        <ImageGallery
          images={post.images}
          currentIndex={currentImageIndex}
          onClose={() => setShowImageGallery(false)}
          onPrevious={() =>
            setCurrentImageIndex((prev) =>
              prev > 0 ? prev - 1 : post.images!.length - 1
            )
          }
          onNext={() =>
            setCurrentImageIndex((prev) =>
              prev < post.images!.length - 1 ? prev + 1 : 0
            )
          }
        />
      )}
    </>
  );
};

export default PostDetailContent;
