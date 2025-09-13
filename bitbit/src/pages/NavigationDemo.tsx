import React, { useState } from "react";
import { SmartBottomNav, FloatingNav } from "@/components/navigation";
import { Container, Card, Button } from "@/components/ui";

type NavigationType = "fixed" | "smart" | "floating";

const NavigationDemo: React.FC = () => {
  const [activeNav, setActiveNav] = useState<NavigationType>("fixed");

  const renderNavigation = () => {
    switch (activeNav) {
      case "smart":
        return <SmartBottomNav smartHide={true} hideThreshold={100} />;
      case "floating":
        return <FloatingNav />;
      default:
        return null; // 使用默认的固定导航
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Container size="lg" className="py-8">
        <div className="space-y-8">
          {/* 标题 */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              底部导航优化方案
            </h1>
            <p className="text-gray-600">
              从产品设计和用户体验角度提出的三种优化方案
            </p>
          </div>

          {/* 方案选择器 */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">选择导航方案</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                variant={activeNav === "fixed" ? "primary" : "secondary"}
                onClick={() => setActiveNav("fixed")}
                className="h-auto p-4 flex flex-col items-start"
              >
                <div className="font-semibold mb-2">固定底部导航（推荐）</div>
                <div className="text-sm text-left">
                  始终固定在屏幕底部，符合移动端应用标准
                </div>
              </Button>

              <Button
                variant={activeNav === "smart" ? "primary" : "secondary"}
                onClick={() => setActiveNav("smart")}
                className="h-auto p-4 flex flex-col items-start"
              >
                <div className="font-semibold mb-2">智能隐藏导航</div>
                <div className="text-sm text-left">
                  向下滚动时隐藏，向上滚动时显示，节省空间
                </div>
              </Button>

              <Button
                variant={activeNav === "floating" ? "primary" : "secondary"}
                onClick={() => setActiveNav("floating")}
                className="h-auto p-4 flex flex-col items-start"
              >
                <div className="font-semibold mb-2">悬浮导航按钮</div>
                <div className="text-sm text-left">
                  悬浮按钮展开导航，占用空间最小
                </div>
              </Button>
            </div>
          </Card>

          {/* 方案详细说明 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-3 text-blue-600">
                🎯 固定底部导航
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>符合移动端设计规范</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>用户习惯，易于访问</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>导航状态清晰可见</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-500">⚠</span>
                  <span>占用固定屏幕空间</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-3 text-purple-600">
                🚀 智能隐藏导航
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>节省屏幕空间</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>沉浸式浏览体验</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>智能显示/隐藏</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-500">⚠</span>
                  <span>需要用户学习成本</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-3 text-indigo-600">
                💫 悬浮导航按钮
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>最小空间占用</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>创新的交互方式</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span>可自定义位置</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-500">⚠</span>
                  <span>不符合常见设计模式</span>
                </div>
              </div>
            </Card>
          </div>

          {/* 使用建议 */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">💡 使用建议</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2 text-blue-600">推荐场景</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>
                    • <strong>固定导航</strong>：通用应用，符合用户习惯
                  </li>
                  <li>
                    • <strong>智能隐藏</strong>：内容密集型应用，如新闻、社交
                  </li>
                  <li>
                    • <strong>悬浮按钮</strong>：创新型应用，特殊场景
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2 text-green-600">实施建议</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• 优先考虑用户习惯和易用性</li>
                  <li>• 可以提供用户选择权</li>
                  <li>• 考虑不同页面的特殊需求</li>
                  <li>• 进行A/B测试验证效果</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* 测试内容 - 用于演示滚动效果 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">测试滚动效果</h3>
            {Array.from({ length: 10 }, (_, i) => (
              <Card key={i} className="p-6">
                <h4 className="font-medium mb-2">测试内容 #{i + 1}</h4>
                <p className="text-gray-600">
                  这是一些测试内容，用于演示页面滚动时导航栏的行为。
                  您可以向下滚动查看智能隐藏导航的效果，或者尝试悬浮导航按钮的交互。
                </p>
              </Card>
            ))}
          </div>
        </div>
      </Container>

      {/* 渲染选中的导航方案 */}
      {renderNavigation()}
    </div>
  );
};

export default NavigationDemo;
