import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Container, Breadcrumb, Button, Icon } from "@/components/ui";
import { PublishWizard } from "@/features/exchange";
import type { PublishFormData } from "@/features/exchange";
import { myDrafts } from "@/shared/data/profileMockData";
import {
  convertDraftToExchangeForm,
  calculateExchangeProgress,
} from "@/utils/draftUtils";

const PublishItem: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editDraftId = searchParams.get("edit");
  const isEditMode = Boolean(editDraftId);

  const [initialData, setInitialData] = useState<
    Partial<PublishFormData> | undefined
  >(undefined);

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
    <Container size="lg" className="py-6">
      {/* 面包屑导航 */}
      <div className="flex items-center justify-between mb-6">
        <Breadcrumb items={breadcrumbItems} />
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/exchange")}
          className="flex items-center gap-2"
        >
          <Icon name="arrow-left" size="sm" />
          返回列表
        </Button>
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
      <PublishWizard initialData={initialData} onSubmit={handleSubmit} />
    </Container>
  );
};

export default PublishItem;
