import React, { useState, useRef } from "react";
import ChatContainer, { type ChatContainerRef } from "./ChatContainer";

const ChatTestComponent: React.FC = () => {
  const [showInstructions, setShowInstructions] = useState(false);
  const [showDemoPanel, setShowDemoPanel] = useState(false);
  const chatRef = useRef<ChatContainerRef>(null);

  return (
    <div className="w-full h-screen bg-gray-50 overflow-hidden">
      <div className="container mx-auto h-full">
        <div className="h-full max-w-6xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
          <div className="h-16 bg-primary-500 text-white flex items-center justify-between px-6 flex-shrink-0">
            <h1 className="text-xl font-semibold">BitBit 聊天功能测试</h1>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDemoPanel(!showDemoPanel)}
                className="px-3 py-1 bg-orange-500/80 hover:bg-orange-500 rounded-lg text-sm transition-colors"
              >
                {showDemoPanel ? "隐藏演示" : "演示控制"}
              </button>
              <button
                onClick={() => setShowInstructions(!showInstructions)}
                className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-sm transition-colors"
              >
                {showInstructions ? "隐藏" : "使用说明"}
              </button>
            </div>
          </div>

          {/* 演示控制面板 */}
          {showDemoPanel && (
            <div className="bg-orange-50 border-b border-orange-200 p-4 flex-shrink-0 max-h-48 overflow-y-auto">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-semibold text-orange-900 mb-2">
                  新消息分割线演示控制
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <button
                    onClick={() => chatRef.current?.simulateNewMessage?.()}
                    className="px-3 py-2 bg-orange-100 hover:bg-orange-200 rounded-lg text-orange-800 transition-colors"
                  >
                    单条新消息
                  </button>
                  <button
                    onClick={() =>
                      chatRef.current?.simulateMultipleMessages?.(3)
                    }
                    className="px-3 py-2 bg-orange-100 hover:bg-orange-200 rounded-lg text-orange-800 transition-colors"
                  >
                    3条连续消息
                  </button>
                  <button
                    onClick={() =>
                      chatRef.current?.simulateMultipleMessages?.(5)
                    }
                    className="px-3 py-2 bg-orange-100 hover:bg-orange-200 rounded-lg text-orange-800 transition-colors"
                  >
                    5条消息流
                  </button>
                  <button
                    onClick={() =>
                      chatRef.current?.simulateMultipleMessages?.(8)
                    }
                    className="px-3 py-2 bg-orange-100 hover:bg-orange-200 rounded-lg text-orange-800 transition-colors"
                  >
                    大量消息
                  </button>
                </div>
                <div className="mt-3 text-xs text-orange-700 space-y-1">
                  <p>
                    📍 <strong>新消息分割线特性:</strong>
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>动态蓝色渐变背景，醒目的视觉提示</li>
                    <li>脉冲动画效果，自动吸引用户注意</li>
                    <li>显示未读消息数量，精确信息反馈</li>
                    <li>自动滚动到底部按钮，便捷导航</li>
                    <li>实时计算未读消息，准确状态管理</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {showInstructions && (
            <div className="bg-blue-50 border-b border-blue-200 p-4 flex-shrink-0 max-h-64 overflow-y-auto">
              <div className="max-w-4xl mx-auto">
                <h2 className="font-semibold text-blue-900 mb-2">
                  聊天功能测试说明
                </h2>
                <div className="text-sm text-blue-800 space-y-2">
                  <div>
                    <strong>已完成功能：</strong>
                  </div>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>
                      ✅ Switch开关状态同步 - 群设置中的开关现在可以正常切换
                    </li>
                    <li>✅ 群成员列表展示 - 支持角色管理、在线状态显示</li>
                    <li>✅ 用户卡片弹窗 - 悬停在成员头像上查看详细信息</li>
                    <li>✅ 管理员权限 - 管理员可以设置成员角色、移除成员</li>
                    <li>✅ 产品设计优化 - 群聊与活动绑定，体现BitBit定位</li>
                    <li>✅ 丰富测试数据 - 多种角色和权限级别的用户</li>
                    <li>✅ 新消息分割线 - 动态视觉效果，准确未读计数</li>
                    <li>✅ 输入框体验优化 - 固定定位，避免滚动查找</li>
                  </ul>
                  <div className="mt-3">
                    <strong>测试建议：</strong>
                  </div>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>点击右上角设置图标查看群设置面板</li>
                    <li>在群设置中测试各种开关功能</li>
                    <li>悬停在群成员列表中的用户头像查看用户卡片</li>
                    <li>
                      尝试使用管理员权限操作（当前用户Diana是普通成员，Alice是群主）
                    </li>
                    <li>体验不同类型的聊天（活动群聊、私聊、瑜伽群聊）</li>
                    <li>使用"演示控制"面板测试新消息分割线的各种场景</li>
                    <li>观察输入框在聊天过程中的固定定位效果</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 min-h-0">
            <ChatContainer ref={chatRef} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatTestComponent;
