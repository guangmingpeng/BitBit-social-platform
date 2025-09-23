import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Breadcrumb } from "@/components/ui";
import { PublishWizard } from "@/features/exchange";
import type { PublishFormData } from "@/features/exchange";
import {
  FloatingBackButton,
  ConfirmExitDialog,
  PublishStatus,
} from "@/components/common";
import { useConfirmExit, usePublishStatus } from "@/shared/hooks";

import { myDrafts } from "@/shared/data/profileMockData";
import {
  convertDraftToExchangeForm,
  calculateExchangeProgress,
} from "@/utils/draftUtils";

const PublishItem: React.FC = () => {
  const [searchParams] = useSearchParams();
  const editDraftId = searchParams.get("edit");
  const isEditMode = Boolean(editDraftId);

  const [initialData, setInitialData] = useState<
    Partial<PublishFormData> | undefined
  >(undefined);
  const [formData, setFormData] = useState<PublishFormData>({
    title: "",
    category: "",
    condition: "new",
    price: 0,
    originalPrice: 0,
    description: "",
    location: "",
    images: [],
    specifications: [],
    exchangePreferences: [],
    contactMethod: "platform",
    contactInfo: "",
    deliveryOptions: {
      shipping: false,
      freeShipping: false,
      pickup: false,
      meetup: false,
      localOnly: false,
    },
    paymentMethods: {
      cash: false,
      bankTransfer: false,
      wechatPay: false,
      alipay: false,
    },
    paymentQRCodes: [],
  });

  // 检查是否有未保存的更改
  const hasUnsavedChanges = (data: PublishFormData) => {
    return !!(
      data.title.trim() ||
      data.description.trim() ||
      data.category ||
      data.condition !== "new" ||
      data.images.length > 0 ||
      data.price > 0 ||
      data.specifications.length > 0 ||
      data.exchangePreferences.length > 0
    );
  };

  // 保存草稿函数
  const handleSaveDraft = async (data: PublishFormData) => {
    const progress = calculateExchangeProgress(data);
    console.log("保存商品草稿:", data, "完成度:", progress);

    // 如果是编辑模式，更新现有草稿；否则创建新草稿
    const draftData = {
      id: editDraftId || `draft-${Date.now()}`,
      type: "exchange" as const,
      title: data.title || "未命名商品",
      content: data.description || "",
      lastEditTime: new Date().toLocaleString("zh-CN"),
      images: data.images.map(
        (_, index) =>
          `https://picsum.photos/300/200?random=exchange-draft-${
            editDraftId || Date.now()
          }-${index}`
      ),
      progress,
    };

    localStorage.setItem("exchangeDraft", JSON.stringify(draftData));
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  // 发布商品函数
  const handlePublishSubmit = async (data: PublishFormData) => {
    // 模拟API调用
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("发布商品:", data);

    // 清除草稿
    localStorage.removeItem("exchangeDraft");
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
  } = usePublishStatus<PublishFormData>({
    onSubmit: handlePublishSubmit,
    onSuccess: () => {
      // 发布成功后的额外处理
      console.log("商品发布成功！");
    },
  });

  // 使用确认退出 hook
  const {
    showConfirmDialog,
    isSaving,
    handleBackClick,
    handleConfirmExit,
    handleSaveAndExit,
    closeConfirmDialog,
    setCurrentFormData,
  } = useConfirmExit<PublishFormData>({
    onSaveDraft: handleSaveDraft,
    hasUnsavedChanges,
    defaultBackPath: "/exchange",
  });

  // 当表单数据变化时更新hook中的数据
  useEffect(() => {
    setCurrentFormData(formData);
    setPublishData(formData);
  }, [formData, setCurrentFormData, setPublishData]);

  // 自定义返回处理函数
  const handleCustomBack = () => {
    handleBackClick(formData);
  };

  // 在组件加载时，如果是编辑模式，加载草稿数据
  useEffect(() => {
    if (isEditMode && editDraftId) {
      const draft = myDrafts.find(
        (d) => d.id === editDraftId && d.type === "exchange"
      );
      if (draft) {
        const draftFormData = convertDraftToExchangeForm(draft);
        setInitialData(draftFormData);
      }
    }
  }, [isEditMode, editDraftId]);

  const breadcrumbItems = [
    { label: "首页", href: "/" },
    { label: "二手交换", href: "/exchange" },
    { label: "发布商品", current: true },
  ];

  const handleSubmit = async (data: PublishFormData) => {
    setPublishData(data);
    await submitPublish();
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* 左侧浮动返回按钮 */}
      <FloatingBackButton
        text="返回上页"
        variant="elegant"
        size="md"
        onClick={handleCustomBack}
      />

      {/* 确认退出对话框 */}
      <ConfirmExitDialog
        isOpen={showConfirmDialog}
        onClose={closeConfirmDialog}
        onConfirmExit={handleConfirmExit}
        onSaveAndExit={handleSaveAndExit}
        title="确认退出编辑"
        content="您有未保存的商品信息，是否要保存为草稿？"
        isSaving={isSaving}
      />

      <Container size="lg" className="py-6">
        {/* 面包屑导航 */}
        <div className="flex items-center justify-between mb-6">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        {/* 页面标题 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-text-primary mb-2">
            {isEditMode ? "编辑商品草稿" : "发布商品"}
          </h1>
          <p className="text-text-secondary">
            {isEditMode
              ? "继续完善您的商品草稿，完成后即可发布"
              : "快速发布你的闲置物品，让更多人发现它们的价值"}
          </p>

          {/* 在编辑模式下显示完成度 */}
          {isEditMode && initialData && (
            <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded-lg max-w-md mx-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-purple-700">
                  编辑进度
                </span>
                <span className="text-sm text-purple-600">
                  {calculateExchangeProgress(initialData as PublishFormData)}%
                </span>
              </div>
              <div className="w-full bg-purple-200 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${calculateExchangeProgress(
                      initialData as PublishFormData
                    )}%`,
                  }}
                />
              </div>
              <p className="text-xs text-purple-600 mt-2">
                完善更多信息可以提高商品的吸引力
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
              title: "正在发布商品...",
              description: "请稍候，正在上传商品信息",
            }}
            successConfig={{
              title: "商品发布成功！",
              description: "你的商品已成功发布，买家很快就能看到了",
              publishedItemId: publishedItemId || undefined,
              previewData: {
                title: formData.title,
                category: formData.category,
                condition: formData.condition,
                price: formData.price,
                image: formData.images[0],
                type: "item",
              },
              fullPreviewData: formData,
              actions: {
                primary: {
                  label: "查看我的商品",
                  href: "/exchange?newItem=true",
                },
                secondary: {
                  label: "继续逛逛",
                  href: "/exchange",
                },
                tertiary: {
                  label: "再发一个商品",
                  onClick: () => {
                    handleReset();
                    setFormData({
                      title: "",
                      category: "",
                      condition: "new",
                      price: 0,
                      originalPrice: 0,
                      description: "",
                      location: "",
                      images: [],
                      specifications: [],
                      exchangePreferences: [],
                      contactMethod: "platform",
                      contactInfo: "",
                      deliveryOptions: {
                        shipping: false,
                        freeShipping: false,
                        pickup: false,
                        meetup: false,
                        localOnly: false,
                      },
                      paymentMethods: {
                        cash: false,
                        bankTransfer: false,
                        wechatPay: false,
                        alipay: false,
                      },
                      paymentQRCodes: [],
                    });
                  },
                },
              },
            }}
          />
        ) : (
          /* 发布向导 */
          <PublishWizard
            initialData={initialData}
            onSubmit={handleSubmit}
            onChange={setFormData}
          />
        )}
      </Container>
    </div>
  );
};

export default PublishItem;
