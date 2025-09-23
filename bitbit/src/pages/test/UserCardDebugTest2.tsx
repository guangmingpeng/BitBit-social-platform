import React from "react";
import { useNavigate } from "react-router-dom";
import { UserCardPopover, type UserInfo } from "@/shared/components";
import { navigateToChatFromUserCard } from "@/features/chat/utils";

const testUser: UserInfo = {
  id: "test-001",
  name: "测试用户",
  fullName: "测试用户全名",
  avatar: "https://picsum.photos/64/64?random=999",
  color: "#3B82F6",
  age: 25,
  profession: "前端工程师",
  location: "北京",
  bio: "这是一个测试用户，用于调试私信功能",
  activitiesCount: 10,
  organizedCount: 2,
  postsCount: 20,
  followersCount: 50,
  followingCount: 30,
  tags: ["React", "测试", "调试"],
  isFollowed: false,
  isOnline: true,
  joinDate: "2023年1月",
};

const UserCardDebugTest: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-center">
          UserCardPopover 调试测试
        </h1>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">测试说明</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• 悬停下面的用户卡片，应该显示popover</p>
            <p>• 点击"发私信"按钮，检查控制台日志</p>
            <p>• 确认是否正确导航到聊天页面</p>
            <p>• 打开浏览器开发者工具查看控制台输出</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">测试用户卡片</h2>

          {/* 基础点击测试 */}
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-medium mb-2">基础点击测试</h3>
            <button
              onClick={() => alert("基础按钮点击成功！")}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              测试基础点击
            </button>
            <button
              onClick={() => {
                console.log("🔥 React Router 导航测试");
                try {
                  navigateToChatFromUserCard(navigate, testUser.id, {
                    name: testUser.name,
                    avatar: testUser.avatar,
                  });
                  console.log("✅ React Router 导航调用成功");
                } catch (error) {
                  console.error("❌ React Router 导航失败:", error);
                }
              }}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              测试导航函数
            </button>
          </div>

          <div className="space-y-4">
            {/* 测试1: 默认导航 */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium mb-2">
                测试1: 默认导航（无自定义回调）
              </h3>
              <UserCardPopover
                user={testUser}
                placement="right"
                // 故意不传onMessage，测试默认导航
              >
                <div className="inline-flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
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
                  <div className="text-xs text-blue-600">悬停查看</div>
                </div>
              </UserCardPopover>
            </div>

            {/* 测试2: 自定义回调 */}
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium mb-2">
                测试2: 自定义回调（只输出日志）
              </h3>
              <UserCardPopover
                user={testUser}
                placement="right"
                onMessage={(userId) => {
                  console.log("🎯 自定义onMessage回调被调用:", userId);
                  alert(`自定义回调: 用户ID ${userId}`);
                }}
              >
                <div className="inline-flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
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
                  <div className="text-xs text-green-600">自定义回调</div>
                </div>
              </UserCardPopover>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-medium text-yellow-800 mb-2">调试提示</h3>
          <div className="text-sm text-yellow-700 space-y-1">
            <p>1. 打开浏览器开发者工具 (F12)</p>
            <p>2. 查看Console标签页</p>
            <p>3. 尝试悬停用户卡片并点击"发私信"</p>
            <p>4. 观察控制台输出和页面跳转</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCardDebugTest;
