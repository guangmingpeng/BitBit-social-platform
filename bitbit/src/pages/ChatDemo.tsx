import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button } from "@/components/ui";
import UserCardPopover from "@/shared/components/UserCardPopover";
import { ChatContainer, ChatTestComponent } from "@/features/chat/components";
import type { ChatContainerRef } from "@/features/chat/components/ChatContainer";
import type { UserInfo } from "@/shared/components/UserCardPopover";

const ChatDemo: React.FC = () => {
  const navigate = useNavigate();
  const [demoType, setDemoType] = useState<"existing" | "new" | "fullTest">(
    "existing"
  );
  const chatRef = useRef<ChatContainerRef>(null);

  // 示例用户数据 - 模拟已有聊天记录的用户
  const existingChatUser: UserInfo = {
    id: "2", // Bob Wang - 在mockUsers中已存在，有聊天记录
    name: "Bob Wang",
    fullName: "王小波",
    avatar: "https://picsum.photos/60/60?random=2",
    age: 32,
    profession: "摄影师",
    location: "上海",
    bio: "摄影爱好者，喜欢记录美好瞬间，经常组织摄影活动和分享摄影技巧。",
    activitiesCount: 8,
    organizedCount: 3,
    postsCount: 25,
    followersCount: 156,
    followingCount: 89,
    tags: ["摄影", "旅行", "艺术", "后期处理"],
    isFollowed: false,
    isOrganizer: true,
    isOnline: false,
    joinDate: "2023年8月",
  };

  // 示例用户数据 - 模拟新用户（无聊天记录）
  const newChatUser: UserInfo = {
    id: "new-user-999",
    name: "张小美",
    fullName: "张小美",
    avatar: "https://picsum.photos/60/60?random=999",
    age: 24,
    profession: "UI设计师",
    location: "深圳",
    bio: "热爱设计，追求简洁美观的用户体验，希望通过设计让世界更美好。",
    activitiesCount: 3,
    organizedCount: 0,
    postsCount: 12,
    followersCount: 45,
    followingCount: 67,
    tags: ["设计", "UI/UX", "创意", "美学"],
    isFollowed: false,
    isOrganizer: false,
    isOnline: true,
    joinDate: "2024年3月",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Container size="full" className="h-screen">
        <div className="h-full flex flex-col">
          {/* 顶部控制面板 */}
          <div className="bg-white border-b border-gray-200 p-4 flex-shrink-0">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">
                BitBit 聊天功能演示
              </h1>
              <Button variant="outline" size="sm" onClick={() => navigate("/")}>
                返回首页
              </Button>
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              {/* 演示类型切换 */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  演示类型：
                </span>
                <div className="flex rounded-lg border border-gray-300">
                  <button
                    onClick={() => setDemoType("existing")}
                    className={`px-3 py-1.5 text-sm rounded-l-lg transition-colors ${
                      demoType === "existing"
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    已有聊天
                  </button>
                  <button
                    onClick={() => setDemoType("new")}
                    className={`px-3 py-1.5 text-sm border-l border-gray-300 transition-colors ${
                      demoType === "new"
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    新用户聊天
                  </button>
                  <button
                    onClick={() => setDemoType("fullTest")}
                    className={`px-3 py-1.5 text-sm rounded-r-lg border-l border-gray-300 transition-colors ${
                      demoType === "fullTest"
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    完整测试
                  </button>
                </div>
              </div>

              {/* 用户卡片演示 */}
              {demoType !== "fullTest" && (
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-700">
                    用户卡片演示：
                  </span>
                  <UserCardPopover
                    user={
                      demoType === "existing" ? existingChatUser : newChatUser
                    }
                    placement="bottom"
                  >
                    <Button size="sm" variant="outline">
                      点击查看{" "}
                      {demoType === "existing"
                        ? existingChatUser.name
                        : newChatUser.name}
                    </Button>
                  </UserCardPopover>
                </div>
              )}

              {/* 说明文本 */}
              <div className="text-sm text-gray-600">
                {demoType === "existing" && (
                  <span>🟢 演示与已有聊天记录用户的私信功能</span>
                )}
                {demoType === "new" && (
                  <span>🔵 演示与新用户的首次私信功能（无历史记录）</span>
                )}
                {demoType === "fullTest" && (
                  <span>🟡 完整功能测试环境（包含群聊、私聊等所有功能）</span>
                )}
              </div>
            </div>
          </div>

          {/* 聊天演示区域 */}
          <div className="flex-1 min-h-0">
            {demoType === "fullTest" ? (
              <ChatTestComponent />
            ) : (
              <div className="h-full flex">
                <div className="flex-1">
                  <ChatContainer ref={chatRef} className="h-full" />
                </div>

                {/* 右侧说明面板 */}
                <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    演示说明
                  </h3>

                  {demoType === "existing" && (
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-2">
                          已有聊天记录场景
                        </h4>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• 用户：{existingChatUser.name}</li>
                          <li>• 已存在聊天记录</li>
                          <li>• 点击用户卡片"发私信"会直接进入现有聊天</li>
                          <li>• 显示历史消息记录</li>
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-800">
                          测试步骤：
                        </h4>
                        <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                          <li>点击上方用户卡片查看用户信息</li>
                          <li>点击"发私信"按钮</li>
                          <li>观察是否正确进入已有聊天</li>
                          <li>检查聊天标题是否显示用户名</li>
                          <li>确认没有显示"新消息"提示</li>
                        </ol>
                      </div>
                    </div>
                  )}

                  {demoType === "new" && (
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">
                          新用户首次聊天场景
                        </h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• 用户：{newChatUser.name}</li>
                          <li>• 无聊天记录</li>
                          <li>• 点击"发私信"会创建新的聊天会话</li>
                          <li>• 聊天标题显示对方用户名</li>
                          <li>• 显示对方头像</li>
                        </ul>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-800">
                          测试步骤：
                        </h4>
                        <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                          <li>点击上方用户卡片查看用户信息</li>
                          <li>点击"发私信"按钮</li>
                          <li>观察是否创建新的聊天会话</li>
                          <li>检查聊天标题是否为目标用户名</li>
                          <li>确认头像显示正确</li>
                          <li>验证输入框可正常使用</li>
                        </ol>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-800 mb-2">
                      功能验证要点
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>✅ 聊天列表独立滚动</li>
                      <li>✅ 头部和输入框固定位置</li>
                      <li>✅ 私聊不显示"新消息"计数</li>
                      <li>✅ 用户名和头像正确显示</li>
                      <li>✅ 布局响应式适配</li>
                      <li>✅ 无需滚动即可看到输入框</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ChatDemo;
