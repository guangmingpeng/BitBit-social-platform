import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Container } from "@/components/ui";
import {
  FloatingBackButton,
  ConfirmExitDialog,
  PublishStatus,
} from "@/components/common";
import { ActivityForm } from "@/features/activities/components/ActivityForm";
import ActivityPreview from "@/features/activities/components/ActivityPreview";
import { useConfirmExit, usePublishStatus } from "@/shared/hooks";
import type { ActivityFormData } from "@/features/activities/components/ActivityForm";
import { myDrafts } from "@/shared/data/profileMockData";
import {
  convertDraftToActivityForm,
  calculateActivityProgress,
} from "@/utils/draftUtils";

const PublishActivity: React.FC = () => {
  const [searchParams] = useSearchParams();
  const editDraftId = searchParams.get("edit");
  const isEditMode = Boolean(editDraftId);

  const previewRef = useRef<HTMLDivElement>(null);
  const [initialFormData, setInitialFormData] = useState<ActivityFormData>({
    title: "",
    description: "",
    category: "",
    startDate: "",
    endDate: "",
    location: "",
    maxParticipants: 20,
    registrationDeadline: "",
    fee: 0,
    tags: [],
    images: [],
    requirements: "",
    contactInfo: "",
    isOnline: false,
    meetingLink: "",
    schedule: [],
    notices: [],
  });

  const [formData, setFormData] = useState<ActivityFormData>(initialFormData);

  // 在组件加载时，如果是编辑模式，加载草稿数据
  useEffect(() => {
    if (isEditMode && editDraftId) {
      const draft = myDrafts.find(
        (d) => d.id === editDraftId && d.type === "activity"
      );
      if (draft) {
        const draftFormData = convertDraftToActivityForm(draft);
        setInitialFormData(draftFormData);
        setFormData(draftFormData);
      }
    }
  }, [isEditMode, editDraftId]);

  // 检查是否有未保存的更改
  const hasUnsavedChanges = (data: ActivityFormData) => {
    return !!(
      data.title.trim() ||
      data.description.trim() ||
      data.category ||
      data.location.trim() ||
      data.startDate ||
      data.endDate ||
      data.tags.length > 0 ||
      data.images.length > 0 ||
      data.requirements.trim() ||
      data.contactInfo.trim() ||
      (data.meetingLink && data.meetingLink.trim()) ||
      data.schedule.length > 0 ||
      data.notices.length > 0
    );
  };

  // 保存草稿函数
  const saveDraft = async (data: ActivityFormData) => {
    const progress = calculateActivityProgress(data);
    console.log("保存活动草稿:", data, "完成度:", progress);

    // 如果是编辑模式，更新现有草稿；否则创建新草稿
    const draftData = {
      id: editDraftId || `draft-${Date.now()}`,
      type: "activity" as const,
      title: data.title || "未命名活动",
      content: data.description || "",
      lastEditTime: new Date().toLocaleString("zh-CN"),
      images: data.images.map(
        (_, index) =>
          `https://picsum.photos/300/200?random=draft-${
            editDraftId || Date.now()
          }-${index}`
      ),
      progress,
    };

    localStorage.setItem("activityDraft", JSON.stringify(draftData));
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  // 发布活动函数
  const handlePublishSubmit = async (data: ActivityFormData) => {
    // 模拟API调用
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("发布活动:", data);

    // 清除草稿
    localStorage.removeItem("activityDraft");
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
  } = usePublishStatus<ActivityFormData>({
    onSubmit: handlePublishSubmit,
    onSuccess: () => {
      // 发布成功后的额外处理
      console.log("活动发布成功！");
    },
  });

  // 使用确认退出hook
  const {
    showConfirmDialog,
    isSaving,
    handleBackClick,
    handleConfirmExit,
    handleSaveAndExit,
    closeConfirmDialog,
    setCurrentFormData,
  } = useConfirmExit<ActivityFormData>({
    onSaveDraft: saveDraft,
    hasUnsavedChanges,
    defaultBackPath: "/activities",
  });

  // 检查是否正在提交
  const isSubmitting = publishStatus === "loading";

  // 当表单数据变化时更新hook中的数据
  useEffect(() => {
    setCurrentFormData(formData);
    setPublishData(formData);
  }, [formData, setCurrentFormData, setPublishData]);

  const handleSubmit = async (formData: ActivityFormData) => {
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
      images: 100,
      category: 200,
      description: 600,
      startDate: 400,
      endDate: 400,
      isOnline: 450,
      location: 450,
      meetingLink: 450,
      maxParticipants: 500,
      fee: 500,
      registrationDeadline: 550,
      requirements: 700,
      contactInfo: 650,
      schedule: 700,
      notices: 800,
      tags: 900,
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
        content="您有未保存的活动内容，是否要保存为草稿？"
        isSaving={isSaving}
      />

      <Container size="full" className="py-6 pl-20 md:pl-24 lg:pl-40">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            {isEditMode ? "编辑活动草稿" : "发布新活动"}
          </h1>
          <p className="text-text-secondary">
            {isEditMode
              ? "继续完善您的活动草稿，完成后即可发布"
              : "创建精彩活动，邀请大家一起参与"}
          </p>

          {/* 在编辑模式下显示完成度 */}
          {isEditMode && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-700">
                  编辑进度
                </span>
                <span className="text-sm text-blue-600">
                  {calculateActivityProgress(formData)}%
                </span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${calculateActivityProgress(formData)}%` }}
                />
              </div>
              <p className="text-xs text-blue-600 mt-2">
                完善更多信息可以提高活动的吸引力
              </p>
            </div>
          )}
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
              title: "正在发布活动...",
              description: "请稍候，正在上传活动信息",
            }}
            successConfig={{
              title: "活动发布成功！",
              description: "你的活动已成功发布，用户很快就能看到并报名了",
              publishedItemId: publishedItemId || undefined,
              previewData: {
                title: formData.title,
                category: formData.category,
                image: formData.images[0],
                type: "activity",
              },
              fullPreviewData: formData,
              actions: {
                primary: {
                  label: "查看活动详情",
                  generateHref: (id: string) => `/activities/${id}`,
                },
                secondary: {
                  label: "继续逛逛",
                  href: "/activities",
                },
                tertiary: {
                  label: "再发一个活动",
                  onClick: () => {
                    handleReset();
                    setFormData({
                      title: "",
                      description: "",
                      category: "",
                      startDate: "",
                      endDate: "",
                      location: "",
                      maxParticipants: 20,
                      registrationDeadline: "",
                      fee: 0,
                      tags: [],
                      images: [],
                      requirements: "",
                      contactInfo: "",
                      isOnline: false,
                      meetingLink: "",
                      schedule: [],
                      notices: [],
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
                    在左侧编辑活动信息，右侧会实时显示预览效果
                  </p>
                </div>
              </div>

              <ActivityForm
                initialData={initialFormData}
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
                <ActivityPreview formData={formData} />
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default PublishActivity;
