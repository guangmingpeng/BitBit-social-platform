import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui";
import ActivityPreview from "@/features/activities/components/ActivityPreview";
import PostPreview from "@/features/community/components/PostPreview";
import type { PublishStatusProps } from "./types";
import type { ActivityFormData } from "@/features/activities/components/ActivityForm";
import type { CommunityPostFormData } from "@/features/community/components/CommunityPostForm";

const PublishStatus = <T,>({
  status,
  error,
  onRetry,
  onReset,
  successConfig,
  loadingConfig,
}: PublishStatusProps<T>) => {
  const navigate = useNavigate();

  if (status === "loading") {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mb-4"></div>
        <h3 className="text-lg font-medium text-text-primary mb-2">
          {loadingConfig.title}
        </h3>
        <p className="text-text-secondary">{loadingConfig.description}</p>
      </div>
    );
  }

  if (status === "success") {
    const { previewData, fullPreviewData, publishedItemId } = successConfig;

    // 生成详情页面链接
    const getDetailPageHref = () => {
      if (successConfig.actions.primary.generateHref && publishedItemId) {
        return successConfig.actions.primary.generateHref(publishedItemId);
      }
      return successConfig.actions.primary.href || "#";
    };

    return (
      <div className="space-y-6">
        {/* 成功状态 */}
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🎉</div>
          <h3 className="text-xl font-medium text-text-primary mb-2">
            {successConfig.title}
          </h3>
          <p className="text-text-secondary mb-6">
            {successConfig.description}
          </p>
        </div>

        {/* 完整预览组件 */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {previewData.type === "activity" && "你的活动预览"}
            {previewData.type === "post" && "你的帖子预览"}
            {previewData.type === "item" && "你的商品预览"}
          </h4>

          {/* 使用完整的预览组件 */}
          <div className="bg-white rounded-lg overflow-hidden">
            {previewData.type === "activity" && fullPreviewData && (
              <ActivityPreview
                formData={fullPreviewData as unknown as ActivityFormData}
                className="shadow-none border-0"
              />
            )}
            {previewData.type === "post" && fullPreviewData && (
              <PostPreview
                formData={fullPreviewData as unknown as CommunityPostFormData}
                className="shadow-none border-0"
              />
            )}
            {previewData.type === "item" && (
              // 保持商品的简单预览，因为没有完整的预览组件
              <div className="p-4 flex gap-4">
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden">
                  {previewData.image ? (
                    typeof previewData.image === "string" ? (
                      <img
                        src={previewData.image}
                        alt={previewData.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={URL.createObjectURL(previewData.image)}
                        alt={previewData.title}
                        className="w-full h-full object-cover"
                      />
                    )
                  ) : (
                    <span className="text-gray-300">📦</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                    {previewData.title}
                  </h5>
                  {previewData.category && (
                    <p className="text-sm text-gray-600 mb-2">
                      {previewData.condition && `${previewData.condition} | `}
                      {previewData.category}
                    </p>
                  )}
                  {previewData.price !== undefined && (
                    <div className="text-lg font-bold text-primary-500">
                      ¥{previewData.price.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 text-sm text-green-700 bg-green-100 rounded-lg px-3 py-2">
            💡
            {previewData.type === "activity" &&
              "你的活动将在几分钟内出现在活动列表中，其他用户就能看到并报名了！"}
            {previewData.type === "post" &&
              "你的帖子将在几分钟内出现在社区中，其他用户就能看到并参与讨论了！"}
            {previewData.type === "item" &&
              "你的商品将在几分钟内出现在商品列表中，其他用户就能看到并联系你了！"}
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="primary"
            onClick={() => navigate(getDetailPageHref())}
            className="flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            {successConfig.actions.primary.label}
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(successConfig.actions.secondary.href)}
            className="flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
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
            {successConfig.actions.secondary.label}
          </Button>
          {successConfig.actions.tertiary && (
            <Button
              variant="ghost"
              onClick={successConfig.actions.tertiary.onClick}
              className="flex items-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              {successConfig.actions.tertiary.label}
            </Button>
          )}
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">❌</div>
        <h3 className="text-xl font-medium text-text-primary mb-2">发布失败</h3>
        <p className="text-text-secondary mb-6">{error}</p>
        <div className="flex gap-4 justify-center">
          <Button onClick={onRetry}>重新尝试</Button>
          <Button variant="outline" onClick={onReset}>
            重新编辑
          </Button>
        </div>
      </div>
    );
  }

  return null;
};

export default PublishStatus;
