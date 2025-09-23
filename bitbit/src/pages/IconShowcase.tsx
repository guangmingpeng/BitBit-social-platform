import React from "react";
import { Container, Card, Icon } from "@/components/ui";

const IconShowcase: React.FC = () => {
  const navigationIcons = [
    { name: "home" as const, label: "首页", color: "text-blue-600" },
    { name: "activity" as const, label: "活动", color: "text-green-600" },
    { name: "community" as const, label: "社区", color: "text-purple-600" },
    { name: "exchange" as const, label: "二手", color: "text-orange-600" },
    { name: "profile" as const, label: "我的", color: "text-indigo-600" },
  ];

  const oldIcons = [
    { emoji: "🏠", label: "首页" },
    { emoji: "🎯", label: "活动" },
    { emoji: "💬", label: "社区" },
    { emoji: "🔄", label: "二手" },
    { emoji: "👤", label: "我的" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Container size="lg" className="py-8">
        <div className="space-y-8">
          {/* 标题 */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              导航图标优化对比
            </h1>
            <p className="text-gray-600">从emoji表情图标升级到专业的SVG图标</p>
          </div>

          {/* 对比展示 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 优化前 */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6 text-center text-red-600">
                ❌ 优化前 - Emoji图标
              </h2>
              <div className="space-y-4">
                {oldIcons.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{item.emoji}</span>
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      字体依赖，不够统一
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-red-50 rounded-lg">
                <h3 className="font-medium text-red-800 mb-2">问题：</h3>
                <ul className="text-sm text-red-700 space-y-1">
                  <li>• 依赖系统字体，不同设备显示不一致</li>
                  <li>• 风格不统一，显得不够专业</li>
                  <li>• 无法自定义颜色和样式</li>
                  <li>• 在某些设备上可能显示为方块</li>
                </ul>
              </div>
            </Card>

            {/* 优化后 */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-6 text-center text-green-600">
                ✅ 优化后 - SVG图标
              </h2>
              <div className="space-y-4">
                {navigationIcons.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <Icon
                        name={item.name}
                        size="lg"
                        className={`transition-colors ${item.color}`}
                      />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      矢量图标，清晰美观
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-800 mb-2">优势：</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• 矢量图标，任意缩放都保持清晰</li>
                  <li>• 统一的设计风格，更加专业</li>
                  <li>• 可自定义颜色、大小和动画效果</li>
                  <li>• 兼容性好，所有设备一致显示</li>
                </ul>
              </div>
            </Card>
          </div>

          {/* 交互效果展示 */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6 text-center">
              🎨 增强的交互效果
            </h2>

            <div className="grid grid-cols-5 gap-4">
              {navigationIcons.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-4 rounded-lg bg-white border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 cursor-pointer group"
                >
                  <Icon
                    name={item.name}
                    size="lg"
                    className={`mb-2 transition-all duration-300 group-hover:scale-110 ${item.color}`}
                  />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {item.label}
                  </span>

                  {/* 悬停效果指示器 */}
                  <div className="w-8 h-1 bg-blue-500 rounded-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                💡 悬停图标查看交互效果：缩放动画、颜色变化、阴影提升
              </p>
            </div>
          </Card>

          {/* 尺寸对比 */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-6 text-center">
              📏 多尺寸展示
            </h2>

            <div className="grid grid-cols-4 gap-8">
              {["xs", "sm", "md", "lg"].map((size) => (
                <div key={size} className="text-center">
                  <h3 className="font-medium mb-4 text-gray-700 uppercase">
                    {size} 尺寸
                  </h3>
                  <div className="flex flex-col items-center space-y-3">
                    {navigationIcons.map((item) => (
                      <Icon
                        key={item.name}
                        name={item.name}
                        size={size as "xs" | "sm" | "md" | "lg"}
                        className={item.color}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* 总结 */}
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <h2 className="text-xl font-semibold mb-4 text-center text-blue-800">
              🚀 优化总结
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="view" className="text-blue-600" />
                </div>
                <h3 className="font-medium text-blue-800 mb-2">视觉统一</h3>
                <p className="text-sm text-blue-700">
                  统一的设计语言，提升品牌专业度
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="users" className="text-green-600" />
                </div>
                <h3 className="font-medium text-green-800 mb-2">用户体验</h3>
                <p className="text-sm text-green-700">
                  清晰的视觉反馈，更好的可用性
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon name="plus" className="text-purple-600" />
                </div>
                <h3 className="font-medium text-purple-800 mb-2">可扩展性</h3>
                <p className="text-sm text-purple-700">
                  易于添加新图标，保持风格一致
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default IconShowcase;
