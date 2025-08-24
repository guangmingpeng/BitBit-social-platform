import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Breadcrumb, Button, Icon } from "@/components/ui";
import { PublishWizard } from "@/features/exchange";
import type { PublishFormData } from "@/features/exchange";

const PublishItem: React.FC = () => {
  const navigate = useNavigate();

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
        <h1 className="text-3xl font-bold text-text-primary mb-2">发布商品</h1>
        <p className="text-text-secondary">
          快速发布你的闲置物品，让更多人发现它们的价值
        </p>
      </div>

      {/* 发布向导 */}
      <PublishWizard onSubmit={handleSubmit} />
    </Container>
  );
};

export default PublishItem;
