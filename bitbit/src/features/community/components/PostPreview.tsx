import { type FC, useState } from "react";
import { Avatar, Tag, Button, Card, CardContent } from "@/components/ui";
import { ImageCarousel } from "@/components/common";
import type { CommunityPostFormData } from "./CommunityPostForm";

interface PostPreviewProps {
  formData: CommunityPostFormData;
  className?: string;
}

const PostPreview: FC<PostPreviewProps> = ({ formData, className }) => {
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 模拟当前用户信息（在实际应用中应该从用户状态获取）
  const currentUser = {
    name: "当前用户",
    avatar: "",
    isVerified: false,
    isFollowing: false,
  };

  // 将File对象转换为预览URL
  const getImagePreviewUrls = (files: File[]): string[] => {
    return files.map((file) => URL.createObjectURL(file));
  };

  const previewImageUrls =
    formData.images.length > 0 ? getImagePreviewUrls(formData.images) : [];

  // 分类配置
  const categoryConfig: Record<
    string,
    {
      variant:
        | "default"
        | "music"
        | "food"
        | "learning"
        | "reading"
        | "secondary";
      label: string;
      emoji: string;
    }
  > = {
    photography: { variant: "default", label: "摄影", emoji: "📸" },
    reading: { variant: "reading", label: "读书", emoji: "📚" },
    learning: { variant: "learning", label: "学习", emoji: "🎓" },
    travel: { variant: "default", label: "旅行", emoji: "✈️" },
    food: { variant: "food", label: "美食", emoji: "🍽️" },
    music: { variant: "music", label: "音乐", emoji: "🎵" },
  };

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setShowImageGallery(true);
  };

  return (
    <div className={className}>
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          {/* 发布者信息 */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Avatar
                src={currentUser.avatar}
                alt={currentUser.name}
                size="lg"
                className="w-16 h-16"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {currentUser.name}
                  </h3>
                  {currentUser.isVerified && (
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
                <p className="text-sm text-gray-500">刚刚 · 预览模式</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {formData.category && categoryConfig[formData.category] && (
                <Tag
                  variant={categoryConfig[formData.category].variant}
                  className="bg-blue-50 text-blue-600"
                >
                  {categoryConfig[formData.category].emoji}{" "}
                  {categoryConfig[formData.category].label}
                </Tag>
              )}
              <Button
                variant="primary"
                size="sm"
                disabled
                className="px-6 opacity-50"
              >
                + 关注
              </Button>
            </div>
          </div>

          {/* 帖子标题 */}
          {formData.title && (
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {formData.title || "请输入帖子标题"}
              </h2>
            </div>
          )}

          {/* 帖子内容 */}
          <div className="mb-6">
            <p className="text-lg leading-relaxed text-gray-900 whitespace-pre-line">
              {formData.content || "请输入帖子内容..."}
            </p>
          </div>

          {/* 图片展示 */}
          {previewImageUrls.length > 0 && (
            <div className="mb-6">
              <ImageCarousel
                images={previewImageUrls}
                alt="帖子图片"
                height="400px"
                showIndicators={previewImageUrls.length > 1}
                showArrows={previewImageUrls.length > 1}
                showCounter={previewImageUrls.length > 1}
                onImageClick={handleImageClick}
                className="rounded-xl overflow-hidden"
              />
            </div>
          )}

          {/* 标签展示 */}
          {formData.tags.length > 0 && (
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <Tag key={index} variant="secondary" size="sm">
                    #{tag}
                  </Tag>
                ))}
              </div>
            </div>
          )}

          {/* 隐私设置提示 */}
          {formData.isPrivate && (
            <div className="mb-6">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="flex items-center gap-2 text-amber-700">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium">私密帖子</span>
                </div>
                <p className="text-sm text-amber-600 mt-1">
                  只有关注您的用户能看到这条帖子
                </p>
              </div>
            </div>
          )}

          {/* 互动区域 */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-6">
              <button
                className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors"
                disabled
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>点赞</span>
              </button>

              <button
                className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
                disabled={!formData.allowComments}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <span>{formData.allowComments ? "评论" : "评论已关闭"}</span>
              </button>

              <button
                className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors"
                disabled
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
                <span>分享</span>
              </button>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path
                    fillRule="evenodd"
                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>预览模式</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 图片预览模态框 */}
      {showImageGallery && previewImageUrls.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-4xl max-h-full p-4">
            <img
              src={previewImageUrls[currentImageIndex]}
              alt={`预览图片 ${currentImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setShowImageGallery(false)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl"
            >
              ×
            </button>
            {previewImageUrls.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setCurrentImageIndex((prev) =>
                      prev > 0 ? prev - 1 : previewImageUrls.length - 1
                    )
                  }
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 text-2xl"
                >
                  ‹
                </button>
                <button
                  onClick={() =>
                    setCurrentImageIndex((prev) =>
                      prev < previewImageUrls.length - 1 ? prev + 1 : 0
                    )
                  }
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 text-2xl"
                >
                  ›
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostPreview;
