import React from "react";
import { Button } from "@/components/ui";

const ButtonVariantsDemo: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-title-1 text-text-primary mb-3">
          🎨 Button 组件变体演示
        </h1>
        <p className="text-subtitle text-text-secondary">
          展示用户卡片中使用的按钮层次设计
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* 按钮层次展示 */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h2 className="text-title-3 text-text-primary mb-6">
            按钮优先级层次
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Primary - 最高优先级 */}
            <div className="text-center p-4 bg-primary-50 rounded-lg">
              <h3 className="text-subtitle font-semibold text-primary-600 mb-3">
                PRIMARY
              </h3>
              <Button variant="primary" size="sm" className="mb-3">
                关注
              </Button>
              <p className="text-caption text-text-secondary">
                最重要的行为召唤，用于关注等核心社交操作
              </p>
            </div>

            {/* Secondary - 中等优先级 */}
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="text-subtitle font-semibold text-gray-600 mb-3">
                SECONDARY
              </h3>
              <Button variant="secondary" size="sm" className="mb-3">
                查看主页
              </Button>
              <p className="text-caption text-text-secondary">
                常用操作，需要一定视觉权重但不抢夺主要操作注意力
              </p>
            </div>

            {/* Outline - 低优先级 */}
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <h3 className="text-subtitle font-semibold text-gray-500 mb-3">
                OUTLINE
              </h3>
              <Button variant="outline" size="sm" className="mb-3">
                发私信
              </Button>
              <p className="text-caption text-text-secondary">
                次要操作，提供功能但不干扰主要决策流程
              </p>
            </div>
          </div>
        </div>

        {/* 实际应用对比 */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h2 className="text-title-3 text-text-primary mb-6">
            用户卡片按钮应用对比
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* 优化前 */}
            <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
              <h3 className="text-subtitle font-semibold text-red-700 mb-4">
                ❌ 优化前
              </h3>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" fullWidth>
                    进入主页
                  </Button>
                  <Button variant="outline" size="sm">
                    关注
                  </Button>
                  <Button variant="outline" size="sm">
                    💬
                  </Button>
                </div>
                <ul className="text-caption text-red-600 space-y-1">
                  <li>• 所有按钮都是outline，层次不清</li>
                  <li>• 关注按钮不够突出</li>
                  <li>• 私信图标太小，难以识别</li>
                </ul>
              </div>
            </div>

            {/* 优化后 */}
            <div className="p-4 bg-green-50 rounded-lg border-2 border-green-200">
              <h3 className="text-subtitle font-semibold text-green-700 mb-4">
                ✅ 优化后
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">用户名</span>
                  <Button variant="primary" size="sm">
                    关注
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    leftIcon={
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
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    }
                  >
                    查看主页
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={
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
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 4v-4z"
                        />
                      </svg>
                    }
                  >
                    发私信
                  </Button>
                </div>
                <ul className="text-caption text-green-600 space-y-1">
                  <li>• 关注按钮primary突出显示</li>
                  <li>• 主页按钮secondary默认高亮</li>
                  <li>• 私信按钮outline作为次要操作</li>
                  <li>• 清晰的操作层次和视觉权重</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 所有按钮变体展示 */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h2 className="text-title-3 text-text-primary mb-6">
            Button 组件所有变体
          </h2>

          <div className="space-y-6">
            {/* 不同变体 */}
            <div>
              <h3 className="text-subtitle text-text-primary mb-3">
                变体 (Variants)
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
              </div>
            </div>

            {/* 不同尺寸 */}
            <div>
              <h3 className="text-subtitle text-text-primary mb-3">
                尺寸 (Sizes)
              </h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary" size="sm">
                  Small
                </Button>
                <Button variant="primary" size="md">
                  Medium
                </Button>
                <Button variant="primary" size="lg">
                  Large
                </Button>
              </div>
            </div>

            {/* 图标按钮 */}
            <div>
              <h3 className="text-subtitle text-text-primary mb-3">
                图标按钮 (Icons)
              </h3>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  leftIcon={
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
                  }
                >
                  Left Icon
                </Button>
                <Button
                  variant="secondary"
                  rightIcon={
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
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  }
                >
                  Right Icon
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonVariantsDemo;
