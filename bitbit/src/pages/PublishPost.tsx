import React, { useState, useRef, useEffect } from "react";
import { Container } from "@/components/ui";
import {
  FloatingBackButton,
  ConfirmExitDialog,
  PublishStatus,
} from "@/components/common";
import { CommunityPostForm } from "@/features/community/components/CommunityPostForm";
import PostPreview from "@/features/community/components/PostPreview";
import { useConfirmExit, usePublishStatus } from "@/shared/hooks";
import type { CommunityPostFormData } from "@/features/community/components/CommunityPostForm";

const PublishPost: React.FC = () => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<CommunityPostFormData>({
    title: "",
    content: "",
    category: "",
    tags: [],
    images: [],
    isPrivate: false,
    allowComments: true,
  });

  // 检查是否有未保存的更改
  const hasUnsavedChanges = (data: CommunityPostFormData) => {
    return !!(
      data.title.trim() ||
      data.content.trim() ||
      data.category ||
      data.tags.length > 0 ||
      data.images.length > 0
    );
  };

  // 保存草稿函数
  const saveDraft = async (data: CommunityPostFormData) => {
    console.log("保存帖子草稿:", data);
    localStorage.setItem("postDraft", JSON.stringify(data));
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  // 发布帖子函数
  const handlePublishSubmit = async (data: CommunityPostFormData) => {
    // 模拟API调用
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("发布帖子:", data);

    // 清除草稿
    localStorage.removeItem("postDraft");
  };

  // 使用发布状态hook
  const {
    publishStatus,
    publishError,
    publishedItemId,
    handleSubmit: submitPublish,
    handleRetry,
    handleReset,
    setPublishData,
  } = usePublishStatus<CommunityPostFormData>({
    onSubmit: handlePublishSubmit,
    onSuccess: () => {
      // 发布成功后的额外处理
      console.log("帖子发布成功！");
    },
  });

  // 检查是否正在提交
  const isSubmitting = publishStatus === "loading";

  // 使用确认退出hook
  const {
    showConfirmDialog,
    isSaving,
    handleBackClick,
    handleConfirmExit,
    handleSaveAndExit,
    closeConfirmDialog,
    setCurrentFormData,
  } = useConfirmExit<CommunityPostFormData>({
    onSaveDraft: saveDraft,
    hasUnsavedChanges,
    defaultBackPath: "/community",
  });

  // 当表单数据变化时更新hook中的数据
  useEffect(() => {
    setCurrentFormData(formData);
    setPublishData(formData);
  }, [formData, setCurrentFormData, setPublishData]);

  const handleSubmit = async (formData: CommunityPostFormData) => {
    setPublishData(formData);
    await submitPublish();
  };

  const handleCancel = () => {
    handleBackClick(formData);
  };

  // 处理字段焦点，滚动预览到对应位置
  const handleFieldFocus = (fieldName: string) => {
    if (!previewRef.current) return;

    const fieldScrollMap: { [key: string]: number } = {
      title: 0,
      content: 100,
      category: 200,
      images: 300,
      tags: 400,
      isPrivate: 450,
      allowComments: 500,
    };

    const scrollOffset = fieldScrollMap[fieldName] || 0;
    previewRef.current.scrollTo({
      top: scrollOffset,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* 左侧浮动返回按钮 */}
      <FloatingBackButton
        text="返回上页"
        variant="elegant"
        size="md"
        onClick={() => handleBackClick(formData)}
      />

      {/* 确认退出对话框 */}
      <ConfirmExitDialog
        isOpen={showConfirmDialog}
        onClose={closeConfirmDialog}
        onConfirmExit={handleConfirmExit}
        onSaveAndExit={handleSaveAndExit}
        title="确认退出编辑"
        content="您有未保存的帖子内容，是否要保存为草稿？"
        isSaving={isSaving}
      />

      <Container size="full" className="py-6 pl-20 md:pl-30 lg:pl-40">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            发布新帖子
          </h1>
          <p className="text-text-secondary">
            分享你的想法，与社区成员交流互动
          </p>
        </div>

        {/* 根据发布状态显示不同内容 */}
        {publishStatus === "loading" ||
        publishStatus === "success" ||
        publishStatus === "error" ? (
          <PublishStatus
            status={publishStatus}
            error={publishError}
            onRetry={handleRetry}
            onReset={handleReset}
            loadingConfig={{
              title: "正在发布帖子...",
              description: "请稍候，正在上传帖子内容",
            }}
            successConfig={{
              title: "帖子发布成功！",
              description: "你的帖子已成功发布，用户很快就能看到并参与讨论了",
              publishedItemId: publishedItemId || undefined,
              previewData: {
                title: formData.title,
                category: formData.category,
                image: formData.images[0],
                type: "post",
              },
              fullPreviewData: formData,
              actions: {
                primary: {
                  label: "查看帖子详情",
                  generateHref: (id: string) => `/community/${id}`,
                },
                secondary: {
                  label: "继续逛逛",
                  href: "/community",
                },
                tertiary: {
                  label: "再发一个帖子",
                  onClick: () => {
                    handleReset();
                    setFormData({
                      title: "",
                      content: "",
                      category: "",
                      tags: [],
                      images: [],
                      isPrivate: false,
                      allowComments: true,
                    });
                  },
                },
              },
            }}
          />
        ) : (
          /* 左右分栏布局 */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 左侧：编辑表单 - 占用更多空间 */}
            <div className="lg:col-span-2 space-y-6 max-h-screen overflow-y-auto pr-4">
              <div className="bg-white rounded-lg p-1">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 text-blue-700">
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
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    <span className="font-medium">编辑模式</span>
                  </div>
                  <p className="text-sm text-blue-600 mt-1">
                    在左侧编辑帖子内容，右侧会实时显示预览效果
                  </p>
                </div>
              </div>

              <CommunityPostForm
                initialData={formData}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                isSubmitting={isSubmitting}
                onChange={setFormData}
                onFieldFocus={handleFieldFocus}
              />
            </div>

            {/* 右侧：实时预览 - 占用较少空间且独立滚动 */}
            <div className="lg:col-span-1 lg:sticky lg:top-6 lg:h-screen">
              <div className="bg-white rounded-lg p-3 border border-gray-200 mb-3 shadow-sm">
                <div className="flex items-center gap-2 text-gray-700 mb-2">
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
                  <h3 className="font-medium text-sm">实时预览</h3>
                </div>
                <p className="text-xs text-gray-600">
                  发布后的效果预览，支持智能滚动同步
                </p>
              </div>

              <div
                ref={previewRef}
                className="max-h-[calc(100vh-180px)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
              >
                <PostPreview formData={formData} />
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default PublishPost;
