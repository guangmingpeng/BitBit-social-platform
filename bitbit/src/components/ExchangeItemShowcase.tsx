import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ExchangeCard } from "@/features/exchange";
import Button from "./ui/Button";
import Container from "./ui/Container";
import SectionHeader from "./ui/SectionHeader";
import { getAllExchangeItems } from "@/shared/data/exchangeItems";

const ExchangeItemShowcase: React.FC = () => {
  const navigate = useNavigate();
  const [layout, setLayout] = useState<"grid" | "list" | "compact" | "sidebar">(
    "grid"
  );

  const sampleItems = getAllExchangeItems();

  const handleExchange = (id: string) => {
    console.log("交换物品:", id);
  };

  const handleContact = (id: string) => {
    console.log("联系卖家:", id);
  };

  const handleLike = (id: string) => {
    console.log("收藏/取消收藏:", id);
  };

  const handleViewDetails = (id: string) => {
    console.log("查看详情:", id);
    navigate(`/exchange/${id}`);
  };

  return (
    <Container className="py-8">
      <div className="space-y-8">
        {/* 标题和布局切换 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-title-1 font-bold text-text-primary mb-2">
              二手交换卡片展示
            </h1>
            <p className="text-body text-text-secondary">
              基于设计系统重新设计的交换物品卡片组件
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant={layout === "grid" ? "primary" : "outline"}
              size="sm"
              onClick={() => setLayout("grid")}
            >
              网格布局
            </Button>
            <Button
              variant={layout === "list" ? "primary" : "outline"}
              size="sm"
              onClick={() => setLayout("list")}
            >
              列表布局
            </Button>
            <Button
              variant={layout === "compact" ? "primary" : "outline"}
              size="sm"
              onClick={() => setLayout("compact")}
            >
              紧凑布局
            </Button>
            <Button
              variant={layout === "sidebar" ? "primary" : "outline"}
              size="sm"
              onClick={() => setLayout("sidebar")}
            >
              侧边栏
            </Button>
          </div>
        </div>

        {/* 布局说明 */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-subtitle font-semibold text-text-primary mb-2">
            当前布局:{" "}
            {layout === "grid"
              ? "网格布局 (280x380px)"
              : layout === "list"
              ? "列表布局 (100%x120px)"
              : layout === "compact"
              ? "紧凑布局 (270x200px)"
              : "侧边栏布局 (100%x120px)"}
          </h3>
          <p className="text-body text-text-secondary">
            {layout === "grid" &&
              "适用于首页展示、分类浏览等场景，信息展示完整，视觉效果佳"}
            {layout === "list" &&
              "适用于搜索结果、筛选列表等场景，信息密度高，便于快速浏览"}
            {layout === "compact" &&
              "适用于首页推荐、水平滚动等场景，占用空间小，水平布局"}
            {layout === "sidebar" &&
              "适用于侧边栏推荐、相关商品等场景，针对窄空间优化"}
          </p>
        </div>

        {/* 卡片展示 */}
        <div className="space-y-4">
          <SectionHeader
            title={`${
              layout === "grid"
                ? "网格布局"
                : layout === "list"
                ? "列表布局"
                : layout === "compact"
                ? "紧凑布局"
                : "侧边栏布局"
            }示例`}
            actionText="查看全部交换物品"
            onActionClick={() => navigate("/exchange")}
          />
          <div
            className={
              layout === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                : layout === "list"
                ? "space-y-4"
                : layout === "compact"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                : "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            }
          >
            {sampleItems.map((item) => (
              <ExchangeCard
                key={item.id}
                {...item}
                layout={layout}
                onExchange={() => handleExchange(item.id)}
                onContact={() => handleContact(item.id)}
                onLike={() => handleLike(item.id)}
                onClick={() => handleViewDetails(item.id)}
              />
            ))}
          </div>
        </div>

        {/* 设计规范说明 */}
        <div className="bg-primary-50 border border-primary-200 rounded-lg p-6">
          <h3 className="text-subtitle font-semibold text-primary-600 mb-4">
            设计规范要点
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-body text-text-secondary">
            <div>
              <h4 className="font-medium text-text-primary mb-2">视觉规范</h4>
              <ul className="space-y-1 text-caption">
                <li>• 卡片圆角: 16px (rounded-lg)</li>
                <li>• 图片圆角: 12px</li>
                <li>• 阴影: shadow-card</li>
                <li>• 悬停效果: shadow-modal + 向上4px</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-2">交互规范</h4>
              <ul className="space-y-1 text-caption">
                <li>• 主操作: "立即交换" (primary按钮)</li>
                <li>• 次要操作: "详情" (outline按钮)</li>
                <li>• 禁用状态: 已预定/已售出</li>
                <li>• 收藏功能: 独立交互区域</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-2">状态系统</h4>
              <ul className="space-y-1 text-caption">
                <li>• 在售: primary色系</li>
                <li>• 已预定: coral色系</li>
                <li>• 火热: sunflower色系</li>
                <li>• 急售: lavender色系</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-text-primary mb-2">响应式设计</h4>
              <ul className="space-y-1 text-caption">
                <li>• 移动端: 单列布局</li>
                <li>• 平板端: 双列布局</li>
                <li>• 桌面端: 三列或四列布局</li>
                <li>• 列表布局: 固定高度120px</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ExchangeItemShowcase;
