import React from "react";
import { Button } from "@/components/ui";

const SimpleButtonTest: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center">简单按钮测试</h1>

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          {/* 原生button */}
          <div>
            <h3 className="font-medium mb-2">原生 button 元素</h3>
            <button
              onClick={() => alert("原生按钮点击成功！")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              原生按钮
            </button>
          </div>

          {/* UI组件库的Button */}
          <div>
            <h3 className="font-medium mb-2">UI Button 组件</h3>
            <Button
              onClick={() => alert("UI Button 点击成功！")}
              variant="primary"
            >
              UI Button
            </Button>
          </div>

          {/* 带有复杂点击处理的Button */}
          <div>
            <h3 className="font-medium mb-2">复杂点击处理</h3>
            <Button
              onClick={(e) => {
                console.log("Button 点击事件:", e);
                e.stopPropagation();
                e.preventDefault();
                alert("复杂处理按钮点击成功！");
              }}
              variant="outline"
            >
              复杂处理按钮
            </Button>
          </div>

          {/* 模拟UserCardPopover中的按钮 */}
          <div>
            <h3 className="font-medium mb-2">模拟 Popover 按钮</h3>
            <div className="border border-gray-200 rounded-lg p-4">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  console.log("🔥 模拟私信按钮点击", e);
                  alert("🎯 模拟私信按钮点击成功！");
                }}
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
                fullWidth
              >
                模拟发私信
              </Button>
            </div>
          </div>

          {/* 导航测试 */}
          <div>
            <h3 className="font-medium mb-2">导航测试</h3>
            <Button
              onClick={() => {
                const testUrl =
                  "/chat?userId=test&userName=测试&sourceFrom=test";
                console.log("准备导航到:", testUrl);

                if (window.confirm(`确定要导航到聊天页面吗？\n${testUrl}`)) {
                  window.location.href = testUrl;
                }
              }}
              variant="secondary"
            >
              测试导航
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleButtonTest;
