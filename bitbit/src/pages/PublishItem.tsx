import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Container, Breadcrumb } from "@/components/ui";
import { PublishWizard } from "@/features/exchange";
import type { PublishFormData } from "@/features/exchange";
import { FloatingBackButton, ConfirmExitDialog } from "@/components/common";
import { useConfirmExit } from "@/shared/hooks";

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
    console.log("保存商品草稿:", data);
    // 这里应该调用实际的API保存草稿
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  // 使用确认退出 hook
  const {
    showConfirmDialog,
    isSaving,
    handleBackClick,
    handleConfirmExit,
    handleSaveAndExit,
    setCurrentFormData,
  } = useConfirmExit<PublishFormData>({
    onSaveDraft: handleSaveDraft,
    hasUnsavedChanges,
    defaultBackPath: "/exchange",
  });

  // 当表单数据变化时更新确认退出hook中的数据
  useEffect(() => {
    setCurrentFormData(formData);
  }, [formData, setCurrentFormData]);

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
    // 这里应该调用实际的API
    console.log("发布商品数据:", data);

    // 模拟API调用
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 模拟随机成功或失败 (90% 成功率)
    if (Math.random() > 0.1) {
      return Promise.resolve();
    } else {
      throw new Error("网络错误，请稍后重试");
    }
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
        onClose={handleConfirmExit}
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

        {/* 发布向导 */}
        <PublishWizard
          initialData={initialData}
          onSubmit={handleSubmit}
          onChange={setFormData}
        />
      </Container>
    </div>
  );
};

export default PublishItem;
