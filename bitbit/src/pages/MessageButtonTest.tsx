import React from "react";
import { useNavigate } from "react-router-dom";
import UserCardPopover from "@/shared/components/UserCardPopover";
import { navigateToChatFromUserCard } from "@/features/chat/utils";
import { Button } from "@/components/ui";

const MessageButtonTest: React.FC = () => {
  const navigate = useNavigate();

  const testUser = {
    id: "test-user-123",
    name: "测试用户",
    fullName: "测试用户全名",
    avatar: "https://i.pravatar.cc/150?img=1",
    profession: "软件工程师",
    location: "北京",
    bio: "这是一个测试用户的简介",
    isOnline: true,
    followersCount: 128,
    followingCount: 95,
    postsCount: 42,
    tags: ["技术", "编程", "React"],
  };

  // 直接测试导航函数
  const testDirectNavigation = () => {
    console.log("直接导航测试开始");
    try {
      navigateToChatFromUserCard(navigate, testUser.id, {
        name: testUser.name,
        avatar: testUser.avatar,
      });
      console.log("直接导航调用成功");
    } catch (error) {
      console.error("直接导航失败:", error);
    }
  };

  // 测试自定义消息处理函数
  const customMessageHandler = (userId: string) => {
    console.log("自定义消息处理函数被调用，用户ID:", userId);
    alert(`准备发送私信给用户: ${userId}`);
    testDirectNavigation();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-2xl font-bold text-center">私信按钮功能测试</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 测试1: 使用默认导航 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">
              测试1: 默认导航（不传onMessage）
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              鼠标悬停到头像上，在弹出的卡片中点击"发私信"按钮
            </p>
            <UserCardPopover user={testUser}>
              <div className="flex items-center space-x-3 p-3 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200">
                <img
                  src={testUser.avatar}
                  alt={testUser.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="font-medium">{testUser.name}</div>
                  <div className="text-sm text-gray-500">
                    {testUser.profession}
                  </div>
                </div>
              </div>
            </UserCardPopover>
          </div>

          {/* 测试2: 使用自定义消息处理 */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">
              测试2: 自定义消息处理
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              鼠标悬停到头像上，在弹出的卡片中点击"发私信"按钮
            </p>
            <UserCardPopover user={testUser} onMessage={customMessageHandler}>
              <div className="flex items-center space-x-3 p-3 bg-blue-100 rounded-lg cursor-pointer hover:bg-blue-200">
                <img
                  src={testUser.avatar}
                  alt={testUser.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="font-medium">{testUser.name}</div>
                  <div className="text-sm text-gray-500">
                    {testUser.profession}
                  </div>
                </div>
              </div>
            </UserCardPopover>
          </div>
        </div>

        {/* 直接测试按钮 */}
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold mb-4">直接测试导航函数</h2>
          <Button onClick={testDirectNavigation} className="mx-auto">
            直接调用导航函数
          </Button>
        </div>

        {/* 控制台提示 */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">调试提示:</h3>
          <p className="text-yellow-700 text-sm">
            请打开浏览器的开发者工具查看控制台输出，所有点击和导航事件都会在控制台中记录。
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageButtonTest;
